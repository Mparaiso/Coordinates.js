
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

define('events/helpers/IEventDispatcher',['require'],function(require) {
  var IEventDispatcher;
  return IEventDispatcher = (function() {

    function IEventDispatcher() {}

    IEventDispatcher.prototype.addEventListener = function(type, listener) {};

    IEventDispatcher.prototype.dispatchEvent = function(event) {};

    IEventDispatcher.prototype.hasEventListener = function(type) {};

    IEventDispatcher.prototype.removeEventLisnter = function(type, listener) {};

    IEventDispatcher.prototype.willTrigger = function(type) {};

    return IEventDispatcher;

  })();
});

// Generated by CoffeeScript 1.3.3
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define('events/helpers/EventDispatcher',['require','./IEventDispatcher','./EventPhase'],function(require) {
  var EventDispatcher, EventPhase, IEventDispatcher, Listener, sIDs;
  IEventDispatcher = require("./IEventDispatcher");
  EventPhase = require("./EventPhase");
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

  })(IEventDispatcher);
});

// Generated by CoffeeScript 1.3.3
/* coordinates.events.helpers
*/

define('events/helpers/helpers',['require','./Event','./EventDispatcher','./EventPhase','./IEventDispatcher'],function(require) {
  var Event, EventDispatcher, EventPhase, IEventDispatcher;
  Event = require("./Event");
  EventDispatcher = require("./EventDispatcher");
  EventPhase = require("./EventPhase");
  IEventDispatcher = require("./IEventDispatcher");
  return {
    Event: Event,
    EventDispatcher: EventDispatcher,
    EventPhase: EventPhase,
    IEventDispatcher: IEventDispatcher
  };
});

// Generated by CoffeeScript 1.3.3
/* coordinates.events.CoordinateNodeEvent
*/

var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define('events/CoordinatesNodeEvent',['require','./helpers/Event'],function(require) {
  var CoordinateNodeEvent, Event;
  Event = require("./helpers/Event");
  return CoordinateNodeEvent = (function(_super) {

    __extends(CoordinateNodeEvent, _super);

    CoordinateNodeEvent.prototype.ADD = "coordyNodeAdd";

    CoordinateNodeEvent.prototype.REMOVE = "coordyNodeRemove";

    function CoordinateNodeEvent(type, node, bubbles, cancelable) {
      this.node = node;
      if (bubbles == null) {
        bubbles = false;
      }
      if (cancelable == null) {
        cancelable = false;
      }
      CoordinateNodeEvent.__super__.constructor.call(this, type, bubbles, cancelable);
    }

    CoordinateNodeEvent.prototype.clone = function() {
      return new CoordinateNodeEvent(this.type, this.node, this.bubbles, this.cancelable);
    };

    return CoordinateNodeEvent;

  })(Event);
});

// Generated by CoffeeScript 1.3.3
/* coordinates.events
*/

define('events/events',['require','./helpers/helpers','./CoordinatesNodeEvent'],function(require) {
  var CoordinateNodeEvent, helpers;
  helpers = require("./helpers/helpers");
  CoordinateNodeEvent = require("./CoordinatesNodeEvent");
  return {
    helpers: helpers,
    CoordinateNodeEvent: CoordinateNodeEvent
  };
});

// Generated by CoffeeScript 1.3.3

define('coordinates',['require','./events/events'],function(require) {
  var events;
  events = require("./events/events");
  return {
    events: events
  };
});
