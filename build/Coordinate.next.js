var coordinate;
(function (coordinate) {
    /**
    * @license see license.txt
    * @author mparaiso <mparaiso@online.fr>
    * @url mparaiso.online.fr
    */
    (function (constantes) {
        (function (FlowAlignment) {
            /**
            * Flow nodes align to the top-left bounds
            */
            FlowAlignment[FlowAlignment["TOP_LEFT"] = 0] = "TOP_LEFT";

            /**
            * Flow nodes align to the top-center bounds
            */
            FlowAlignment[FlowAlignment["TOP_CENTER"] = 1] = "TOP_CENTER";

            /**
            * Flow nodes align to the top-right bounds
            */
            FlowAlignment[FlowAlignment["TOP_RIGHT"] = 2] = "TOP_RIGHT";

            /**
            * Flow nodes align to the middle-left bounds
            */
            FlowAlignment[FlowAlignment["MIDDLE_LEFT"] = 3] = "MIDDLE_LEFT";

            /**
            * Flow nodes align to the middle-center bounds
            */
            FlowAlignment[FlowAlignment["MIDDLE_CENTER"] = 4] = "MIDDLE_CENTER";

            /**
            * Flow nodes align to the middle-right bounds
            */
            FlowAlignment[FlowAlignment["MIDDLE_RIGHT"] = 5] = "MIDDLE_RIGHT";

            /**
            * Flow nodes align to the bottom-left bounds
            */
            FlowAlignment[FlowAlignment["BOTTOM_LEFT"] = 6] = "BOTTOM_LEFT";

            /**
            * Flow nodes align to the bottom-center bounds
            */
            FlowAlignment[FlowAlignment["BOTTOM_CENTER"] = 7] = "BOTTOM_CENTER";

            /**
            * Flow nodes align to the bottom-right bounds
            */
            FlowAlignment[FlowAlignment["BOTTOM_RIGHT"] = 8] = "BOTTOM_RIGHT";
        })(constantes.FlowAlignment || (constantes.FlowAlignment = {}));
        var FlowAlignment = constantes.FlowAlignment;
    })(coordinate.constantes || (coordinate.constantes = {}));
    var constantes = coordinate.constantes;
})(coordinate || (coordinate = {}));
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
var coordinate;
(function (coordinate) {
    (function (nodes) {
        /**
        * @license see license.txt
        * @author mparaiso <mparaiso@online.fr>
        * @url mparaiso@online.fr
        */
        (function (twodee) {
            var FlowNode = (function (_super) {
                __extends(FlowNode, _super);
                /**
                * Node used for Flow layout
                *
                * @see com.somerandomdude.coordy.layouts.twodee.Flow
                *
                * @param link      The node's target DisplayObject
                * @param x         Node's x position
                * @param y         Node's y position
                *
                */
                function FlowNode(link, x, y) {
                    if (typeof link === "undefined") { link = null; }
                    if (typeof x === "undefined") { x = 0; }
                    if (typeof y === "undefined") { y = 0; }
                    _super.call(this, link, x, y);
                }
                Object.defineProperty(FlowNode.prototype, "outsideBounds", {
                    get: /**
                    * Property as to whether node's position exists outside of the layouts current bounds
                    * @return Boolean of node's placement in/out of bounds. True if out of bounds
                    *
                    */
                    function () {
                        return this._outsideBounds;
                    },
                    set: function (value) {
                        this._outsideBounds = value;
                    },
                    enumerable: true,
                    configurable: true
                });

                /**
                * Creates an exact copy of node with link and position properties carried over
                *
                * @return Cloned node
                *
                */
                FlowNode.prototype.clone = function () {
                    var n = new FlowNode(this._link, this._x, this._y);
                    n.outsideBounds = this._outsideBounds;
                    return n;
                };
                return FlowNode;
            })(twodee.Node2d);
            twodee.FlowNode = FlowNode;
        })(nodes.twodee || (nodes.twodee = {}));
        var twodee = nodes.twodee;
    })(coordinate.nodes || (coordinate.nodes = {}));
    var nodes = coordinate.nodes;
})(coordinate || (coordinate = {}));
var coordinate;
(function (coordinate) {
    (function (nodes) {
        /**
        * @license see license.txt
        * @author mparaiso <mparaiso@online.fr>
        * @url mparaiso@online.fr
        */
        (function (twodee) {
            var GridNode = (function (_super) {
                __extends(GridNode, _super);
                /**
                * Node used for Grid layout
                *          *
                * @param link          The node's target object
                * @param column        Column in the grid in which the node resides
                * @param row           Row in the grid in which the node resides
                * @param x             Node's x position
                * @param y             Node's y position
                * @param jitterX       Node's x-jitter value
                * @param jitterY       Node's y-jitter value
                *
                */
                function GridNode(link, column, row, x, y, jitterX, jitterY) {
                    if (typeof link === "undefined") { link = null; }
                    if (typeof column === "undefined") { column = -1; }
                    if (typeof row === "undefined") { row = -1; }
                    if (typeof x === "undefined") { x = 0; }
                    if (typeof y === "undefined") { y = 0; }
                    if (typeof jitterX === "undefined") { jitterX = 0; }
                    if (typeof jitterY === "undefined") { jitterY = 0; }
                    _super.call(this, link, x, y, jitterX, jitterY);
                    this._row = row;
                    this._column = column;
                }
                Object.defineProperty(GridNode.prototype, "row", {
                    get: /**
                    * Mutator/accessor of the node's row property. <strong>Note</strong> - There's currently no error-checking if invaluid value is set
                    * @return Row in the grid in which the node resides
                    *
                    */
                    function () {
                        return this._row;
                    },
                    set: function (value) {
                        this._row = value;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(GridNode.prototype, "column", {
                    get: /**
                    * Mutator/accessor of the node's column property. <strong>Note</strong> - There's currently no error-checking if invaluid value is set
                    * @return Column in the grid in which the node resides
                    *
                    */
                    function () {
                        return this._column;
                    },
                    set: function (value) {
                        this._column = value;
                    },
                    enumerable: true,
                    configurable: true
                });

                /**
                * Creates an exact copy of node with link and position properties carried over
                *
                * @return Cloned node
                *
                */
                GridNode.prototype.clone = function () {
                    return new GridNode(this._link, this._column, this._row, this._x, this._y, this._jitterX, this._jitterY);
                };

                /**
                * Packages the node as a generic object - mainly used for exporting layout data.
                *
                * @return Generic object containing all the node's layout properties
                */
                GridNode.prototype.toObject = function () {
                    return {
                        row: this._row,
                        column: this._column,
                        x: this._x,
                        y: this._y,
                        rotation: this._rotation
                    };
                };
                return GridNode;
            })(twodee.Node2d);
            twodee.GridNode = GridNode;
        })(nodes.twodee || (nodes.twodee = {}));
        var twodee = nodes.twodee;
    })(coordinate.nodes || (coordinate.nodes = {}));
    var nodes = coordinate.nodes;
})(coordinate || (coordinate = {}));
if (typeof (global) !== "undefined") {
    global.coordinate = coordinate;
}
//# sourceMappingURL=Coordinate.next.js.map
