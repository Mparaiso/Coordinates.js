// Generated by CoffeeScript 1.3.3

define(function(require) {
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
  return Coordinates;
});
