var coordinate;
(function (coordinate) {
    (function (events) {
        var Event = (function () {
            function Event(inType, inBubbles, inCancelable) {
                if (typeof inBubbles === "undefined") { inBubbles = false; }
                if (typeof inCancelable === "undefined") { inCancelable = false; }
                this.type = inType;
                this.bubbles = inBubbles;
                this.cancelable = inCancelable;
                this.__isCancelled = false;
                this.__isCancelledNow = false;
                this.target = null;
                this.currentTarget = null;
                this.eventPhase = events.EventPhase.AT_TARGET;
            }
            Event.prototype.clone = function () {
                return new Event(this.type, this.bubbles, this.cancelable);
            };

            Event.prototype.stopImmediatePropagation = function () {
                this.__isCancelled = true;
                this.__isCancelledNow = true;
            };

            Event.prototype.stopPropagation = function () {
                this.__isCancelled = true;
            };

            Event.prototype.toString = function () {
                return "[Event type=" + this.type + " bubbles=" + this.bubbles + " cancelable=" + this.cancelable + "]";
            };

            Event.prototype.__createSimilar = function (type, related, targ) {
                if (typeof related === "undefined") { related = null; }
                if (typeof targ === "undefined") { targ = null; }
                var result = new Event(this.type, this.bubbles, this.cancelable);

                if (targ != null) {
                    result.target = targ;
                }

                return result;
            };

            Event.prototype.__getIsCancelled = function () {
                return this.__isCancelled;
            };

            Event.prototype.__getIsCancelledNow = function () {
                return this.__isCancelledNow;
            };

            Event.prototype.__setPhase = function (phase) {
                this.eventPhase = phase;
            };
            return Event;
        })();
        events.Event = Event;
    })(coordinate.events || (coordinate.events = {}));
    var events = coordinate.events;
})(coordinate || (coordinate = {}));
var coordinate;
(function (coordinate) {
    (function (events) {
        var EventDispatcher = (function () {
            function EventDispatcher() {
            }
            return EventDispatcher;
        })();
        events.EventDispatcher = EventDispatcher;
    })(coordinate.events || (coordinate.events = {}));
    var events = coordinate.events;
})(coordinate || (coordinate = {}));
var coordinate;
(function (coordinate) {
    (function (events) {
        (function (EventPhase) {
            EventPhase[EventPhase["AT_TARGET"] = 0] = "AT_TARGET";
        })(events.EventPhase || (events.EventPhase = {}));
        var EventPhase = events.EventPhase;
    })(coordinate.events || (coordinate.events = {}));
    var events = coordinate.events;
})(coordinate || (coordinate = {}));
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

        (function (FlowDirection) {
            /**
            * Nodes flow horizontally within the bounds of the layout
            */
            FlowDirection[FlowDirection["HORIZONTAL"] = 0] = "HORIZONTAL";

            /**
            * Nodes flow vertically within the bounds of the layout
            */
            FlowDirection[FlowDirection["VERTICAL"] = 1] = "VERTICAL";
        })(constantes.FlowDirection || (constantes.FlowDirection = {}));
        var FlowDirection = constantes.FlowDirection;

        (function (FlowOverflowPolicy) {
            /**
            * Allow all nodes within flow that are out of the layout's bounds to continue flowing.
            * For example, a flow layout in which the <em>flowDirection</em> was <em>HORIZONTAL</em> would continue
            * places nodes horizontally even if the bounds of the layout have been reached
            */
            FlowOverflowPolicy[FlowOverflowPolicy["ALLOW_OVERFLOW"] = 0] = "ALLOW_OVERFLOW";

            /**
            * Will simply not place nodes that do not fit within the layout's bounds.
            */
            FlowOverflowPolicy[FlowOverflowPolicy["IGNORE_OVERFLOW"] = 1] = "IGNORE_OVERFLOW";

            /**
            * Will remove node's DisplayObject link from the target's display stack if it does not
            * fit within that layout's bounds.
            */
            FlowOverflowPolicy[FlowOverflowPolicy["HIDE_OVERFLOW"] = 2] = "HIDE_OVERFLOW";
        })(constantes.FlowOverflowPolicy || (constantes.FlowOverflowPolicy = {}));
        var FlowOverflowPolicy = constantes.FlowOverflowPolicy;

        (function (GridLayoutDirection) {
            /**
            * Places nodes within the grid layout from left to right
            */
            GridLayoutDirection[GridLayoutDirection["LEFT_TO_RIGHT"] = 0] = "LEFT_TO_RIGHT";

            /**
            * Places nodes within the grid layout from right to left
            */
            GridLayoutDirection[GridLayoutDirection["RIGHT_TO_LEFT"] = 1] = "RIGHT_TO_LEFT";

            /**
            * Places nodes within the grid layout from top to bottom
            */
            GridLayoutDirection[GridLayoutDirection["TOP_TO_BOTTOM"] = 2] = "TOP_TO_BOTTOM";

            /**
            * Places nodes within the grid layout from bottom to top
            */
            GridLayoutDirection[GridLayoutDirection["BOTTOM_TO_TOP"] = 3] = "BOTTOM_TO_TOP";
        })(constantes.GridLayoutDirection || (constantes.GridLayoutDirection = {}));
        var GridLayoutDirection = constantes.GridLayoutDirection;

        (function (LayoutType) {
            /**
            * @see coordinate.layouts.threedee.Ellipse3d
            */
            LayoutType[LayoutType["ELLIPSE_3D"] = 0] = "ELLIPSE_3D";

            /**
            * @see coordinate.layouts.threedee.Grid3d
            */
            LayoutType[LayoutType["GRID_3D"] = 1] = "GRID_3D";

            /**
            * @see coordinate.layouts.threedee.Scatter3d
            */
            LayoutType[LayoutType["SCATTER_3D"] = 2] = "SCATTER_3D";

            /**
            * @see coordinate.layouts.threedee.Snapshot3d
            */
            LayoutType[LayoutType["SNAPSHOT_3D"] = 3] = "SNAPSHOT_3D";

            /**
            * @see coordinate.layouts.threedee.Sphere3d
            */
            LayoutType[LayoutType["SPHEROID_3D"] = 4] = "SPHEROID_3D";

            /**
            * @see coordinate.layouts.threedee.Stack3d
            */
            LayoutType[LayoutType["STACK_3D"] = 5] = "STACK_3D";

            /**
            * @see coordinate.layouts.threedee.Wave3d
            */
            LayoutType[LayoutType["WAVE_3D"] = 6] = "WAVE_3D";

            /**
            * @see coordinate.layouts.threedee.WaveEllipse3d
            */
            LayoutType[LayoutType["WAVE_ELLIPSE_3D"] = 7] = "WAVE_ELLIPSE_3D";

            /**
            * @see coordinate.layouts.twodee.Ellipse
            */
            LayoutType[LayoutType["ELLIPSE"] = 8] = "ELLIPSE";

            /**
            * @see coordinate.layouts.twodee.Flow
            */
            LayoutType[LayoutType["FLOW"] = 9] = "FLOW";

            /**
            * @see coordinate.layouts.twodee.Grid
            */
            LayoutType[LayoutType["GRID"] = 10] = "GRID";

            /**
            * @see coordinate.layouts.twodee.HorizontalLine
            */
            LayoutType[LayoutType["HORIZONTAL_LINE"] = 11] = "HORIZONTAL_LINE";

            /**
            * @see coordinate.layouts.twodee.Lattice
            */
            LayoutType[LayoutType["LATTICE"] = 12] = "LATTICE";

            /**
            * @see coordinate.layouts.twodee.Scatter
            */
            LayoutType[LayoutType["SCATTER"] = 13] = "SCATTER";

            /**
            * @see coordinate.layouts.twodee.Snapshot
            */
            LayoutType[LayoutType["SNAPSHOT"] = 14] = "SNAPSHOT";

            /**
            * @see coordinate.layouts.twodee.Stack
            */
            LayoutType[LayoutType["STACK"] = 15] = "STACK";

            /**
            * @see coordinate.layouts.twodee.VerticalLine
            */
            LayoutType[LayoutType["VERTICAL_LINE"] = 16] = "VERTICAL_LINE";

            /**
            * @see coordinate.layouts.twodee.Wave
            */
            LayoutType[LayoutType["WAVE"] = 17] = "WAVE";
        })(constantes.LayoutType || (constantes.LayoutType = {}));
        var LayoutType = constantes.LayoutType;
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
var coordinate;
(function (coordinate) {
    (function (layouts) {
        //import com.serialization.json.JSON;
        //import com.somerandomdude.coordy.nodes.INode;
        //import flash.display.DisplayObject;
        var Layout = (function (_super) {
            __extends(Layout, _super);
            function Layout() {
                _super.apply(this, arguments);
            }
            Object.defineProperty(Layout.prototype, "size", {
                get: /**
                * Returns the number of nodes currently stored and managed
                *
                * @return  Total number of nodes
                */
                function () {
                    return this._size;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Layout.prototype, "nodes", {
                get: /**
                * Returns an array of node objects
                *
                * @return  Array containing all node objects
                */
                function () {
                    return this._nodes;
                },
                enumerable: true,
                configurable: true
            });

            /**
            * The most base-level class for all layouts. Cannot be instantiated as is.
            *
            */
            Layout.prototype.Layout = function () {
                this._size = 0;
            };

            Layout.prototype.toString = function () {
                return "";
            };

            /**
            * Serializes the layout data of each node as a JSON string. Includes the 'type', 'size' and 'nodes' properties.
            *
            * @return JSON representation of the layout's composition
            */
            Layout.prototype.toJSON = function () {
                var nodes = new Array();
                var layout = new Object();

                for (var i = 0; i < this._size; i++) {
                    nodes.push(this._nodes[i].toObject());
                }

                layout.type = toString();
                layout.size = this._size;
                layout.nodes = nodes;

                return JSON.stringify(layout);
            };

            Layout.prototype.addToLayout = function (object, moveToCoordinates) {
                if (typeof moveToCoordinates === "undefined") { moveToCoordinates = true; }
                throw (new Error('Method must be overriden by child class'));
                return null;
            };

            Layout.prototype.addNode = function (object, moveToCoordinates) {
                if (typeof object === "undefined") { object = null; }
                if (typeof moveToCoordinates === "undefined") { moveToCoordinates = true; }
                throw (new Error('Method must be overriden by child class'));
                return null;
            };

            /**
            * Adds a specified number of empty nodes to the layout
            *
            * @param count The number of nodes to add to the layout
            */
            Layout.prototype.addNodes = function (count) {
                for (var i = 0; i < count; i++)
                    this.addNode();
            };

            /**
            * Generates XML for the layout's properties.
            *
            * @return XML representation of the layout's composition
            */
            /*toXML(): XML {
            var xml: XML = <layout>< / layout>;
            xml.@type = toString();
            xml.@size = _size;
            for (var i: number = 0; i < _size; i++) {
            var node: XML = <node />
            var obj: Object = _nodes[i].toObject();
            for (var j: string in obj) {
            node[string('@' + j)] = obj[j];
            }
            
            xml.appendChild(node);
            }
            
            return xml;
            }*/
            /**
            * Returns node object by specified display object
            *
            * @param  link  an absolute URL giving the base location of the image
            * @return      the node object which the display object is linked to
            * @see         INode
            */
            Layout.prototype.getNodeByLink = function (link) {
                for (var i; i < this._nodes.length; i++) {
                    if (this._nodes[i].link == link)
                        return this._nodes[i];
                }
                return null;
            };

            /**
            * Returns specified node object's index in the collection
            *
            * @param  node  Node object from layout organizer
            * @return      Index of node object in the collection of nodes
            * @see         INode
            */
            Layout.prototype.getNodeIndex = function (node) {
                for (var i = 0; i < this._nodes.length; i++) {
                    if (this._nodes[i] == node)
                        return i;
                }
                return null;
            };

            /**
            * Returns node object at specified index of collection
            *
            * @param  index  Index of item in the collection of nodes
            * @return      Node object at the specified location in the collection
            * @see         Node
            */
            Layout.prototype.getNodeAt = function (index) {
                return this._nodes[index];
            };

            /**
            * Returns true if a link (DisplayObject owned by a layout's node) exists in the layout
            *
            * @param  link  DisplayObject in question
            * @return      True if link exists in layout, false if not.
            * @see         Node
            */
            Layout.prototype.linkExists = function (link) {
                for (var i = 0; i < this.size; i++)
                    if (link == this._nodes[i].link)
                        return true;
                return false;
            };

            /**
            * Swaps links of two node objects
            *
            * @param  nodeTo
            * @param  nodeFrom
            */
            Layout.prototype.swapNodeLinks = function (nodeTo, nodeFrom) {
                var tmpLink = nodeTo.link;
                nodeTo.link = nodeFrom.link;
                nodeFrom.link = tmpLink;
            };

            /**
            * Removes all links between nodes and display objects
            *
            */
            Layout.prototype.removeLinks = function () {
                for (var i = 0; i < this._nodes.length; i++)
                    this._nodes[i].link = null;
            };

            /**
            * Removed the link between the node and display object at the specified index
            *
            * @param  index  index in collection of item to be removed
            */
            Layout.prototype.removeLinkAt = function (index) {
                this._nodes[index].link = null;
            };

            /**
            * Removes specified node object from layout organizer
            *
            * @param  node specified Node object to remove
            */
            Layout.prototype.removeNode = function (node) {
                this._nodes.splice(this.getNodeIndex(node), 1);
                this._size--;
            };

            /**
            * Removes all nodes from the layout
            */
            Layout.prototype.removeAllNodes = function () {
                this.clearNodes();
                this._size = 0;
            };

            /**
            * Removes the node that is linked to the specified object
            *
            * @param link
            */
            Layout.prototype.removeNodeByLink = function (link) {
                for (var i = 0; i < this._size; i++) {
                    if (this._nodes[i].link == link)
                        this.removeNode(this._nodes[i]);
                }
            };

            /**
            * Adds a link between the specified display object to the node object at the specified index
            *
            * @param  object   item to add to collection
            * @param  index        position where to add the item
            */
            Layout.prototype.addLinkAt = function (object, index) {
                this._nodes[index].link = object;
            };

            /**
            * @protected
            */
            Layout.prototype.storeNode = function (node) {
                if (!this._nodes)
                    this._nodes = new Array();
                this._nodes.push(node);
                this._size++;

                return this.size;
            };

            /**
            * @protected
            */
            Layout.prototype.storeNodeAt = function (node, index) {
                if (!this._nodes)
                    this._nodes = new Array();
                if (index >= 0 && index < this._size)
                    this._nodes.splice(index, 0, node);
else
                    this._nodes.push(node);
                this._size++;

                return this.size;
            };

            /**
            * @protected
            */
            Layout.prototype.getNextAvailableNode = function () {
                for (var i = 0; i < this._nodes.length; i++) {
                    if (!this._nodes[i].link) {
                        return this._nodes[i];
                    }
                }
                return null;
            };

            /**
            * @protected
            */
            Layout.prototype.clearNodes = function () {
                if (this._nodes) {
                    for (var i in this._nodes) {
                        delete this._nodes[i];
                        this._nodes[i] = null;
                    }
                }
                this._nodes = new Array();
            };
            return Layout;
        })(coordinate.events.EventDispatcher);
        layouts.Layout = Layout;
    })(coordinate.layouts || (coordinate.layouts = {}));
    var layouts = coordinate.layouts;
})(coordinate || (coordinate = {}));
if (typeof (global) !== "undefined") {
    global.coordinate = coordinate;
}
//# sourceMappingURL=Coordinate.next.js.map
