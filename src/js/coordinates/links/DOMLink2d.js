// Generated by CoffeeScript 1.3.3
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(function(require) {
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
