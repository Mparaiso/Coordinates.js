
/**
 * almond 0.2.0 Copyright (c) 2011, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/almond for details
 */
//Going sloppy to avoid 'use strict' string cost, but strict practices should
//be followed.
/*jslint sloppy: true */
/*global setTimeout: false */

var requirejs, require, define;
(function (undef) {
    var main, req, makeMap, handlers,
        defined = {},
        waiting = {},
        config = {},
        defining = {},
        aps = [].slice;

    /**
     * Given a relative module name, like ./something, normalize it to
     * a real name that can be mapped to a path.
     * @param {String} name the relative name
     * @param {String} baseName a real name that the name arg is relative
     * to.
     * @returns {String} normalized name
     */
    function normalize(name, baseName) {
        var nameParts, nameSegment, mapValue, foundMap,
            foundI, foundStarMap, starI, i, j, part,
            baseParts = baseName && baseName.split("/"),
            map = config.map,
            starMap = (map && map['*']) || {};

        //Adjust any relative paths.
        if (name && name.charAt(0) === ".") {
            //If have a base name, try to normalize against it,
            //otherwise, assume it is a top-level require that will
            //be relative to baseUrl in the end.
            if (baseName) {
                //Convert baseName to array, and lop off the last part,
                //so that . matches that "directory" and not name of the baseName's
                //module. For instance, baseName of "one/two/three", maps to
                //"one/two/three.js", but we want the directory, "one/two" for
                //this normalization.
                baseParts = baseParts.slice(0, baseParts.length - 1);

                name = baseParts.concat(name.split("/"));

                //start trimDots
                for (i = 0; i < name.length; i += 1) {
                    part = name[i];
                    if (part === ".") {
                        name.splice(i, 1);
                        i -= 1;
                    } else if (part === "..") {
                        if (i === 1 && (name[2] === '..' || name[0] === '..')) {
                            //End of the line. Keep at least one non-dot
                            //path segment at the front so it can be mapped
                            //correctly to disk. Otherwise, there is likely
                            //no path mapping for a path starting with '..'.
                            //This can still fail, but catches the most reasonable
                            //uses of ..
                            break;
                        } else if (i > 0) {
                            name.splice(i - 1, 2);
                            i -= 2;
                        }
                    }
                }
                //end trimDots

                name = name.join("/");
            }
        }

        //Apply map config if available.
        if ((baseParts || starMap) && map) {
            nameParts = name.split('/');

            for (i = nameParts.length; i > 0; i -= 1) {
                nameSegment = nameParts.slice(0, i).join("/");

                if (baseParts) {
                    //Find the longest baseName segment match in the config.
                    //So, do joins on the biggest to smallest lengths of baseParts.
                    for (j = baseParts.length; j > 0; j -= 1) {
                        mapValue = map[baseParts.slice(0, j).join('/')];

                        //baseName segment has  config, find if it has one for
                        //this name.
                        if (mapValue) {
                            mapValue = mapValue[nameSegment];
                            if (mapValue) {
                                //Match, update name to the new value.
                                foundMap = mapValue;
                                foundI = i;
                                break;
                            }
                        }
                    }
                }

                if (foundMap) {
                    break;
                }

                //Check for a star map match, but just hold on to it,
                //if there is a shorter segment match later in a matching
                //config, then favor over this star map.
                if (!foundStarMap && starMap && starMap[nameSegment]) {
                    foundStarMap = starMap[nameSegment];
                    starI = i;
                }
            }

            if (!foundMap && foundStarMap) {
                foundMap = foundStarMap;
                foundI = starI;
            }

            if (foundMap) {
                nameParts.splice(0, foundI, foundMap);
                name = nameParts.join('/');
            }
        }

        return name;
    }

    function makeRequire(relName, forceSync) {
        return function () {
            //A version of a require function that passes a moduleName
            //value for items that may need to
            //look up paths relative to the moduleName
            return req.apply(undef, aps.call(arguments, 0).concat([relName, forceSync]));
        };
    }

    function makeNormalize(relName) {
        return function (name) {
            return normalize(name, relName);
        };
    }

    function makeLoad(depName) {
        return function (value) {
            defined[depName] = value;
        };
    }

    function callDep(name) {
        if (waiting.hasOwnProperty(name)) {
            var args = waiting[name];
            delete waiting[name];
            defining[name] = true;
            main.apply(undef, args);
        }

        if (!defined.hasOwnProperty(name) && !defining.hasOwnProperty(name)) {
            throw new Error('No ' + name);
        }
        return defined[name];
    }

    //Turns a plugin!resource to [plugin, resource]
    //with the plugin being undefined if the name
    //did not have a plugin prefix.
    function splitPrefix(name) {
        var prefix,
            index = name ? name.indexOf('!') : -1;
        if (index > -1) {
            prefix = name.substring(0, index);
            name = name.substring(index + 1, name.length);
        }
        return [prefix, name];
    }

    /**
     * Makes a name map, normalizing the name, and using a plugin
     * for normalization if necessary. Grabs a ref to plugin
     * too, as an optimization.
     */
    makeMap = function (name, relName) {
        var plugin,
            parts = splitPrefix(name),
            prefix = parts[0];

        name = parts[1];

        if (prefix) {
            prefix = normalize(prefix, relName);
            plugin = callDep(prefix);
        }

        //Normalize according
        if (prefix) {
            if (plugin && plugin.normalize) {
                name = plugin.normalize(name, makeNormalize(relName));
            } else {
                name = normalize(name, relName);
            }
        } else {
            name = normalize(name, relName);
            parts = splitPrefix(name);
            prefix = parts[0];
            name = parts[1];
            if (prefix) {
                plugin = callDep(prefix);
            }
        }

        //Using ridiculous property names for space reasons
        return {
            f: prefix ? prefix + '!' + name : name, //fullName
            n: name,
            pr: prefix,
            p: plugin
        };
    };

    function makeConfig(name) {
        return function () {
            return (config && config.config && config.config[name]) || {};
        };
    }

    handlers = {
        require: function (name) {
            return makeRequire(name);
        },
        exports: function (name) {
            var e = defined[name];
            if (typeof e !== 'undefined') {
                return e;
            } else {
                return (defined[name] = {});
            }
        },
        module: function (name) {
            return {
                id: name,
                uri: '',
                exports: defined[name],
                config: makeConfig(name)
            };
        }
    };

    main = function (name, deps, callback, relName) {
        var cjsModule, depName, ret, map, i,
            args = [],
            usingExports;

        //Use name if no relName
        relName = relName || name;

        //Call the callback to define the module, if necessary.
        if (typeof callback === 'function') {

            //Pull out the defined dependencies and pass the ordered
            //values to the callback.
            //Default to [require, exports, module] if no deps
            deps = !deps.length && callback.length ? ['require', 'exports', 'module'] : deps;
            for (i = 0; i < deps.length; i += 1) {
                map = makeMap(deps[i], relName);
                depName = map.f;

                //Fast path CommonJS standard dependencies.
                if (depName === "require") {
                    args[i] = handlers.require(name);
                } else if (depName === "exports") {
                    //CommonJS module spec 1.1
                    args[i] = handlers.exports(name);
                    usingExports = true;
                } else if (depName === "module") {
                    //CommonJS module spec 1.1
                    cjsModule = args[i] = handlers.module(name);
                } else if (defined.hasOwnProperty(depName) ||
                           waiting.hasOwnProperty(depName) ||
                           defining.hasOwnProperty(depName)) {
                    args[i] = callDep(depName);
                } else if (map.p) {
                    map.p.load(map.n, makeRequire(relName, true), makeLoad(depName), {});
                    args[i] = defined[depName];
                } else {
                    throw new Error(name + ' missing ' + depName);
                }
            }

            ret = callback.apply(defined[name], args);

            if (name) {
                //If setting exports via "module" is in play,
                //favor that over return value and exports. After that,
                //favor a non-undefined return value over exports use.
                if (cjsModule && cjsModule.exports !== undef &&
                        cjsModule.exports !== defined[name]) {
                    defined[name] = cjsModule.exports;
                } else if (ret !== undef || !usingExports) {
                    //Use the return value from the function.
                    defined[name] = ret;
                }
            }
        } else if (name) {
            //May just be an object definition for the module. Only
            //worry about defining if have a module name.
            defined[name] = callback;
        }
    };

    requirejs = require = req = function (deps, callback, relName, forceSync, alt) {
        if (typeof deps === "string") {
            if (handlers[deps]) {
                //callback in this case is really relName
                return handlers[deps](callback);
            }
            //Just return the module wanted. In this scenario, the
            //deps arg is the module name, and second arg (if passed)
            //is just the relName.
            //Normalize module name, if it contains . or ..
            return callDep(makeMap(deps, callback).f);
        } else if (!deps.splice) {
            //deps is a config object, not an array.
            config = deps;
            if (callback.splice) {
                //callback is an array, which means it is a dependency list.
                //Adjust args if there are dependencies
                deps = callback;
                callback = relName;
                relName = null;
            } else {
                deps = undef;
            }
        }

        //Support require(['a'])
        callback = callback || function () {};

        //If relName is a function, it is an errback handler,
        //so remove it.
        if (typeof relName === 'function') {
            relName = forceSync;
            forceSync = alt;
        }

        //Simulate async callback;
        if (forceSync) {
            main(undef, deps, callback, relName);
        } else {
            setTimeout(function () {
                main(undef, deps, callback, relName);
            }, 15);
        }

        return req;
    };

    /**
     * Just drops the config on the floor, but returns req in case
     * the config return value is used.
     */
    req.config = function (cfg) {
        config = cfg;
        return req;
    };

    define = function (name, deps, callback) {

        //This module may not have dependencies
        if (!deps.splice) {
            //deps is not an array, so probably means
            //an object literal or factory function for
            //the value. Adjust args.
            callback = deps;
            deps = [];
        }

        waiting[name] = [name, deps, callback];
    };

    define.amd = {
        jQuery: true
    };
}());

