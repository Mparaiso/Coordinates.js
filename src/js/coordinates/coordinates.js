// Generated by CoffeeScript 1.3.3

define(function(require) {
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
  Coordinates.Flow = Coordinates.layouts.twodee.Flow;
  Coordinates.Grid = Coordinates.layouts.twodee.Grid;
  Coordinates.Scatter = Coordinates.layouts.twodee.Scatter;
  Coordinates.Lattice = Coordinates.layouts.twodee.Lattice;
  Coordinates.LayoutTransitioner = Coordinates.utils.LayoutTransitioner;
  Coordinates.LayoutUpdateMethod = Coordinates.constants.LayoutUpdateMethod;
  Coordinates.FlowOverflowPolicy = Coordinates.constants.FlowOverflowPolicy;
  Coordinates.FlowDirection = Coordinates.constants.FlowDirection;
  Coordinates.FlowAlignment = Coordinates.constants.FlowAlignment;
  Coordinates.StackOrder = Coordinates.constants.StackOrder;
  Coordinates.LatticeAlternationPattern = Coordinates.constants.LatticeAlternationPattern;
  Coordinates.LatticeOrder = Coordinates.constants.LatticeOrder;
  Coordinates.LatticeType = Coordinates.constants.LatticeType;
  Coordinates.LayoutType = Coordinates.constants.LayoutType;
  /*
          FACADE : 
              EN : some methods to facilitate work with layouts
              FR : une série de méthodes pour faciliter le travail avec les layouts
  */

  /* @todo
  */

  Coordinates.createDom2dLinks = function(domElements) {
    /* creates and returns a or several DOMLink2d
    */

    var element, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = domElements.length; _i < _len; _i++) {
      element = domElements[_i];
      _results.push(new Coordinates.DOMLink2d(element));
    }
    return _results;
  };
  Coordinates.addLinksTolayout = function(links, layout) {
    /* 
        add links to layout 
        @return layout
    */
    return layout.addNodes(links);
  };
  Coordinates.createDomLinks = function(domElements) {
    var element, _i, _len;
    for (_i = 0, _len = domElements.length; _i < _len; _i++) {
      element = domElements[_i];
      return new Coordinates.DOMLink2d(element);
    }
  };
  Coordinates.createLayout = function(type, options, links) {
    var layout;
    if (links == null) {
      links = null;
    }
    /* helper method to create layouts
    */

    type = type.capitalize();
    layout = (function() {
      var alignAngleOffset, alignOffset, alignType, allowOverFlow, angle, angleDelta, circumference, columns, frequency, hDirection, hPadding, height, jitter, jitterRotation, jitterX, jitterY, offset, order, rotation, rows, spiralConstant, vDirection, vPadding, waveFunction, width, x, y;
      switch (type) {
        case Coordinates.LayoutType.ELLIPSE:
          width = options.width, height = options.height, x = options.x, y = options.y, rotation = options.rotation, jitterX = options.jitterX, jitterY = options.jitterY, alignType = options.alignType, alignAngleOffset = options.alignAngleOffset;
          return new Coordinates.Ellipse(width, height, x, y, rotation, jitterX, jitterY);
        case Coordinates.LayoutType.SPIRAL:
          circumference = options.circumference, x = options.x, y = options.y, spiralConstant = options.spiralConstant, angleDelta = options.angleDelta, rotation = options.rotation, jitterX = options.jitterX, jitterY = options.jitterY, alignType = options.alignType, alignOffset = options.alignOffset;
          return new Coordinates.Spiral(circumference, x, y, spiralConstant, angleDelta, rotation, jitterX, jitterY, alignType, alignOffset);
        case Coordinates.LayoutType.FLOW:
          width = options.width, height = options.height, x = options.x, y = options.y, hPadding = options.hPadding, vPadding = options.vPadding;
          return new Coordinates.Flow(width, height, x, y, hPadding, vPadding);
        case Coordinates.LayoutType.GRID:
          width = options.width, height = options.height, x = options.x, y = options.y, columns = options.columns, rows = options.rows, hPadding = options.hPadding, vPadding = options.vPadding, hDirection = options.hDirection, vDirection = options.vDirection, jitterX = options.jitterX, jitterY = options.jitterY;
          return new Coordinates.Grid(width, height, x, y, columns, rows, hPadding, vPadding, hDirection, vDirection, jitterX, jitterY);
        case Coordinates.LayoutType.HORIZONTAL_LINE:
          hPadding = options.hPadding, x = options.x, y = options.y, jitterX = options.jitterX, jitterY = options.jitterY;
          return new Coordinates.HorizontalLine(hPadding, x, y, jitterX, jitterY);
        case Coordinates.LayoutType.LATTICE:
          width = options.width, height = options.height, x = options.x, y = options.y, columns = options.columns, rows = options.rows, allowOverFlow = options.allowOverFlow, order = options.order, hPadding = options.hPadding, vPadding = options.vPadding, jitterX = options.jitterX, jitterY = options.jitterY;
          return new Coordinates.Lattice(width, height, x, y, columns, rows, allowOverFlow, order, hPadding, vPadding, jitterX, jitterY);
        case Coordinates.LayoutType.SCATTER:
          width = options.width, height = options.height, x = options.x, y = options.y, jitter = options.jitter, jitterRotation = options.jitterRotation;
          return new Coordinates.Scatter(width, height, x, y, jitter, jitterRotation);
        case Coordinates.LayoutType.STACK:
          angle = options.angle, offset = options.offset, x = options.x, y = options.y, order = options.order, jitterX = options.jitterX, jitterY = options.jitterY;
          return new Coordinates.Stack(angle, offset, x, y, order, jitterX, jitterY);
        case Coordinates.LayoutType.VERTICAL_LINE:
          vPadding = options.vPadding, x = options.x, y = options.y, jitterX = options.jitterX, jitterY = options.jitterY;
          return new Coordinates.VerticalLine(vPadding, x, y, jitterX, jitterY);
        case Coordinates.LayoutType.WAVE:
          width = options.width, height = options.height, x = options.x, y = options.y, frequency = options.frequency, waveFunction = options.waveFunction, jitterX = options.jitterX, jitterY = options.jitterY, alignType = options.alignType, alignOffset = options.alignOffset;
          return new Coordinates.Wave(width, height, x, y, frequency, waveFunction, jitterX, jitterY, alignType, alignOffset);
      }
    })();
    /* if links , then add nodes
    */

    if (links) {
      layout.addNodes(links);
    }
    /* return layout
    */

    return layout;
  };
  return Coordinates;
});
