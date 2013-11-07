// Generated by CoffeeScript 1.3.3
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(function(require) {
  var Flickr, ImageUrlModel;
  require("vendor/backbone-min");
  Flickr = require("app/service/Flickr");
  return ImageUrlModel = (function(_super) {

    __extends(ImageUrlModel, _super);

    function ImageUrlModel() {
      return ImageUrlModel.__super__.constructor.apply(this, arguments);
    }

    ImageUrlModel.prototype.defaults = {
      "format": "q"
    };

    ImageUrlModel.prototype.initialize = function(params) {
      return this.getUrl();
    };

    ImageUrlModel.prototype.getUrl = function() {
      if (!this.has("url")) {
        this.set("url", Flickr.getImageUrl(this.get("farm"), this.get("server"), this.get("id"), this.get("secret"), this.get("format")));
      }
      return this.get("url");
    };

    return ImageUrlModel;

  })(Backbone.Model);
});