define("../vendor/almond", function(){});

// Generated by CoffeeScript 1.3.3

define('events/helpers/EventPhase',['require'],function(require) {
  return {
    CAPTURING_PHASE: 0,
    AT_TARGET: 1,
    BUBBLING_PHASE: 2
  };
});

// Generated by CoffeeScript 1.3.3

define('events/helpers/Event',['require','./EventPhase'],function(require) {
  var Event, EventPhase;
  EventPhase = require("./EventPhase");
  return Event = (function() {

    function Event(type, bubbles, cancelable) {
      var eventPhase,
        _this = this;
      this.type = type;
      this.bubbles = bubbles != null ? bubbles : false;
      this.cancelable = cancelable != null ? cancelable : false;
      this.type || (function() {
        throw "" + this + " type is not defined!";
      }).call(this);
      this._isCancelled = false;
      this._isCancelledNow = false;
      this.target = null;
      this.currentTarget = null;
      eventPhase = EventPhase.AT_TARGET;
      /* Getters and Setters
      */

      this.setEventPhase = function(phase) {
        return eventPhase = phase;
      };
      this.getEventPhase = function() {
        return eventPhase;
      };
    }

    Event.prototype.clone = function() {
      return new Event(this.type, this.bubbles, this.cancelable);
    };

    Event.prototype.stopImmediatePropagation = function() {
      this._isCancelled = this._isCancelledNow = true;
    };

    Event.prototype.stopPropagation = function() {
      this._isCancelled = true;
    };

    Event.prototype.toString = function() {
      return "[object Event " + this.type + "]";
    };

    Event.prototype.createSimilar = function(type, related, targ) {
      var result;
      result = new Event(this.type, this.bubbles, this.cancelable);
      if (targ) {
        result.target = targ;
      }
      return result;
    };

    return Event;

  })();
});

