// Generated by CoffeeScript 1.3.3
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(function(require) {
  var Coordinates, ES5shims, LayoutCollection, LayoutModel;
  require("vendor/backbone-min");
  ES5shims = require("coordinates/utils/ES5shims");
  LayoutModel = require("app/model/LayoutModel");
  Coordinates = require("coordinates/coordinates");
  return LayoutCollection = (function(_super) {

    __extends(LayoutCollection, _super);

    function LayoutCollection() {
      return LayoutCollection.__super__.constructor.apply(this, arguments);
    }

    LayoutCollection.prototype.model = LayoutModel;

    LayoutCollection.prototype.initialize = function(models) {
      /* crée les layouts à partir de la collection de layoutModel
      */

      var model, _i, _len;
      for (_i = 0, _len = models.length; _i < _len; _i++) {
        model = models[_i];
        model.instance = Coordinates.createLayout(model.type.toString(), model.options);
        model.instance.setUpdateMethod(Coordinates.LayoutUpdateMethod.UPDATE_ONLY);
      }
    };

    return LayoutCollection;

  })(Backbone.Collection);
});