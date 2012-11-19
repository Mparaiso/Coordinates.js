// Generated by CoffeeScript 1.3.3
/* coordinates.links.Link
*/

var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(function(require) {
  var BaseClass, Link;
  BaseClass = require("../utils/BaseClass");
  return Link = (function(_super) {

    __extends(Link, _super);

    function Link(element, x, y, rotation) {
      if (x == null) {
        x = 0;
      }
      if (y == null) {
        y = 0;
      }
      if (rotation == null) {
        rotation = 0;
      }
      this.initConfig({
        element: element,
        x: x,
        y: y,
        rotation: rotation
      });
    }

    Link.prototype.toString = function() {
      return "[object Link]";
    };

    return Link;

  })(BaseClass);
});