// Generated by CoffeeScript 1.3.3
var __hasProp = {}.hasOwnProperty;

define('utils/BaseClass',['require'],function(require) {
  var BaseClass;
  return BaseClass = (function() {

    function BaseClass() {}

    /* @TODO implement mixins
    */


    BaseClass.prototype.initConfig = function(config, listenerFunction) {
      var key, value;
      if (config == null) {
        config = null;
      }
      if (listenerFunction == null) {
        listenerFunction = null;
      }
      /* set default properties from which getters and setters will be generated
      */

      if (config) {
        for (key in config) {
          if (!__hasProp.call(config, key)) continue;
          value = config[key];
          this._createGetter(key);
          this._createSetter(key, value, listenerFunction);
        }
      }
    };

    BaseClass.prototype._createGetter = function(property) {
      var key, _ref;
      key = "get" + property.capitalize();
      if ((_ref = this[key]) == null) {
        this[key] = function() {
          return this["_" + property];
        };
      }
    };

    BaseClass.prototype._createSetter = function(property, val, listenerFunction) {
      var key, _ref;
      if (listenerFunction == null) {
        listenerFunction = null;
      }
      key = "set" + property.capitalize();
      if ((_ref = this[key]) == null) {
        this[key] = function(value) {
          this["_" + property] = value;
          if (listenerFunction && listenerFunction instanceof Function) {
            return listenerFunction.call(this);
          }
        };
      }
      this[key](val);
    };

    return BaseClass;

  })();
});

// Generated by CoffeeScript 1.3.3
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define('events/helpers/EventDispatcher',['require','./EventPhase','../../utils/BaseClass'],function(require) {
  var BaseClass, EventDispatcher, EventPhase, Listener, sIDs;
  EventPhase = require("./EventPhase");
  BaseClass = require("../../utils/BaseClass");
  sIDs = 1;
  Listener = (function() {

    function Listener(mListner, mUseCapture, mPriority) {
      this.mListner = mListner;
      this.mUseCapture = mUseCapture;
      this.mPriority = mPriority;
      this.mID = sIDs++;
    }

    Listener.prototype.Is = function(inListener, inCapture) {
      return this.mListner === inListener && this.mUseCapture === inCapture;
    };

    Listener.prototype.dispatchEvent = function(event) {
      return this.mListner(event);
    };

    return Listener;

  })();
  return EventDispatcher = (function(_super) {

    __extends(EventDispatcher, _super);

    function EventDispatcher(_target) {
      this._target = _target != null ? _target : this;
      this._eventMap = [];
    }

    EventDispatcher.prototype._getList = function(type) {
      return this._eventMap[type];
    };

    EventDispatcher.prototype._setList = function(type, list) {
      return this._eventMap[type] = list;
    };

    EventDispatcher.prototype._existList = function(type) {
      return this._eventMap[type] != null;
    };

    EventDispatcher.prototype._compareListeners = function(l1, l2) {
      if (l1.mPriority === l2.mPriority) {
        return 0;
      } else {
        if (l1.mPriority > l2.mPriority) {
          return -1;
        } else {
          return 1;
        }
      }
    };

    EventDispatcher.prototype.addEventListener = function(type, inListener, capture, priority, useWeakReference) {
      var list;
      if (capture == null) {
        capture = false;
      }
      if (priority == null) {
        priority = 0;
      }
      if (useWeakReference == null) {
        useWeakReference = false;
      }
      list = this._getList(type);
      if (!this._existList(type)) {
        list = [];
        this._setList(type, list);
      }
      list.push(new Listener(inListener, capture, priority));
      list.sort(this._compareListeners);
    };

    EventDispatcher.prototype.dispatchEvent = function(event) {
      var capture, idx, list, listener;
      if (!event.target) {
        event.target = this._target;
      }
      capture = event.eventPhase === EventPhase.CAPTURING_PHASE;
      if (this._existList(event.type)) {
        list = this._getList(event.type);
        idx = 0;
        while (idx < list.length) {
          listener = list[idx];
          if (listener.mUseCapture === capture) {
            listener.dispatchEvent(event);
            if (event._isCancelledNow === true) {
              return true;
            }
          }
          /* Detect if the just used event listener was removed...
          */

          if (idx < list.length && listener !== list[idx]) {
            /* do not advance to next item because it looks like one was just removed
            */

          } else {
            idx++;
          }
        }
        return true;
      } else {
        return false;
      }
    };

    EventDispatcher.prototype.hasEventListener = function(type) {
      return this._existList(type);
    };

    EventDispatcher.prototype.removeEventListener = function(type, listener, capture) {
      var i, list, _i, _ref;
      if (capture == null) {
        capture = false;
      }
      if (!this._existList(type)) {
        return;
      }
      list = this._getList(type);
      for (i = _i = 0, _ref = list.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        if (list[i].Is(type, listener)) {
          list.splice(i, 1);
          return;
        }
      }
    };

    EventDispatcher.prototype.toString = function() {
      return "[object EventDispatcher]";
    };

    EventDispatcher.prototype.willTrigger = function(type) {
      return this.hasEventListener(type);
    };

    return EventDispatcher;

  })(BaseClass);
});

