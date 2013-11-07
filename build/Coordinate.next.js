var coordinate;
(function (coordinate) {
    /**
    * @license see license.txt
    * @author mparaiso <mparaiso@online.fr>
    * @url mparaiso@online.fr
    */
    (function (nodes) {
        /**
        * Base Node for Layouts
        */
        var Node = (function () {
            /**
            * Core class for all 2d and 3d nodes
            * @param link Object to which the node reflects coordinate data
            *
            */
            function Node(link) {
                if (typeof link === "undefined") { link = null; }
                this._link = link;
            }
            Object.defineProperty(Node.prototype, "link", {
                get: function () {
                    return this._link;
                },
                set: function (value) {
                    this._link = value;
                },
                enumerable: true,
                configurable: true
            });

            /**
            * Packages the node as a generic object - mainly used for exporting layout data.
            * @return Generic object containing all the node's layout properties
            */
            Node.prototype.toObject = function () {
                throw (new Error('Method must be called in Node descendant'));
            };
            return Node;
        })();
        nodes.Node = Node;
    })(coordinate.nodes || (coordinate.nodes = {}));
    var nodes = coordinate.nodes;
})(coordinate || (coordinate = {}));
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var coordinate;
(function (coordinate) {
    (function (nodes) {
        (function (twodee) {
            var Node2d = (function (_super) {
                __extends(Node2d, _super);
                function Node2d(link, x, y, jitterX, jitterY) {
                    if (typeof link === "undefined") { link = null; }
                    if (typeof x === "undefined") { x = 0; }
                    if (typeof y === "undefined") { y = 0; }
                    if (typeof jitterX === "undefined") { jitterX = 0; }
                    if (typeof jitterY === "undefined") { jitterY = 0; }
                    _super.call(this, link);
                    this._x = 0;
                    this._y = 0;
                    this._jitterX = 0;
                    this._jitterY = 0;
                    this._rotation = 0;
                    this._x = x;
                    this._y = y;
                    this._jitterX = jitterX;
                    this._jitterY = jitterY;
                }
                Object.defineProperty(Node2d.prototype, "x", {
                    get: function () {
                        return this._x;
                    },
                    set: function (val) {
                        this._x = val;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Node2d.prototype, "y", {
                    get: function () {
                        return this._y;
                    },
                    set: function (val) {
                        this._y = val;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Node2d.prototype, "jitterX", {
                    get: function () {
                        return this._jitterX;
                    },
                    set: function (value) {
                        this._jitterX = Math.random() * value * ((Math.random() > .5) ? -1 : 1);
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Node2d.prototype, "jitterY", {
                    get: function () {
                        return this.jitterY;
                    },
                    set: function (value) {
                        this._jitterY = Math.random() * value * ((Math.random() > .5) ? -1 : 1);
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Node2d.prototype, "rotation", {
                    get: function () {
                        return this._rotation;
                    },
                    set: function (value) {
                        this._rotation = value;
                    },
                    enumerable: true,
                    configurable: true
                });

                Node2d.prototype.clone = function () {
                    var n = new Node2d(this._link, this._x, this._y, this._jitterX, this._jitterY);
                    n.rotation = this._rotation;
                    return n;
                };

                /**
                * Packages the node as a generic object - mainly used for exporting layout data.
                *
                * @return Generic object containing all the node's layout properties
                */
                Node2d.prototype.toObject = function () {
                    return { x: this._x, y: this._y, rotation: this._rotation };
                };
                return Node2d;
            })(nodes.Node);
            twodee.Node2d = Node2d;
        })(nodes.twodee || (nodes.twodee = {}));
        var twodee = nodes.twodee;
    })(coordinate.nodes || (coordinate.nodes = {}));
    var nodes = coordinate.nodes;
})(coordinate || (coordinate = {}));
var coordinate;
(function (coordinate) {
    (function (nodes) {
        (function (twodee) {
            var OrderedNode = (function (_super) {
                __extends(OrderedNode, _super);
                /**
                * Node used for HorizontalLine, VerticalLine and Stack layouts
                *
                * @see com.somerandomdude.coordy.layouts.twodee.HorizontalLine
                * @see com.somerandomdude.coordy.layouts.twodee.VerticalLine
                * @see com.somerandomdude.coordy.layouts.twodee.Stack
                *
                * @param link          The node's target DisplayObject
                * @param order         Node's order in the layout
                * @param x             Node's x position
                * @param y             Node's y position
                * @param jitterX       Node's x-jitter value
                * @param jitterY       Node's y-jitter value
                *
                */
                function OrderedNode(link, order, x, y, jitterX, jitterY) {
                    if (typeof link === "undefined") { link = null; }
                    if (typeof order === "undefined") { order = 0; }
                    if (typeof x === "undefined") { x = 0; }
                    if (typeof y === "undefined") { y = 0; }
                    if (typeof jitterX === "undefined") { jitterX = 0; }
                    if (typeof jitterY === "undefined") { jitterY = 0; }
                    _super.call(this, link, x, y, jitterX, jitterY);
                    this._order = order;
                }
                Object.defineProperty(OrderedNode.prototype, "order", {
                    get: function () {
                        return this._order;
                    },
                    set: function (value) {
                        this._order = value;
                    },
                    enumerable: true,
                    configurable: true
                });

                /**
                * Creates an exact copy of node with link and position properties carried over
                * @return Cloned node
                *
                */
                OrderedNode.prototype.clone = function () {
                    return new OrderedNode(this._link, this._order, this._x, this._y, this._jitterX, this._jitterY);
                };

                /**
                * Packages the node as a generic object - mainly used for exporting layout data.
                * @return Generic object containing all the node's layout properties
                */
                OrderedNode.prototype.toObject = function () {
                    return { order: this._order, x: this._x, y: this._y, rotation: this._rotation };
                };
                return OrderedNode;
            })(twodee.Node2d);
            twodee.OrderedNode = OrderedNode;
        })(nodes.twodee || (nodes.twodee = {}));
        var twodee = nodes.twodee;
    })(coordinate.nodes || (coordinate.nodes = {}));
    var nodes = coordinate.nodes;
})(coordinate || (coordinate = {}));
if (typeof (global) !== "undefined") {
    global.coordinate = coordinate;
}
//# sourceMappingURL=Coordinate.next.js.map
