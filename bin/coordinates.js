
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
      return l1.mPriority < l2.mPriority;
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
    NodeEvent: require("./NodeEvent")
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

    OrderedNode.prototype.toString = function() {
      return "[object OrderedNode]";
    };

    return OrderedNode;

  })(Node2d);
});

// Generated by CoffeeScript 1.3.3
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define('nodes/twodee/GridNode',['require','./Node2d'],function(require) {
  var GridNode, Node2d;
  Node2d = require("./Node2d");
  return GridNode = (function(_super) {

    __extends(GridNode, _super);

    /* Node used for Grid layout
    */


    function GridNode(link, column, row, x, y, jitterX, jitterY) {
      if (link == null) {
        link = null;
      }
      if (column == null) {
        column = -1;
      }
      if (row == null) {
        row = -1;
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
      GridNode.__super__.constructor.call(this, link, x, y, jitterX, jitterY);
      this.initConfig({
        row: row,
        column: column
      });
    }

    GridNode.prototype.clone = function() {
      return new GridNode(this._link, this._column, this._row, this._x, this._y, this._jitterX, this._jitterY);
    };

    GridNode.prototype.toString = function() {
      return "[object GridNode]";
    };

    GridNode.prototype.toObject = function() {
      return {
        row: this._row,
        column: this._column,
        x: this._x,
        y: this._y,
        jitterX: this._jitterX,
        jitterY: this._jitterY
      };
    };

    return GridNode;

  })(Node2d);
});

// Generated by CoffeeScript 1.3.3

define('nodes/twodee/twodee',['require','./Node2d','./OrderedNode','./GridNode'],function(require) {
  return {
    Node2d: require("./Node2d"),
    OrderedNode: require("./OrderedNode"),
    GridNode: require("./GridNode")
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
        height: height,
        order: 0
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

    DOMLink2d.prototype.setOrder = function(value) {
      this._order = value;
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
      if (!(this._element === void 0 || this._element === null)) {
        this.getElement().style.zIndex = this._order || 0;
        _ref = ['transform', "webkitTransform", "mozTransform", "oTransform", "msTransform"];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          transform = _ref[_i];
          this.getElement().style[transform] = "translate(" + (parseInt(this._x)) + "px," + (parseInt(this._y)) + "px) rotate(" + (parseInt(this._rotation)) + "deg)";
        }
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

    Layout.prototype.addNodes = function(nodes) {
      /* Adds a specified number of empty nodes to the layout
      */

      var n, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = nodes.length; _i < _len; _i++) {
        n = nodes[_i];
        _results.push(this.addNode(n));
      }
      return _results;
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

define('layouts/twodee/Layout2d',['require','../Layout','../../constants/LayoutUpdateMethod','../../nodes/twodee/Node2d','../../events/NodeEvent'],function(require) {
  var Layout, Layout2d, LayoutUpdateMethod, Node2d, NodeEvent;
  Layout = require("../Layout");
  LayoutUpdateMethod = require("../../constants/LayoutUpdateMethod");
  Node2d = require("../../nodes/twodee/Node2d");
  NodeEvent = require("../../events/NodeEvent");
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

    Layout2d.prototype.addNode = function(link, moveToCoordinates) {
      var node;
      if (moveToCoordinates == null) {
        moveToCoordinates = true;
      }
      /* Adds object to layout in next available position.
      */

      if (!this.linkExists(link)) {
        node = new Node2d(link, 0, 0, this._getRand(), this._getRand());
        this.storeNode(node);
        this.update();
        if (moveToCoordinates) {
          this.render();
        }
        this.dispatchEvent(new NodeEvent(NodeEvent.prototype.ADD, node));
        return node;
      }
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

    Layout2d.prototype._getRand = function() {
      /* obtenir un nomber aléatoire pour alimenter le jitter
      */
      return (Math.random() > 0.5 ? 1 : -1) * Math.random();
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
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define('layouts/twodee/HorizontalLine',['require','./Layout2d','../../events/NodeEvent','../../nodes/twodee/OrderedNode'],function(require) {
  var HorizontalLine, Layout2d, NodeEvent, OrderedNode;
  Layout2d = require("./Layout2d");
  NodeEvent = require("../../events/NodeEvent");
  OrderedNode = require("../../nodes/twodee/OrderedNode");
  return HorizontalLine = (function(_super) {

    __extends(HorizontalLine, _super);

    function HorizontalLine(hPadding, x, y, jitterX, jiiterY) {
      if (hPadding == null) {
        hPadding = 0;
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
      if (jiiterY == null) {
        jiiterY = 0;
      }
      HorizontalLine.__super__.constructor.call(this, x, y, jitterX, jiiterY);
      /* générer les getters et setters
      */

      this.initConfig({
        hPadding: hPadding
      }, function() {
        return this.updateFunction();
      });
    }

    HorizontalLine.prototype.toString = function() {
      /* returns the type of layout in a string format
      */
      return "[object HorizontalLine]";
    };

    HorizontalLine.prototype.addNode = function(link, moveToCoordinates) {
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
      this.cleanOrder();
      this.update();
      if (moveToCoordinates && link) {
        this.render();
      }
      this.dispatchEvent(new NodeEvent(NodeEvent.prototype.ADD, node));
      return node;
    };

    HorizontalLine.prototype.addToLayoutAt = function(link, index, moveToCoordinates) {
      var node;
      if (moveToCoordinates == null) {
        moveToCoordinates = true;
      }
      /* Adds object to layout in the specified order within the layout
      */

      if (this.linkExists(link)) {
        return;
      }
      if (!this.nodes) {
        this.nodes = [];
      }
      node = new OrderedNode(link, index, 0, 0);
      this.storeNodeAt(node, index);
      this.cleanOrder();
      this.update();
      if (moveToCoordinates) {
        render();
      }
      this.dispatchEvent(new NodeEvent(NodeEvent.prototype.ADD, node));
      return node;
    };

    HorizontalLine.prototype.clone = function() {
      /* Clones the current object's properties
      */
      return new HorizontalLine(this.getHPadding(), this.getX(), this.getY(), this.getJitterX(), this.getJitterY());
    };

    HorizontalLine.prototype.update = function() {
      var node, xPos, _i, _len, _ref, _results;
      if (!(this.size <= 0)) {
        this.nodes.sort(function(a, b) {
          return a.getOrder() > b.getOrder();
        });
        xPos = 0;
        _ref = this.nodes;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          node = _ref[_i];
          node.setX(xPos + this.getX() + (node.getJitterX() * this.getJitterX()));
          node.setY(this.getY());
          _results.push(xPos += node.getLink().getWidth() + this.getHPadding());
        }
        return _results;
      }
    };

    HorizontalLine.prototype.cleanOrder = function() {
      var i, _i, _ref, _results;
      this.nodes.sort(function(a, b) {
        return a.getOrder() > b.getOrder();
      });
      _results = [];
      for (i = _i = 0, _ref = this.size; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        _results.push(this.nodes[i].setOrder(i));
      }
      return _results;
    };

    return HorizontalLine;

  })(Layout2d);
});

// Generated by CoffeeScript 1.3.3
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define('nodes/twodee/EllipseNode',['require','./Node2d'],function(require) {
  var EllipseNode, Node2d;
  Node2d = require("./Node2d");
  return EllipseNode = (function(_super) {

    __extends(EllipseNode, _super);

    function EllipseNode(link, x, y, rotation, jitterX, jitterY) {
      if (link == null) {
        link = null;
      }
      if (x == null) {
        x = 0;
      }
      if (y == null) {
        y = 0;
      }
      if (rotation == null) {
        rotation = 0;
      }
      if (jitterX == null) {
        jitterX = 0;
      }
      if (jitterY == null) {
        jitterY = 0;
      }
      /* Node used for Ellipse layout
      */

      this.initConfig({
        rotation: rotation
      });
      EllipseNode.__super__.constructor.call(this, link, x, y, jitterX, jitterY);
    }

    EllipseNode.prototype.clone = function() {
      /* Creates an exact copy of node with link and position properties carried over
      */
      return new EllipseNode(this.getLink(), this.getX(), this.getY(), this.getRotation(), this.getJitterX(), this.getJitterY());
    };

    return EllipseNode;

  })(Node2d);
});

// Generated by CoffeeScript 1.3.3

define('constants/PathAlignType',{
  /* Nodes rotation is parallel to the layout's path
  */

  ALIGN_PARALLEL: "alignParallel",
  /* Nodes rotation is perpendicular to the layout's path
  */

  ALIGN_PERPENDICULAR: "alignPerpendicular",
  /* Nodes do not alter rotation to the layout's path
  */

  NONE: "noAlign"
});

// Generated by CoffeeScript 1.3.3
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define('layouts/twodee/Ellipse',['require','./Layout2d','../../nodes/twodee/EllipseNode','../../events/NodeEvent','../../constants/PathAlignType'],function(require) {
  var EllipseNode, Ellispe, Layout2d, NodeEvent, PathAlignType;
  Layout2d = require("./Layout2d");
  EllipseNode = require("../../nodes/twodee/EllipseNode");
  NodeEvent = require("../../events/NodeEvent");
  PathAlignType = require("../../constants/PathAlignType");
  return Ellispe = (function(_super) {

    __extends(Ellispe, _super);

    function Ellispe(width, height, x, y, rotation, jitterX, jitterY, alignType, alignAngleOffset) {
      if (x == null) {
        x = 0;
      }
      if (y == null) {
        y = 0;
      }
      if (rotation == null) {
        rotation = 0;
      }
      if (jitterX == null) {
        jitterX = 0;
      }
      if (jitterY == null) {
        jitterY = 0;
      }
      if (alignType == null) {
        alignType = PathAlignType.NONE;
      }
      if (alignAngleOffset == null) {
        alignAngleOffset = 0;
      }
      Ellispe.__super__.constructor.call(this, x, y, jitterX, jitterY, width, height, rotation);
      this.initConfig({
        alignType: alignType,
        alignAngleOffset: alignAngleOffset
      }, function() {
        return this.updateFunction();
      });
    }

    Ellispe.prototype.toString = function() {
      return "[object Ellipse]";
    };

    Ellispe.prototype.addNode = function(link, moveToCoordinates) {
      var node;
      if (moveToCoordinates == null) {
        moveToCoordinates = true;
      }
      /* Adds object to layout in next available position.
      */

      if (this.linkExists(link)) {
        return;
      }
      node = new EllipseNode(link, 0, 0, 0, 0, 0);
      this.storeNode(node);
      this.update();
      if (moveToCoordinates) {
        this.render();
      }
      this.dispatchEvent(new NodeEvent(NodeEvent.prototype.ADD, node));
      return node;
    };

    Ellispe.prototype.renderNode = function(node) {
      /* Renders all layout property values of a specified node
      */
      Ellispe.__super__.renderNode.call(this, node);
      return node.getLink().setRotation(this.getAlignType() === PathAlignType.NONE ? 0 : node.getRotation());
    };

    Ellispe.prototype.clone = function() {
      /* Clones the current object's properties
      */
      return new Ellispe(this.getWidth(), this.getHeight(), this.getX(), this.getY(), this.getRotation(), this.getJitterX(), this.getJitterY(), this.getAlignType(), this.getAlignAngleOffset());
    };

    Ellispe.prototype.update = function() {
      /* 
          Updates the nodes' virtual coordinates. <strong>Note</strong> 
          this method does not update 
          the actual objects linked to the layout.
      */

      var PI, h, i, node, rOffset, rad, w, _i, _len, _ref, _results;
      if (!(this.nodes.length <= 0)) {
        PI = Math.PI;
        w = this.getWidth() / 2;
        h = this.getHeight() / 2;
        rOffset = this.getRotation() * (PI / 180);
        _ref = this.nodes;
        _results = [];
        for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
          node = _ref[i];
          rad = ((PI * i) / (this.size / 2)) + rOffset;
          node.setX((w * Math.cos(rad)) + (w + this.getX()) + (node.getJitterX() * this.getJitterX()) - w);
          node.setY((h * Math.sin(rad)) + (h + this.getY()) + (node.getJitterY() * this.getJitterY()) - h);
          node.setRotation(Math.atan2((this.getY()) - node.getY(), this.getX() - node.getX()) * (180 / PI));
          if (this.getAlignType() === PathAlignType.ALIGN_PERPENDICULAR) {
            node.setRotation(node.getRotation() + 90);
          }
          _results.push(node.setRotation(node.getRotation() + this.getAlignAngleOffset()));
        }
        return _results;
      }
    };

    return Ellispe;

  })(Layout2d);
});

// Generated by CoffeeScript 1.3.3

define('constants/WaveFunction',{
  SINE: "sineFunction",
  COSINE: "cosineFunction",
  TAN: "tanFunction",
  ARCSINE: "arcsineFunction",
  ARCCOSINE: "arccosineFunction",
  ARCTAN: "arctanFunction"
});

// Generated by CoffeeScript 1.3.3
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define('layouts/twodee/Wave',['require','../../events/NodeEvent','../../constants/PathAlignType','../../constants/WaveFunction','./Layout2d'],function(require) {
  var Layout2d, NodeEvent, PathAlignType, Wave, WaveFunction;
  NodeEvent = require("../../events/NodeEvent");
  PathAlignType = require("../../constants/PathAlignType");
  WaveFunction = require("../../constants/WaveFunction");
  Layout2d = require("./Layout2d");
  return Wave = (function(_super) {
    var PI;

    __extends(Wave, _super);

    PI = Math.PI;

    Wave.prototype.setWaveFunction = function(value) {
      this._wavefunction = value || WaveFunction.SINE;
      switch (this._wavefunction) {
        case WaveFunction.SINE:
          return this._function = Math.sin;
        case WaveFunction.COSINE:
          return this._function = Math.cos;
        case WaveFunction.TAN:
          return this._function = Math.tan;
        case WaveFunction.ARCSINE:
          return this._function = Math.asin;
        case WaveFunction.ARCOSINE:
          return this._function = Math.acos;
        case WaveFunction.ARCTAN:
          return this._function = Math.atan;
        default:
          return this._function = Math.sin;
      }
    };

    Wave.prototype.getWaveFunction = function() {
      return this._wavefunction;
    };

    Wave.prototype.getAlignType = function() {
      return this._alignType;
    };

    Wave.prototype.getAlignOffset = function() {
      return this._alignOffset;
    };

    function Wave(width, height, x, y, frequency, waveFunction, jitterX, jitterY, alignType, alignOffset) {
      if (x == null) {
        x = 0;
      }
      if (y == null) {
        y = 0;
      }
      if (frequency == null) {
        frequency = 1;
      }
      if (waveFunction == null) {
        waveFunction = WaveFunction.SINE;
      }
      if (jitterX == null) {
        jitterX = 0;
      }
      if (jitterY == null) {
        jitterY = 0;
      }
      if (alignType == null) {
        alignType = PathAlignType.ALIGN_PERPENDICULAR;
      }
      if (alignOffset == null) {
        alignOffset = 0;
      }
      /* Distributes nodes in a wave.
      */

      Wave.__super__.constructor.call(this, x, y, jitterX, jitterY, width, height);
      this.initConfig({
        frequency: frequency,
        waveFunction: waveFunction,
        alignType: alignType,
        alignOffset: alignOffset
      }, function() {
        return this.updateFunction();
      });
      this._heightMultiplier = 0;
      this._thetaOffset = 0;
    }

    Wave.prototype.toString = function() {
      /* Returns the type of layout in a string format
      */
      return "[object Wave]";
    };

    Wave.prototype.clone = function() {
      return new Wave(this.getWidth(), this.getHeight(), this.getX(), this.getY(), this.getFrequency(), this.getWaveFunction(), this.getJitterX(), this.getJitterY(), this.getAlignType(), this.getAlignOffset());
    };

    Wave.prototype.render = function() {
      /* Applies all layout property values to all cells/display objects in the collection
      */

      var node, _i, _len, _ref, _results;
      _ref = this.nodes;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        node = _ref[_i];
        if (node.getLink() !== null) {
          _results.push(this.renderNode(node));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    Wave.prototype.renderNode = function(node) {
      Wave.__super__.renderNode.call(this, node);
      return node.getLink().setRotation(this.getAlignType() === PathAlignType.NONE ? 0 : node.getRotation());
    };

    Wave.prototype.update = function() {
      /* 
          Updates the nodes' virtual coordinates. <strong>Note</strong> - 
          this method does not update
          the actual objects linked to the layout.
      */

      var i, jitter, len, n, _i, _len, _ref, _results;
      len = this.nodes.length;
      if (!(len <= 0)) {
        _ref = this.nodes;
        _results = [];
        for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
          n = _ref[i];
          n.setX(i * (this.getWidth() / len) + this.getX() + (n.getJitterX() * this.getJitterX()));
          jitter = this._y + (n._jitterY * this._jitterY);
          n.setY((this._function(PI * (i + 1) / (len / 2) * this._frequency - (this._thetaOffset * PI / 180)) * ((this._height + (this._heightMultiplier * i)) / 2)) + jitter);
          if (this._function === Math.sin) {
            n.setRotation(Math.cos(PI * (i + 1) / (len / 2) * this._frequency) * 180 / PI);
          } else if (this._function === Math.cos) {
            n.setRotation(Math.sin(PI * (i + 1) / (len / 2) * this.frequency) * 180 / PI);
          } else {
            n.setRotation(0);
          }
          if (this._alignType === PathAlignType.ALIGN_PERPENDICULAR) {
            n.setRotation(n.getRotation() + 90);
          }
          _results.push(n.setRotation(n.getRotation() + this._alignOffset));
        }
        return _results;
      }
    };

    return Wave;

  })(Layout2d);
});

// Generated by CoffeeScript 1.3.3

define('constants/StackOrder',{
  ASCENDING: "stackAscending",
  DESCENDING: "stackDescending"
});

// Generated by CoffeeScript 1.3.3
/* @TODO écrire addToLayoutAt
*/

var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define('layouts/twodee/Stack',['require','./Layout2d','../../constants/StackOrder','../../nodes/twodee/OrderedNode','../../events/NodeEvent'],function(require) {
  var Layout2d, NodeEvent, OrderedNode, Stack, StackOrder;
  Layout2d = require("./Layout2d");
  StackOrder = require("../../constants/StackOrder");
  OrderedNode = require("../../nodes/twodee/OrderedNode");
  NodeEvent = require("../../events/NodeEvent");
  return Stack = (function(_super) {

    __extends(Stack, _super);

    /* Distributes nodes in a stack.
    */


    function Stack(angle, offset, x, y, order, jitterX, jitterY) {
      if (angle == null) {
        angle = 45;
      }
      if (offset == null) {
        offset = 5;
      }
      if (x == null) {
        x = 0;
      }
      if (y == null) {
        y = 0;
      }
      if (order == null) {
        order = StackOrder.ASCENDING;
      }
      if (jitterX == null) {
        jitterX = 0;
      }
      if (jitterY == null) {
        jitterY = 0;
      }
      Stack.__super__.constructor.call(this, x, y, jitterX, jitterY);
      this.initConfig({
        angle: angle,
        offset: offset,
        order: order
      }, function() {
        return this.updateFunction;
      });
    }

    Stack.prototype.toString = function() {
      /* Returns the type of layout in a string format
      */
      return "[object Stack]";
    };

    Stack.prototype.addNode = function(link, moveToCoordinates) {
      var node;
      if (moveToCoordinates == null) {
        moveToCoordinates = true;
      }
      /* Adds object to layout in next available position.
      */

      if (this.linkExists(link)) {
        return;
      }
      node = new OrderedNode(link, this.nodes.length - 1);
      this.storeNode(node);
      this.cleanOrder();
      this.update();
      if (moveToCoordinates) {
        this.render();
      }
      this.dispatchEvent(new NodeEvent(NodeEvent.prototype.ADD, node));
      return node;
    };

    Stack.prototype.clone = function() {
      /* Clones the current object's properties (does not include links to DisplayObjects)
      */
      return new Stack(this._angle, this._offset, this._x, this._y, this._order, this._jitterX, this._jitterY);
    };

    Stack.prototype.renderNode = function(node) {
      Stack.__super__.renderNode.call(this, node);
      node.getLink().setOrder(node.getOrder());
    };

    Stack.prototype.update = function() {
      var i, node, rad, _i, _ref;
      if (!(this.nodes.length <= 0)) {
        this.cleanOrder();
        rad = this._angle * Math.PI / 180;
        if (this._order === StackOrder.ASCENDING) {
          this.nodes.sort(function(n2, n1) {
            return n2.getOrder() - n1.getOrder();
          });
        } else {
          this.nodes.sort(function(n2, n1) {
            return n1.getOrder() - n2.getOrder();
          });
        }
        for (i = _i = 0, _ref = this.nodes.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
          node = this.nodes[i];
          node.setX(this._x + (Math.cos(rad) * this._offset * i) + (node.getJitterX() * this._jitterX));
          node.setY(this._y + (Math.sin(rad) * this._offset * i) + (node.getJitterY() * this._jitterY));
        }
      }
    };

    Stack.prototype.cleanOrder = function() {
      /* sort croissant
      */

      /* normalisation des order de chaque OrderNode
      */

      var i, node, _i, _len, _ref;
      _ref = this.nodes;
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        node = _ref[i];
        this.nodes[i].setOrder(i);
      }
    };

    return Stack;

  })(Layout2d);
});

// Generated by CoffeeScript 1.3.3
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define('layouts/twodee/Spiral',['require','./Layout2d','../../constants/PathAlignType','../../events/NodeEvent'],function(require) {
  var Layout2d, NodeEvent, PathAlignType, Spiral;
  Layout2d = require("./Layout2d");
  PathAlignType = require("../../constants/PathAlignType");
  NodeEvent = require("../../events/NodeEvent");
  return Spiral = (function(_super) {
    var PI;

    __extends(Spiral, _super);

    PI = Math.PI;

    function Spiral(circumference, x, y, spiralConstant, angleDelta, rotation, jitterX, jitterY, alignType, alignOffset) {
      if (x == null) {
        x = 0;
      }
      if (y == null) {
        y = 0;
      }
      if (spiralConstant == null) {
        spiralConstant = 0.15;
      }
      if (angleDelta == null) {
        angleDelta = 30;
      }
      if (rotation == null) {
        rotation = 0;
      }
      if (jitterX == null) {
        jitterX = 0;
      }
      if (jitterY == null) {
        jitterY = 0;
      }
      if (alignType == null) {
        alignType = PathAlignType.NONE;
      }
      if (alignOffset == null) {
        alignOffset = 0;
      }
      /* Distributes nodes in a spiral.
      */

      Spiral.__super__.constructor.call(this, x, y, jitterX, jitterY);
      this.initConfig({
        circumference: circumference,
        spiralConstant: spiralConstant,
        alignType: alignType,
        alignOffset: alignOffset,
        angleDelta: angleDelta
      }, function() {
        return this.userFunction;
      });
    }

    Spiral.prototype.toString = function() {
      return "[object Spiral]";
    };

    Spiral.prototype.renderNode = function(node) {
      Spiral.__super__.renderNode.call(this, node);
      return node.getLink().setRotation(this._alignType === PathAlignType.NONE ? 0 : node.getRotation());
    };

    Spiral.prototype.clone = function() {
      return new Spiral(this._circumference, this._spiralConstant, this._x, this._y, this._angleDelta, this._rotation, this._jitterX, this._jitterY, this._alignType, this._alignOffset);
    };

    Spiral.prototype.update = function() {
      /* Updates the nodes' virtual coordinates. <strong>Note</strong> - this method does not update the actual objects linked to the layout.
      */

      var i, node, phi, _i, _len, _ref;
      if (!(this.nodes.length <= 0)) {
        _ref = this.nodes;
        for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
          node = _ref[i];
          phi = this._angleDelta * i * PI / 180;
          node.setX(this._x + this._circumference * Math.exp(this._spiralConstant * phi) * Math.cos(phi));
          node.setY(this._y + this._circumference * Math.exp(this._spiralConstant * phi) * Math.sin(phi));
          node.setRotation(Math.atan2(this._y - node.getY(), this._x - node.getX()) * (180 / PI));
          if (this._alignType === PathAlignType.ALIGN_PERPENDICULAR) {
            node.setRotation(node.getRotation() + 90);
          }
          node.setRotation(node.getRotation() + this._alignOffset);
        }
      }
    };

    return Spiral;

  })(Layout2d);
});

// Generated by CoffeeScript 1.3.3

define('constants/GridLayoutDirection',{
  LEFT_TO_RIGHT: "leftToRight",
  RIGHT_TO_LEFT: "rightToLeft",
  TOP_TO_BOTTOM: "upToDown",
  BOTTOM_TO_TOP: "downToUp"
});

// Generated by CoffeeScript 1.3.3
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define('layouts/twodee/Grid',['require','./Layout2d','../../constants/GridLayoutDirection','../../events/NodeEvent','../../nodes/twodee/GridNode'],function(require) {
  /*@TODO implementer les méthodes manquantes
  */

  var Grid, GridLayoutDirection, GridNode, Layout2d, NodeEvent;
  Layout2d = require("./Layout2d");
  GridLayoutDirection = require("../../constants/GridLayoutDirection");
  NodeEvent = require("../../events/NodeEvent");
  GridNode = require("../../nodes/twodee/GridNode");
  return Grid = (function(_super) {

    __extends(Grid, _super);

    function Grid(width, height, columns, rows, x, y, hPadding, vPadding, hDirection, vDirection, jitterX, jitterY) {
      if (x == null) {
        x = 0;
      }
      if (y == null) {
        y = 0;
      }
      if (hPadding == null) {
        hPadding = 0;
      }
      if (vPadding == null) {
        vPadding = 0;
      }
      if (hDirection == null) {
        hDirection = GridLayoutDirection.LEFT_TO_RIGHT;
      }
      if (vDirection == null) {
        vDirection = GridLayoutDirection.TOP_TO_BOTTOM;
      }
      if (jitterX == null) {
        jitterX = 0;
      }
      if (jitterY == null) {
        jitterY = 0;
      }
      /* Distributes nodes in a grid.
      */

      Grid.__super__.constructor.call(this, x, y, jitterX, jitterY, width, height);
      this.initConfig({
        columns: columns,
        rows: rows,
        hPadding: hPadding,
        vPadding: vPadding,
        hDirection: hDirection,
        vDirection: vDirection
      }, function() {
        return this.updateFunction;
      });
    }

    Grid.prototype.setColumns = function(v) {
      this._columns = v;
      this._maxNodes = this._columns * this._rows;
      return this.updateFunction();
    };

    Grid.prototype.setRows = function(v) {
      this._rows = v;
      this._maxNodes = this._columns * this._rows;
      return this.updateFunction();
    };

    Grid.prototype.addNode = function(link, moveToCoordinates) {
      var c, d, node, r;
      if (moveToCoordinates == null) {
        moveToCoordinates = true;
      }
      if (this.linkExists(link) || this.size > this._maxNodes) {
        return;
      }
      d = this.calculateCellSize();
      c = this.size % this._columns;
      r = Math.floor(this.size / (this._maxNodes / this._rows));
      node = new GridNode(link, c, r, d.width * c + c * this._hPadding + this._x, d.height * r + r * this._vPadding + this._y);
      this.storeNode(node);
      if (moveToCoordinates) {
        link.setX(node.getX());
        link.setY(node.getY());
      }
      this.dispatchEvent(new NodeEvent(NodeEvent.prototype.ADD, node));
      return node;
    };

    Grid.prototype.toString = function() {
      return "[object Grid]";
    };

    Grid.prototype.getColumn = function(column) {
      /* Get cell objects by column index
      */

      var i, node, _i, _len, _ref, _results;
      _ref = this.nodes;
      _results = [];
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        node = _ref[i];
        _results.push(this.nodes[(i * this._columns) + column]);
      }
      return _results;
    };

    Grid.prototype.getRow = function(row) {
      /* Get cell objects by row index
      */

      var i, _i, _ref, _ref1, _results;
      _results = [];
      for (i = _i = _ref = row * this._columns, _ref1 = row * this._columns + this._columns; _ref <= _ref1 ? _i < _ref1 : _i > _ref1; i = _ref <= _ref1 ? ++_i : --_i) {
        _results.push(this.nodes[i]);
      }
      return _results;
    };

    Grid.prototype.update = function() {
      var c, d, i, node, r, total, _i, _len, _ref;
      if (!(this.nodes.length <= 0)) {
        total = this._columns * this._rows;
        d = this.calculateCellSize();
        _ref = this.nodes;
        for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
          node = _ref[i];
          if (!node) {
            break;
          }
          c = i % this._columns;
          r = Math.floor(i / (total / this._rows));
          if (this._hDirection === GridLayoutDirection.RIGHT_TO_LEFT) {
            c = (this._columns - 1) - c;
          }
          if (this._vDirection === GridLayoutDirection.BOTTOM_TO_TOP) {
            r = (this._rows - 1)(-r);
          }
          node.setX = d.width * c + c * this._hPadding + this._x;
          node.setY = d.height * r + r * this._vPadding + this._y;
        }
      }
    };

    Grid.prototype.calculateCellSize = function() {
      return {
        x: 0,
        y: 0,
        width: (this._width - ((this._columns - 1) * this._hPadding)) / this._columns,
        height: (this._height - ((this._rows - 1) * this._vPadding)) / this._rows
      };
    };

    return Grid;

  })(Layout2d);
});

// Generated by CoffeeScript 1.3.3

define('layouts/layouts',['require','./Layout','./twodee/Layout2d','./twodee/VerticalLine','./twodee/HorizontalLine','./twodee/Ellipse','./twodee/Wave','./twodee/Stack','./twodee/Spiral','./twodee/Grid'],function(require) {
  return {
    Layout: require("./Layout"),
    twodee: {
      Layout2d: require("./twodee/Layout2d"),
      VerticalLine: require("./twodee/VerticalLine"),
      HorizontalLine: require("./twodee/HorizontalLine"),
      Ellipse: require("./twodee/Ellipse"),
      Wave: require("./twodee/Wave"),
      Stack: require("./twodee/Stack"),
      Spiral: require("./twodee/Spiral"),
      Grid: require("./twodee/Grid")
    }
  };
});

// Generated by CoffeeScript 1.3.3

define('helpers/helpers',['require'],function(require) {});

// Generated by CoffeeScript 1.3.3

define('utils/ES5shims',['require'],function(require) {
  var console, _base, _base1, _ref, _ref1;
  if ((_ref = (_base = Array.prototype).indexOf) == null) {
    _base.indexOf = function(needle) {
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
  if ((_ref1 = (_base1 = String.prototype).capitalize) == null) {
    _base1.capitalize = function() {
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
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define('utils/LayoutTransitioner',['require','./BaseClass'],function(require) {
  var BaseClass, LayoutTransitioner;
  BaseClass = require("./BaseClass");
  return LayoutTransitioner = (function(_super) {

    __extends(LayoutTransitioner, _super);

    function LayoutTransitioner(tweenFunction, layout) {
      this.initConfig({
        tweenFunction: tweenFunction,
        layout: layout
      });
    }

    LayoutTransitioner.prototype.syncNodesTo = function(layout) {
      var node, _i, _len, _ref, _results;
      if (layout == null) {
        layout = null;
      }
      if (layout) {
        this.setLayout(layout);
      }
      if (this.getTweenFunction() === null) {
        return this.getLayout().updateAndRender();
      } else {
        _ref = this.getLayout().nodes;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          node = _ref[_i];
          _results.push(this.getTweenFunction()(node));
        }
        return _results;
      }
    };

    return LayoutTransitioner;

  })(BaseClass);
});

// Generated by CoffeeScript 1.3.3

define('utils/utils',['require','./ES5shims','./BaseClass','./LayoutTransitioner'],function(require) {
  return {
    ES5shims: require("./ES5shims"),
    BaseClass: require("./BaseClass"),
    LayoutTransitioner: require("./LayoutTransitioner")
  };
});

// Generated by CoffeeScript 1.3.3

define('constants/constants',['require','./LayoutUpdateMethod','./PathAlignType','./WaveFunction','./StackOrder','./GridLayoutDirection'],function(require) {
  return {
    LayoutUpdateMethod: require("./LayoutUpdateMethod"),
    PathAlignType: require("./PathAlignType"),
    WaveFunction: require("./WaveFunction"),
    StackOrder: require("./StackOrder"),
    GridLayoutDirection: require("./GridLayoutDirection")
  };
});

// Generated by CoffeeScript 1.3.3

define('Coordinates',['require','./events/events','./nodes/nodes','./links/links','./layouts/layouts','./helpers/helpers','./utils/utils','./constants/constants'],function(require) {
  var Coordinates;
  Coordinates = {
    events: require("./events/events"),
    nodes: require("./nodes/nodes"),
    links: require("./links/links"),
    layouts: require("./layouts/layouts"),
    helpers: require("./helpers/helpers"),
    utils: require("./utils/utils"),
    constants: require("./constants/constants")
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
  Coordinates.HorizontalLine = Coordinates.layouts.twodee.HorizontalLine;
  Coordinates.Ellipse = Coordinates.layouts.twodee.Ellipse;
  Coordinates.BaseClass = Coordinates.utils.BaseClass;
  Coordinates.NodeEvent = Coordinates.events.NodeEvent;
  Coordinates.Wave = Coordinates.layouts.twodee.Wave;
  Coordinates.Stack = Coordinates.layouts.twodee.Stack;
  Coordinates.Spiral = Coordinates.layouts.twodee.Spiral;
  Coordinates.Grid = Coordinates.layouts.twodee.Grid;
  Coordinates.LayoutTransitioner = Coordinates.utils.LayoutTransitioner;
  Coordinates.LayoutUpdateMethod = Coordinates.constants.LayoutUpdateMethod;
  Coordinates.StackOrder = Coordinates.constants.StackOrder;
  return Coordinates;
});