// Generated by CoffeeScript 1.3.3
/* coordinates.events.helpers
*/

define('events/helpers/helpers',['require','./Event','./EventDispatcher','./EventPhase'],function(require) {
  var Event, EventDispatcher, EventPhase;
  Event = require("./Event");
  EventDispatcher = require("./EventDispatcher");
  EventPhase = require("./EventPhase");
  return {
    Event: Event,
    EventDispatcher: EventDispatcher,
    EventPhase: EventPhase
  };
});

// Generated by CoffeeScript 1.3.3
/* coordinates.events.CoordinateNodeEvent
*/

var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define('events/NodeEvent',['require','./helpers/Event'],function(require) {
  var Event, NodeEvent;
  Event = require("./helpers/Event");
  return NodeEvent = (function(_super) {

    __extends(NodeEvent, _super);

    NodeEvent.prototype.ADD = "coordyNodeAdd";

    NodeEvent.prototype.REMOVE = "coordyNodeRemove";

    function NodeEvent(type, node, bubbles, cancelable) {
      this.node = node;
      if (bubbles == null) {
        bubbles = false;
      }
      if (cancelable == null) {
        cancelable = false;
      }
      NodeEvent.__super__.constructor.call(this, type, bubbles, cancelable);
    }

    NodeEvent.prototype.clone = function() {
      return new NodeEvent(this.type, this.node, this.bubbles, this.cancelable);
    };

    return NodeEvent;

  })(Event);
});

// Generated by CoffeeScript 1.3.3
/* coordinates.events
*/

define('events/events',['require','./helpers/helpers','./NodeEvent'],function(require) {
  return {
    helpers: require("./helpers/helpers"),
    CoordinateNodeEvent: require("./NodeEvent")
  };
});

// Generated by CoffeeScript 1.3.3
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define('nodes/Node',['require','../utils/BaseClass'],function(require) {
  var BaseClass, Node;
  BaseClass = require("../utils/BaseClass");
  return Node = (function(_super) {

    __extends(Node, _super);

    function Node(link) {
      this.initConfig({
        link: link
      });
    }

    Node.prototype.toObject = function() {
      throw 'Method must be overriden by child class';
    };

    Node.prototype.toString = function() {
      return "[object Node]";
    };

    return Node;

  })(BaseClass);
});

// Generated by CoffeeScript 1.3.3
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define('nodes/twodee/Node2d',['require','../Node'],function(require) {
  var Node, Node2d;
  Node = require("../Node");
  return Node2d = (function(_super) {

    __extends(Node2d, _super);

    function Node2d(link, x, y, jitterX, jitterY) {
      if (link == null) {
        link = null;
      }
      if (x == null) {
        x = 0;
      }
      if (y == null) {
        y = 0;
      }
      if (jitterX == null) {
        jitterX = 0;
      }
      if (jitterY == null) {
        jitterY = 0;
      }
      Node2d.__super__.constructor.call(this, link);
      this.initConfig({
        rotation: 0,
        x: x,
        y: y,
        jitterX: jitterX,
        jitterY: jitterY
      });
    }

    Node2d.prototype.setJitterX = function(value) {
      return this._jitterX = Math.random() * value * (Math.random() > 0.5 ? -1 : 1);
    };

    Node2d.prototype.setJitterY = function(value) {
      return this._jitterY = Math.random() * value * (Math.random() > 0.5 ? -1 : 1);
    };

    Node2d.prototype.clone = function() {
      var n;
      n = new Node2d(this.getLink(), this.getX(), this.getY(), this.getJitterX(), this.getJitterY);
      n.setRotation(this.getRotation());
      return n;
    };

    Node2d.prototype.toObject = function() {
      return {
        x: this.getX(),
        y: this.getY(),
        jitterX: this.getJitterX(),
        jitterY: this.getJitterY(),
        rotation: this.getRotation()
      };
    };

    Node2d.prototype.toString = function() {
      return "[object Node2d]";
    };

    return Node2d;

  })(Node);
});

