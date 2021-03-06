// Generated by CoffeeScript 1.3.3

define(function(require) {
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
