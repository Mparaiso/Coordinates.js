// Generated by CoffeeScript 1.3.3
/*
    Coordinates.js tests with qunit
*/

var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

require(["../src/js/coordinates/coordinates"], function(coordinates) {
  /* helper pour le debugging via console
  */
  window.Coordinates = coordinates;
  test("coordinates is loaded", function() {
    return ok(coordinates !== null, "coordinates is not null");
  });
  module("ES5shims", {
    setup: function() {
      this.MyClass = (function(_super) {

        __extends(_Class, _super);

        function _Class() {
          _Class.__super__.constructor.call(this);
          this.initConfig({
            x: 1,
            y: 2,
            z: 3
          });
        }

        _Class.prototype.getX = function() {
          return this._x * 2;
        };

        _Class.prototype.setZ = function(v) {
          return this._z = v / 2;
        };

        return _Class;

      })(Coordinates.BaseClass);
      window.MyClass = this.MyClass;
      this.MySuperClass = (function(_super) {

        __extends(_Class, _super);

        function _Class() {
          _Class.__super__.constructor.call(this);
          this.initConfig({
            a: 1,
            b: 2,
            c: 3
          });
        }

        return _Class;

      })(this.MyClass);
      return window.MySuperClass = this.MySuperClass;
    },
    teardown: function() {}
  });
  test("capitalize", function() {
    var expectedSentence, testSentence;
    testSentence = "this is a sentence";
    expectedSentence = "This Is A Sentence";
    equal(testSentence.capitalize(), expectedSentence, "capitalize");
    testSentence = "this is a sentence with  spaces";
    expectedSentence = "This Is A Sentence With  Spaces";
    return equal(testSentence.capitalize(), expectedSentence, "capitalize with spaces");
  });
  test("BaseClass", function() {
    var myClass, mySuperClass;
    myClass = new this.MyClass();
    equal(myClass.getX(), 2, "BaseClass.initConfig");
    myClass.setZ(10);
    equal(myClass.getZ(), 5, "BaseClass.initConfig");
    mySuperClass = new this.MySuperClass();
    equal(mySuperClass.getY(), 2, "BaseClass.constructor");
    return equal(mySuperClass.getA(), 1, "BaseClass.constructor");
    /* test inheritance
    */

  });
  /* test de chaque méthode de chaque classe
  */

  /*
          coordinates.links.threedee.Link3d
  */

  module("coordinates.links.threedee.Link3d", {
    setup: function() {
      return this.link3d = new coordinates.Link3d({});
    }
  });
  test("constructor", function() {
    this.link3d.setX(30);
    ok(this.link3d.getX() === 30);
    this.link3d.setY(20);
    ok(this.link3d.getY() === 20);
    this.link3d.setZ(50);
    return ok(this.link3d.getZ() === 50);
  });
  /* 
      coordinates.links.DOMLink3d
  */

  module("coordinates.links.DOMLink3d", {
    setup: function() {
      this.el = document.createElement("DIV");
      this.el.style.width = "500px";
      this.el.style.height = "300px";
      this.link = new coordinates.DOMLink3d(this.el);
    }
  });
  test("constructor", function() {
    equal(this.link.getElement(), this.el);
    equal(this.link.getWidth(), 500);
    equal(this.link.getHeight(), 300);
    equal(this.link.getX(), 0);
    equal(this.link.getY(), 0);
  });
  test("update , will fail on non webkitbrowsers or on browsers that do not support CSS transform 3D", function() {
    this.link.setRotationZ(60);
    equal(this.link.getElement().style.webkitTransform, "translateX(0px) translateY(0px) translateZ(0px) rotate(0deg) rotateX(0deg) rotateY(0deg) rotateZ(60deg)", "element transform is correct string");
    this.link.setZ(500);
    equal(this.link.getElement().style.webkitTransform, "translateX(0px) translateY(0px) translateZ(-500px) rotate(0deg) rotateX(0deg) rotateY(0deg) rotateZ(60deg)", "element transform is correct string");
  });
  /*
          coordinates.links.DOMLink2d
  */

  module("coordinates.links.DOMLink2d");
  test("coordinates.links.DOMLink2d", function() {
    var domLink2d, el;
    el = document.createElement("DIV");
    el.style.width = "200px";
    el.style.height = "300px";
    el.style.position = "fixed";
    ok(true);
    domLink2d = new coordinates.DOMLink2d(el);
    ok(domLink2d !== null && domLink2d instanceof coordinates.links.DOMLink2d, "DOMLink2d.constructor");
    domLink2d.setX(200);
    domLink2d.setY(250);
    domLink2d.setRotation(45);
    equal(domLink2d.getElement().style.transform, "translate(200px,250px) rotate(45deg)", "DOMLink2d.applyTransform");
    equal(domLink2d.getWidth(), 200);
    equal(domLink2d.getHeight(), 300);
  });
  /*
          coordinates.events.helpers.Event
  */

  module("coordinates.events.helpers.Event");
  test("coordinates.events.helpers.Event", function() {
    var clonedEvent, e;
    e = new coordinates.events.helpers.Event("xevent");
    ok(e !== null, "Event.constructor");
    ok(e.getEventPhase() === 1, "EventPhase.getEventPhase");
    e.setEventPhase(coordinates.events.helpers.EventPhase.BUBBLING_PHASE);
    ok(e.getEventPhase() === 2, "EventPhase.setEventPhase");
    clonedEvent = e.clone();
    return ok(clonedEvent.type === e.type && clonedEvent.bubbles === e.bubbles, "Event.clone");
  });
  /*
          coordinates.events.helpers.EventDispatcher
  */

  module("coordinates.events.helpers.EventDispatcher");
  test("coordinates.events.helpers.EventDispatcher", function() {
    var o;
    expect(3);
    o = new coordinates.events.helpers.EventDispatcher();
    ok(o !== null && o instanceof coordinates.events.helpers.EventDispatcher, "EventDispatcher.constructor");
    ok(o._target === o, "EventDispatcher._target == EventDispatcher");
    o.addEventListener("XEvent", function(e) {
      return ok(e.target === o._target, "EventDispatcher.dispatchEvent fired");
    });
    return o.dispatchEvent(new coordinates.events.helpers.Event("XEvent"));
  });
  module("coordinates.nodes");
  test("coordinates.nodes.Node", function() {
    var link, newLink, node;
    link = {
      x: 1,
      y: 1
    };
    node = new coordinates.nodes.Node(link);
    ok(node.getLink() === link, "Node.getLink");
    newLink = {
      x: 2,
      y: 5
    };
    node.setLink(newLink);
    ok(node.getLink() === newLink, "Node.setLink");
    throws(function() {
      return node.toObject();
    }, "Node.toObject throws an exception");
  });
  module("coordinates.nodes.twodee");
  test("coordinates.nodes.twodee.Node2d", function() {
    var clonedNode, link, node2d, o;
    link = {
      x: 1,
      y: 2
    };
    node2d = new coordinates.nodes.twodee.Node2d(link, 2, 5);
    ok(node2d !== null && node2d instanceof coordinates.nodes.twodee.Node2d, "Node2d.constructor");
    o = node2d.toObject();
    ok(o.x === 2 && o.y === 5, "Node.toObject");
    node2d.setRotation(35);
    clonedNode = node2d.clone();
    ok(clonedNode.getX() === node2d.getX() && clonedNode.getRotation() === node2d.getRotation(), "Node.clone");
    node2d.setJitterX(3);
    node2d.setJitterY(5);
    ok(node2d.getJitterX !== 3 && node2d.getJitterY() !== 5, "Node2d.setJitterX , Node2d.setJitterY");
  });
  module("coordinates.OrderedNode3d", {
    setup: function() {
      return this.node = new coordinates.OrderedNode3d({});
    }
  });
  test("constructor", function() {
    ok(this.node !== null);
    return ok(this.node.toString() === "[object OrderedNode3d]");
  });
  /*
          Coordinates.layouts
  */

  module("coordinates.layouts.Layout", {
    setup: function() {
      this.link1 = new Coordinates.Link({
        x: 1,
        y: 2
      });
      this.link2 = new Coordinates.Link({
        x: 3,
        y: 5
      });
      this.node1 = new Coordinates.Node(this.link1);
      this.node2 = new Coordinates.Node(this.link2);
      return this.layout = new Coordinates.Layout();
    },
    teardown: function() {}
  });
  test("constructor", function() {
    equal(this.layout.size, 0);
    return equal(this.layout.nodes.length, 0);
  });
  test("storeNode", function() {
    this.layout.storeNode(this.node1);
    equal(this.layout.size, 1, "Layout.storeNode");
    equal(this.layout.nodes.length, 1, "Layout.storeNode");
    equal(this.layout.linkExists(this.link1), true, "Layout.linkExists");
    equal(this.layout.linkExists(this.link2), false, "Layout.linkExists");
    this.layout.storeNodeAt(this.node2, 0);
    equal(this.layout.nodes[0].getLink(), this.link2, "Layout.storeNodeAt");
    equal(this.layout.getNodeByLink(this.link1), this.node1, "Layout.getNodeByLink");
    equal(this.layout.getNodeIndex(this.node2), 0, "Layout.getNodeIndex");
    equal(this.layout.getNodeAt(0), this.node2, "Layout.getNodeAt");
    this.layout.removeNodeByLink(this.link1);
    equal(this.layout.linkExists(this.link1), false, "layout.removeNodeByLink");
    equal(this.layout.size, 1, "layout.removeNodeByLink");
    equal(this.layout.nodes.length, 1, "layout.removeNodeByLink");
    this.layout.removeAllNodes();
    equal(this.layout.size, 0, "Layout.removeAllNodes");
    return equal(this.layout.nodes.length, 0, "Layout.removeAllNodes");
  });
  test("swapNodeLinks", function() {
    this.layout.storeNode(this.node1);
    this.layout.storeNode(this.node2);
    this.layout.swapNodeLinks(this.node1, this.node2);
    equal(this.node1.getLink(), this.link2);
    return equal(this.node2.getLink(), this.link1);
  });
  test("addLinkAt", function() {
    this.layout.storeNode(this.node1);
    this.layout.addLinkAt(this.link2, 0);
    return equal(this.layout.nodes[0].getLink(), this.link2, "Layout.addLinkAt");
  });
  /*
          coordinates.Layout3d
  */

  module("coordinates.Layout3d", {
    setup: function() {
      return this.layout3d = new coordinates.Layout3d();
    }
  });
  test("coordinates.Layout3d.constructor", function() {
    return ok(this.layout3d !== null, "layout3d is not null");
  });
  test("coordinates.Layout3d.get...", function() {
    this.layout3d.setX(30);
    ok(this.layout3d.getX() === 30, "getX");
    this.layout3d.setY(100);
    return ok(this.layout3d.getY() === 100, "getY");
  });
  /*
          "coordinates.VerticalLine"
  */

  module("coordinates.VerticalLine", {
    setup: function() {
      this.l1 = new coordinates.Link({}, 0, 0, 0, 100, 100);
      this.l2 = new coordinates.Link({}, 0, 0, 0, 100, 100);
      this.l3 = new coordinates.Link({}, 0, 0, 0, 100, 100);
      this.l4 = new coordinates.Link({}, 0, 0, 0, 100, 100);
      return this.vl = new coordinates.VerticalLine(20, 0, 0, 0, 0);
    }
  });
  test("constructor", function() {
    return ok(this.vl !== null);
  });
  test("addNode", function() {
    this.vl.addNode(this.l1);
    this.vl.addNode(this.l2);
    this.vl.addNode(this.l3);
    equal(this.vl.size, 3, "VerticalLine.size");
    this.vl.addNode(this.l4);
    equal(this.vl.size, 4, "VerticalLine.size");
    equal(this.vl.nodes.length, 4, "VerticalLine.size");
    equal(this.l1.getY(), 0);
    equal(this.l2.getY(), 120);
    equal(this.l3.getY(), 240);
    return equal(this.l4.getY(), 360);
  });
  test("addNodes", function() {
    expect(8);
    this.vl.addEventListener(coordinates.NodeEvent.prototype.ADD, function() {
      return ok(true, "ADD event dispatched");
    });
    this.vl.addNodes([this.l1, this.l2, this.l3, this.l4]);
    equal(this.l1.getY(), 0, "Node updated and rendered");
    equal(this.l2.getY(), 120, "Node updated and rendered");
    equal(this.l3.getY(), 240, "Node updated and rendered");
    return equal(this.l4.getY(), 360, "Node updated and rendered");
  });
  module("coordinates.HorizontalLine", {
    setup: function() {},
    teadown: function() {}
  });
  module("coordinates.Ellipse", {
    setup: function() {
      return this.ellipse = new coordinates.Ellipse(100, 100);
    }
  });
  test("constructor", function() {
    expect(2);
    equal(this.ellipse.getWidth(), 100, "Ellipse.getWidth");
    return equal(this.ellipse.getHeight(), 100, "Ellipse.getHeight");
  });
  module("coordinates.Wave", {
    setup: function() {
      this.wave = new coordinates.Wave(500, 300);
      this.wave.addNode(new coordinates.Link({}));
      this.wave.addNode(new coordinates.Link({}));
      return this.wave.addNode(new coordinates.Link({}));
    }
  });
  test("constructor", function() {
    expect(4);
    equal(this.wave.getWidth(), 500, "Wave.getWidth");
    equal(this.wave.getHeight(), 300, "Wave.getHeight");
    this.wave.setX(50);
    equal(this.wave.getX(), 50, "Wave.setX");
    this.wave.setY(100);
    return equal(this.wave.getY(), 100, "Wave.setY");
  });
  module("coordinates.Stack", {
    setup: function() {
      this.stack = new coordinates.Stack();
      this.stack.addNode(new coordinates.Link({}));
      this.stack.addNode(new coordinates.Link({}));
      this.stack.addNode(new coordinates.Link({}));
      return this.stack.addNode(new coordinates.Link({}));
    }
  });
  test("constructor", function() {
    equal(this.stack.size, 4, "Stack.size");
    equal(this.stack.nodes.length, 4, "Stack.size");
    equal(this.stack.nodes[0].getOrder(), 0, "Node orders");
    equal(this.stack.nodes[1].getOrder(), 1, "Node orders");
    equal(this.stack.nodes[2].getOrder(), 2, "Node orders");
    return equal(this.stack.nodes[3].getOrder(), 3, "Node orders");
  });
  module("coordinates.Spiral", {
    setup: function() {
      this.spiral = new coordinates.Spiral(300);
      this.spiral.addNode(new coordinates.Link({}));
      this.spiral.addNode(new coordinates.Link({}));
      this.spiral.addNode(new coordinates.Link({}));
      return this.spiral.addNode(new coordinates.Link({}));
    }
  });
  test("constructor", function() {
    equal(this.spiral.size, 4, "Spiral.size");
    equal(this.spiral.nodes.length, 4, "Spiral.size");
    equal(this.spiral.toString(), "[object Spiral]", "Spiral.toString");
    equal(this.spiral.nodes[0].getX(), 300);
    return equal(this.spiral.nodes[0].getY(), 0);
  });
  module("coordinates.Grid", {
    setup: function() {
      var i, _i, _results;
      this.grid = new coordinates.Grid(500, 500, 5, 5);
      _results = [];
      for (i = _i = 0; _i <= 25; i = ++_i) {
        _results.push(this.grid.addNode(new coordinates.Link({})));
      }
      return _results;
    }
  });
  test("constructor", function() {
    return ok(true);
  });
  module("coordinates.Scatter", {
    setup: function() {
      this.scatter = new coordinates.Scatter(500, 500);
      this.scatter.addNode(new coordinates.Link({}));
      this.scatter.addNode(new coordinates.Link({}));
      this.scatter.addNode(new coordinates.Link({}));
      return this.scatter.addNode(new coordinates.Link({}));
    }
  });
  test("constructor", function() {
    equal(this.scatter.toString(), "[object Scatter]", 'Scatter.constructor');
    equal(this.scatter.getWidth(), 500);
    equal(this.scatter.getHeight(), 500);
    return equal(this.scatter.getX(), 0);
  });
  module("coordinates.Flow", {
    setup: function() {
      this.flow = new Coordinates.Flow(500, 500);
      this.flow.addNode(new coordinates.Link({
        "width": 100,
        "height": 100
      }));
      this.flow.addNode(new coordinates.Link({
        "width": 100,
        height: 100
      }));
      this.flow.addNode(new coordinates.Link({
        "width": 100,
        height: 100
      }));
      return this.flow.addNode(new coordinates.Link({
        "width": 500,
        height: 100
      }));
    }
  });
  test("constructor", function() {
    ok(this.flow !== void 0);
    equal(this.flow.getWidth(), 500);
    equal(this.flow.getHeight(), 500);
    equal(this.flow.size, 4);
    equal(this.flow.nodes[0].getWidth(), 100);
    equal(this.flow.nodes[0].getHeight(), 100);
    equal(this.flow.nodes[0].getLink().getWidth(), 100);
    equal(this.flow.nodes[0].getLink().getHeight(), 100);
    equal(this.flow.nodes[1].getX(), 100, "node 1 x");
    equal(this.flow.nodes[2].getX(), 200, "@nodes[2]._x is 300");
    return equal(this.flow.nodes[3].getX(), 0, "@nodes[3]._x is 0");
  });
  module("coordinates.Lattice", {
    setup: function() {
      var i, _i, _results;
      this.lattice = new Coordinates.Lattice(500, 500, 0, 0, 3, 3);
      _results = [];
      for (i = _i = 0; _i < 9; i = ++_i) {
        _results.push(this.lattice.addNode(new coordinates.Link({
          width: 30,
          height: 30
        })));
      }
      return _results;
    }
  });
  test("constructor", function() {
    equal(this.lattice.getWidth(), 500);
    equal(this.lattice.getHeight(), 500);
    return equal(this.lattice.size, 9);
  });
  /*
          Coordinates.Stack3d
  */

  module("coordinates.Stack3d", {
    setup: function() {
      this.stack3d = new coordinates.Stack3d();
      this.link1 = new coordinates.Link3d({});
      this.link2 = new coordinates.Link3d({});
      this.link3 = new coordinates.Link3d({});
      return this.link4 = new coordinates.Link3d({});
    }
  });
  test("constructor", function() {
    return ok(this.stack3d !== null);
  });
  test("addNode", function() {
    this.stack3d.addNode(this.link1);
    equal(1, this.stack3d.size);
    return equal(1, this.stack3d.nodes.length);
  });
  test("addNodes", function() {
    this.stack3d.addNodes([this.link1, this.link2, this.link3, this.link4]);
    equal(4, this.stack3d.size);
    return equal(4, this.stack3d.nodes.length);
  });
  /*
          Coordinates.Scatter3d
  */

  module("coordinates.Scatter3d", {
    setup: function() {
      return this.scatter3d = new coordinates.Scatter3d(300, 200, 100);
    }
  });
  test("constructor", function() {
    ok(this.scatter3d !== null, "scatter3d not null");
    equal(this.scatter3d.getWidth(), 300, "width");
    equal(this.scatter3d.getHeight(), 200, "height");
    return equal(this.scatter3d.getDepth(), 100, "depth");
  });
  return test("adding links", function() {
    var i, links;
    links = (function() {
      var _i, _results;
      _results = [];
      for (i = _i = 0; _i < 10; i = ++_i) {
        _results.push(new Coordinates.Link3d({}));
      }
      return _results;
    })();
    Coordinates.addLinksTolayout(links, this.scatter3d);
    equal(this.scatter3d.size, 10, "size");
    return equal(this.scatter3d.nodes.length, 10, "nodes.length");
  });
});