// Generated by CoffeeScript 1.3.3
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define('nodes/twodee/OrderedNode',['require','./Node2d'],function(require) {
  var Node2d, OrderedNode;
  Node2d = require("./Node2d");
  return OrderedNode = (function(_super) {

    __extends(OrderedNode, _super);

    function OrderedNode(link, order, x, y, jitterX, jitterY) {
      if (link == null) {
        link = null;
      }
      if (order == null) {
        order = 0;
      }
      if (x == null) {
        x = 0;
      }
      if (y == null) {
        y = 0;
      }
      if (jitterX == null) {
        jitterX = 0;
      }
      if (jitterY == null) {
        jitterY = 0;
      }
      OrderedNode.__super__.constructor.call(this, link, x, y, jitterX, jitterY);
      this.initConfig({
        order: order
      });
    }

    OrderedNode.prototype.clone = function() {
      return new OrderedNode(this.getLink, this.getOrder(), this.getX(), this.getY, this.getJitterX(), this.getJitterY());
    };

    OrderedNode.prototype.toObject = function() {
      return {
        order: this.getOrder(),
        x: this.getX(),
        y: this.getY(),
        rotation: this.getRotation()
      };
    };

    return OrderedNode;

  })(Node2d);
});

// Generated by CoffeeScript 1.3.3

define('nodes/twodee/twodee',['require','./Node2d','./OrderedNode'],function(require) {
  return {
    Node2d: require("./Node2d"),
    OrderedNode: require("./OrderedNode")
  };
});

// Generated by CoffeeScript 1.3.3

define('nodes/nodes',['require','./Node','./twodee/twodee'],function(require) {
  return {
    Node: require("./Node"),
    twodee: require("./twodee/twodee")
  };
});

// Generated by CoffeeScript 1.3.3
/* coordinates.links.Link
*/

var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define('links/Link',['require','../utils/BaseClass'],function(require) {
  var BaseClass, Link;
  BaseClass = require("../utils/BaseClass");
  return Link = (function(_super) {

    __extends(Link, _super);

    function Link(element, x, y, rotation, width, height) {
      if (x == null) {
        x = 0;
      }
      if (y == null) {
        y = 0;
      }
      if (rotation == null) {
        rotation = 0;
      }
      if (width == null) {
        width = 0;
      }
      if (height == null) {
        height = 0;
      }
      this.initConfig({
        element: element,
        x: x,
        y: y,
        rotation: rotation,
        width: width,
        height: height
      });
    }

    Link.prototype.toString = function() {
      return "[object Link]";
    };

    return Link;

  })(BaseClass);
});

// Generated by CoffeeScript 1.3.3
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define('links/DOMLink2d',['require','./Link'],function(require) {
  var DOMLink2d, Link;
  Link = require("./Link");
  return DOMLink2d = (function(_super) {

    __extends(DOMLink2d, _super);

    function DOMLink2d(element, x, y, rotation) {
      if (x == null) {
        x = 0;
      }
      if (y == null) {
        y = 0;
      }
      if (rotation == null) {
        rotation = 0;
      }
      element instanceof window.HTMLElement || (function() {
        throw "domElement must be an instance of HTMLElement";
      })();
      DOMLink2d.__super__.constructor.call(this, element, x, y, rotation);
      this.getElement().style.position = "absolute";
    }

    DOMLink2d.prototype.setX = function(value) {
      this._x = value;
      return this.applyTransform();
    };

    DOMLink2d.prototype.setY = function(value) {
      this._y = value;
      return this.applyTransform();
    };

    DOMLink2d.prototype.setRotation = function(value) {
      this._rotation = value;
      return this.applyTransform();
    };

    DOMLink2d.prototype.getHeight = function() {
      /* obtenir la hauteur
      */

      var r;
      r = this.getElement().style.height.match(/(\d+)(px)/) || (function() {
        throw "Error getting height at " + this;
      }).call(this);
      r[2] === "px" || (function() {
        throw "height must be expressed in px";
      })();
      return parseInt(r[1], 10);
    };

    DOMLink2d.prototype.getWidth = function() {
      /* obtenir la longueur
      */

      var r;
      r = this.getElement().style.width.match(/(\d+)(px)/) || (function() {
        throw "Error getting width at " + this;
      }).call(this);
      r[2] === "px" || (function() {
        throw "width must be expressed in px";
      })();
      return parseInt(r[1], 10);
    };

    DOMLink2d.prototype.applyTransform = function() {
      var transform, _i, _len, _ref;
      _ref = ['transform', "webkitTransform", "mozTransform", "oTransform", "msTransform"];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        transform = _ref[_i];
        this.getElement().style[transform] = "translate(" + this._x + "px," + this._y + "px) rotate(" + this._rotation + "deg)";
      }
    };

    DOMLink2d.prototype.toString = function() {
      return "[object DOMLink2d]";
    };

    return DOMLink2d;

  })(Link);
});

// Generated by CoffeeScript 1.3.3

define('links/links',['require','./Link','./DOMLink2d'],function(require) {
  return {
    Link: require("./Link"),
    DOMLink2d: require("./DOMLink2d")
  };
});

// Generated by CoffeeScript 1.3.3
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define('layouts/Layout',['require','../events/helpers/EventDispatcher','../events/NodeEvent'],function(require) {
  var EventDispatcher, Layout, NodeEvent;
  EventDispatcher = require("../events/helpers/EventDispatcher");
  NodeEvent = require("../events/NodeEvent");
  return Layout = (function(_super) {

    __extends(Layout, _super);

    function Layout() {
      Layout.__super__.constructor.call(this);
      this.size = 0;
      this.nodes = [];
    }

    Layout.prototype.addToLayout = function(object, moveToCoordinates) {
      /*
      */
      throw 'Method must be overriden by child class';
    };

    Layout.prototype.addNode = function(object, moveToCoordinates) {
      /*
      */
      throw 'Method must be overriden by child class';
    };

    Layout.prototype.addNodes = function(count) {
      /* Adds a specified number of empty nodes to the layout
      */

      var i, n, _i, _j, _len, _results, _results1;
      switch (typeof count) {
        case "number":
          _results = [];
          for (i = _i = 0; 0 <= count ? _i < count : _i > count; i = 0 <= count ? ++_i : --_i) {
            _results.push(this.addNode());
          }
          return _results;
          break;
        case "object":
          _results1 = [];
          for (_j = 0, _len = count.length; _j < _len; _j++) {
            n = count[_j];
            _results1.push(this.addNode(n));
          }
          return _results1;
      }
    };

    Layout.prototype.toString = function() {
      return "[object Layout]";
    };

    Layout.prototype.toJSON = function() {
      /*  Serializes the layout data of each node as a JSON string. Includes the 'type', 'size' and 'nodes' properties.
      */

      var i, nodes, _i, _ref;
      for (i = _i = 0, _ref = this.size; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        nodes = this.nodes[i].toObject();
      }
      return {
        type: this.toString(),
        size: this.size,
        nodes: nodes
      };
    };

    Layout.prototype.getNodeByLink = function(link) {
      /* Returns node object by specified display object
      */

      var node, _i, _len, _ref;
      _ref = this.nodes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        node = _ref[_i];
        if (node.getLink() === link) {
          return node;
        }
      }
      return null;
    };

    Layout.prototype.getNodeIndex = function(node) {
      /* Returns specified node object's index in the collection
      */
      return this.nodes.indexOf(node);
    };

    Layout.prototype.getNodeAt = function(index) {
      /* Returns node object at specified index of collection
      */
      return this.nodes[index];
    };

    Layout.prototype.linkExists = function(link) {
      /* Returns true if a link (DisplayObject owned by a layout's node) exists in the layout
      */

      var node, _i, _len, _ref;
      _ref = this.nodes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        node = _ref[_i];
        if (link === node.getLink()) {
          return true;
        }
      }
      return false;
    };

    Layout.prototype.swapNodeLinks = function(nodeTo, nodeFrom) {
      /* Swaps links of two node objects
      */

      var tmpLink;
      tmpLink = nodeTo.getLink();
      nodeTo.setLink(nodeFrom.getLink());
      nodeFrom.setLink(tmpLink);
    };

    Layout.prototype.removeLinks = function() {
      /* Removes all links between nodes and display objects
      */

      var node, _i, _len, _ref;
      _ref = this.nodes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        node = _ref[_i];
        node.setLink(null);
      }
    };

    Layout.prototype.removeLinkAt = function(index) {
      /* Removed the link between the node and display object at the specified index
      */
      return this.nodes[index].setLink(null);
    };

    Layout.prototype.removeNode = function(node) {
      var removedNode;
      removedNode = this.nodes.splice(this.getNodeIndex(node), 1)[0];
      this.dispatchEvent(new NodeEvent(NodeEvent.prototype.REMOVE, removedNode));
      return --this.size;
    };

    Layout.prototype.removeAllNodes = function() {
      /* Removes all nodes from the layout
      */
      this.nodes = [];
      return this.size = 0;
    };

    Layout.prototype.removeNodeByLink = function(link) {
      /* Removes the node that is linked to the specified object
      */

      var node, _i, _len, _ref;
      _ref = this.nodes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        node = _ref[_i];
        if (node.getLink() === link) {
          this.removeNode(node);
          return;
        }
      }
    };

    Layout.prototype.addLinkAt = function(link, index) {
      /* Adds a link between the specified display object to the node object at the specified index
      */
      return this.nodes[index].setLink(link);
    };

    Layout.prototype.storeNode = function(node) {
      if (!this.nodes) {
        this.nodes = [];
      }
      this.nodes.push(node);
      return ++this.size;
    };

    Layout.prototype.storeNodeAt = function(node, index) {
      if (!this.nodes) {
        this.nodes = [];
      }
      this.nodes.splice(index, 0, node);
      return ++this.size;
    };

    Layout.prototype.getNextAvailableNode = function() {
      var node, _i, _len, _ref;
      _ref = this.nodes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        node = _ref[_i];
        if (node.getLink() !== null) {
          return node;
        }
      }
    };

    return Layout;

  })(EventDispatcher);
});

// Generated by CoffeeScript 1.3.3

define('constants/LayoutUpdateMethod',['require'],function(require) {
  return {
    /* LayoutUpdateMethod
    */

    NONE: "none",
    UPDATE_ONLY: "updateOnly",
    UPDATE_AND_RENDER: "updateAndRender"
  };
});

// Generated by CoffeeScript 1.3.3
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define('layouts/twodee/Layout2d',['require','../Layout','../../constants/LayoutUpdateMethod'],function(require) {
  var Layout, Layout2d, LayoutUpdateMethod;
  Layout = require("../Layout");
  LayoutUpdateMethod = require("../../constants/LayoutUpdateMethod");
  return Layout2d = (function(_super) {
    var setProxyUpdater;

    __extends(Layout2d, _super);

    function Layout2d(x, y, jitterX, jitterY, width, height, rotation) {
      if (x == null) {
        x = 0;
      }
      if (y == null) {
        y = 0;
      }
      if (jitterX == null) {
        jitterX = 0;
      }
      if (jitterY == null) {
        jitterY = 0;
      }
      if (width == null) {
        width = 0;
      }
      if (height == null) {
        height = 0;
      }
      if (rotation == null) {
        rotation = 0;
      }
      Layout2d.__super__.constructor.call(this);
      this.setUpdateMethod(LayoutUpdateMethod.UPDATE_AND_RENDER);
      this.initConfig({
        x: x,
        y: y,
        width: width,
        height: height,
        rotation: rotation,
        jitterX: jitterX,
        jitterY: jitterY
      }, function() {
        return this.updateFunction();
      });
    }

    Layout2d.prototype.getUpdateMethod = function() {
      return this._updateMethod;
    };

    Layout2d.prototype.setUpdateMethod = function(v) {
      /* 
          Specifies whether layout properties (x, y, width, height, etc.) adjust the layout automatically without calling apply() method.
          An alternative method for updating layouts is to define a proxy updater using the proxyUpdater property
      */
      this._updateMethod = v;
      switch (v) {
        case LayoutUpdateMethod.NONE:
          return this.updateFunction = function() {};
        case LayoutUpdateMethod.UPDATE_ONLY:
          return this.updateFunction = this.update;
        default:
          return this.updateFunction = this.updateAndRender;
      }
    };

    Layout2d.prototype.getProxyUpdater = function() {
      return this._proxyUpdater;
    };

    setProxyUpdater = function(v) {
      /*
                      Sets a proxy update method for altering layouts as opposed to internal update methods such as update(), render() or updateAndRender()
                      This allows more customization for the updating sequence.
      */
      this.setUpdateMethod(v.name);
      this.updateFunction = v.update;
      return this._proxyUpdater = v;
    };

    Layout2d.prototype.addToLayout = function(link, moveToCoordinates) {
      /* Adds object to layout in next available position.
      */
      throw 'Method must be overriden by child class';
    };

    Layout2d.prototype.removeNode = function(node) {
      /* Removes specified cell and its link from layout organizer and adjusts layout appropriately
      */
      Layout2d.__super__.removeNode.apply(this, arguments).removeNode(node);
      this.updateFunction();
      this.dispatchEvent(new CoordyNodeEvent(CoordyNodeEvent.prototype.REMOVE, node));
    };

    Layout2d.prototype.executeUpdateMethod = function() {
      /* 
          Performs the update method defined by the <em>updateMethod</em> property. Is helpful for behaviors and proxy updaters to work within the defined functiality set at runtime.
      */
      return this.updateFunction();
    };

    Layout2d.prototype.update = function() {
      /*  
          Updates the nodes virtual coordinates. <strong>Note</strong> - this method does not update the actual objects linked to the layout.
      */

    };

    Layout2d.prototype.render = function() {
      /* Renders all layout property values to all objects in the collection
      */

      var node, _i, _len, _ref;
      _ref = this.nodes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        node = _ref[_i];
        if (node.getLink() !== null) {
          this.renderNode(node);
        }
      }
    };

    Layout2d.prototype.updateAndRender = function() {
      /* Performs an update on all the nodes' positions and renders each node's corresponding link
      */
      this.update();
      return this.render();
    };

    Layout2d.prototype.clone = function() {
      /* Clones the current object's properties (does not include links to DisplayDynamics)
      */
      throw 'Method must be overriden by child class';
    };

    Layout2d.prototype.renderNode = function(node) {
      /* Renders all layout property values of a specified node
      */
      node.getLink().setX(node.getX());
      return node.getLink().setY(node.getY());
    };

    Layout2d.prototype.validateObject = function(obj) {
      /* Determines if an object added to the layout contains the properties/methods required from the layout.
      */
      return true;
    };

    Layout2d.prototype.toString = function() {
      /* toString
      */
      return "[object Layout2d]";
    };

    return Layout2d;

  })(Layout);
});

// Generated by CoffeeScript 1.3.3
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define('layouts/twodee/VerticalLine',['require','./Layout2d','../../nodes/twodee/OrderedNode','../../events/NodeEvent'],function(require) {
  var Layout2d, NodeEvent, OrderedNode, VerticalLine;
  Layout2d = require("./Layout2d");
  OrderedNode = require("../../nodes/twodee/OrderedNode");
  NodeEvent = require("../../events/NodeEvent");
  return VerticalLine = (function(_super) {

    __extends(VerticalLine, _super);

    function VerticalLine(vPadding, x, y, jitterX, jitterY) {
      if (vPadding == null) {
        vPadding = 0;
      }
      if (x == null) {
        x = 0;
      }
      if (y == null) {
        y = 0;
      }
      if (jitterX == null) {
        jitterX = 0;
      }
      if (jitterY == null) {
        jitterY = 0;
      }
      VerticalLine.__super__.constructor.call(this, x, y, jitterX, jitterY);
      this.initConfig({
        vPadding: vPadding,
        order: null
      }, function() {
        return this.updateFunction;
      });
    }

    VerticalLine.prototype.toString = function() {
      return "[layout VerticalLine]";
    };

    VerticalLine.prototype.addNode = function(link, moveToCoordinates) {
      var node;
      if (link == null) {
        link = null;
      }
      if (moveToCoordinates == null) {
        moveToCoordinates = true;
      }
      /* Adds object to layout in next available position.
      */

      if (this.linkExists(link)) {
        return;
      }
      node = new OrderedNode(link, this.size);
      this.storeNode(node);
      this.update();
      if (moveToCoordinates) {
        this.render();
      }
      this.dispatchEvent(new NodeEvent(NodeEvent.prototype.ADD, node));
      return node;
    };

    VerticalLine.prototype.clone = function() {
      return new VerticalLine(this.getVPadding(), this.getX(), this.getY(), this.getJitterX(), this.getJitterY());
    };

    VerticalLine.prototype.update = function() {
      /*  Updates the nodes' virtual coordinates. <strong>Note</strong> - this method does not update the actual objects linked to the layout.
      */

      var node, yPos, _i, _len, _ref, _results;
      if (this.size !== 0) {
        this.nodes.sort(this.sortOnOrder);
        yPos = 0;
        _ref = this.nodes;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          node = _ref[_i];
          node.setY(yPos + this.getY() + node.getJitterY() * this.getJitterY());
          node.setX(this.getX() + (node.getJitterX() * this.getJitterX()));
          if (node.getLink() !== null) {
            _results.push(yPos += node.getLink().getHeight() + this.getVPadding());
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      }
    };

    VerticalLine.prototype.cleanOrder = function() {
      /* Cleans out duplicates and gaps
      */

      var index, node, _i, _len, _ref;
      _ref = this.nodes;
      for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
        node = _ref[index];
        node.setOrder(index);
      }
    };

    VerticalLine.prototype.sortOnOrder = function(n1, n2) {
      /* fonction d'aide pour le trie des noeux
      */
      return n1.getOrder() > n2.getOrder();
    };

    return VerticalLine;

  })(Layout2d);
});

// Generated by CoffeeScript 1.3.3

define('layouts/layouts',['require','./Layout','./twodee/Layout2d','./twodee/VerticalLine'],function(require) {
  return {
    Layout: require("./Layout"),
    twodee: {
      Layout2d: require("./twodee/Layout2d"),
      VerticalLine: require("./twodee/VerticalLine")
    }
  };
});

// Generated by CoffeeScript 1.3.3

define('helpers/helpers',['require'],function(require) {});

// Generated by CoffeeScript 1.3.3

define('utils/ES5shims',['require'],function(require) {
  var console, _base, _base1, _base2, _ref, _ref1, _ref2;
  if ((_ref = (_base = Object.prototype).defineProperties) == null) {
    _base.defineProperties = function(scope, properties) {};
  }
  if ((_ref1 = (_base1 = Array.prototype).indexOf) == null) {
    _base1.indexOf = function(needle) {
      var index, value, _i, _len;
      for (index = _i = 0, _len = this.length; _i < _len; index = ++_i) {
        value = this[index];
        if (value === needle) {
          return index;
        }
      }
      return -1;
    };
  }
  if ((_ref2 = (_base2 = String.prototype).capitalize) == null) {
    _base2.capitalize = function() {
      var capitalized, first, word, words;
      words = this.valueOf().split(" ");
      capitalized = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = words.length; _i < _len; _i++) {
          word = words[_i];
          first = word.slice(0, 1);
          first = first.toUpperCase();
          _results.push(first + word.slice(1));
        }
        return _results;
      })();
      return capitalized.join(" ");
    };
  }
  if (typeof console === void 0 && console === null) {
    return console = {
      log: function() {}
    };
  }
});

// Generated by CoffeeScript 1.3.3

define('utils/utils',['require','./ES5shims','./BaseClass'],function(require) {
  return {
    ES5shims: require("./ES5shims"),
    BaseClass: require("./BaseClass")
  };
});

// Generated by CoffeeScript 1.3.3

define('coordinates',['require','./events/events','./nodes/nodes','./links/links','./layouts/layouts','./helpers/helpers','./utils/utils'],function(require) {
  var Coordinates;
  Coordinates = {
    events: require("./events/events"),
    nodes: require("./nodes/nodes"),
    links: require("./links/links"),
    layouts: require("./layouts/layouts"),
    helpers: require("./helpers/helpers"),
    utils: require("./utils/utils")
  };
  /* shortcuts
  */

  Coordinates.DOMLink2d = Coordinates.links.DOMLink2d;
  Coordinates.Link = Coordinates.links.Link;
  Coordinates.Node = Coordinates.nodes.Node;
  Coordinates.Node2d = Coordinates.nodes.twodee.Node2d;
  Coordinates.Layout = Coordinates.layouts.Layout;
  Coordinates.Layout2d = Coordinates.layouts.twodee.Layout2d;
  Coordinates.VerticalLine = Coordinates.layouts.twodee.VerticalLine;
  Coordinates.BaseClass = Coordinates.utils.BaseClass;
  Coordinates.NodeEvent = Coordinates.events.NodeEvent;
  return Coordinates;
});
