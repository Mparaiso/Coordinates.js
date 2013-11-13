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
    (function (constants) {
        var FlowAlignment = (function () {
            function FlowAlignment() {
            }
            FlowAlignment.TOP_LEFT = "tl";

            FlowAlignment.TOP_CENTER = "tc";

            FlowAlignment.TOP_RIGHT = "tr";

            FlowAlignment.MIDDLE_LEFT = "ml";

            FlowAlignment.MIDDLE_CENTER = "mc";

            FlowAlignment.MIDDLE_RIGHT = "mr";

            FlowAlignment.BOTTOM_LEFT = "bl";

            FlowAlignment.BOTTOM_CENTER = "bc";

            FlowAlignment.BOTTOM_RIGHT = "br";
            return FlowAlignment;
        })();
        constants.FlowAlignment = FlowAlignment;
    })(coordinate.constants || (coordinate.constants = {}));
    var constants = coordinate.constants;
})(coordinate || (coordinate = {}));
var coordinate;
(function (coordinate) {
    (function (constants) {
        var FlowDirection = (function () {
            function FlowDirection() {
            }
            FlowDirection.HORIZONTAL = "flowHorizontal";

            FlowDirection.VERTICAL = "flowVertical";
            return FlowDirection;
        })();
        constants.FlowDirection = FlowDirection;
    })(coordinate.constants || (coordinate.constants = {}));
    var constants = coordinate.constants;
})(coordinate || (coordinate = {}));
var coordinate;
(function (coordinate) {
    (function (constants) {
        var FlowOverflowPolicy = (function () {
            function FlowOverflowPolicy() {
            }
            FlowOverflowPolicy.ALLOW_OVERFLOW = "allow";

            FlowOverflowPolicy.IGNORE_OVERFLOW = "ignore";

            FlowOverflowPolicy.HIDE_OVERFLOW = "hide";
            return FlowOverflowPolicy;
        })();
        constants.FlowOverflowPolicy = FlowOverflowPolicy;
    })(coordinate.constants || (coordinate.constants = {}));
    var constants = coordinate.constants;
})(coordinate || (coordinate = {}));
var coordinate;
(function (coordinate) {
    (function (constants) {
        var GridLayoutDirection = (function () {
            function GridLayoutDirection() {
            }
            GridLayoutDirection.LEFT_TO_RIGHT = "leftToRight";

            GridLayoutDirection.RIGHT_TO_LEFT = "rightToLeft";

            GridLayoutDirection.TOP_TO_BOTTOM = "upToDown";

            GridLayoutDirection.BOTTOM_TO_TOP = "downToUp";
            return GridLayoutDirection;
        })();
        constants.GridLayoutDirection = GridLayoutDirection;
    })(coordinate.constants || (coordinate.constants = {}));
    var constants = coordinate.constants;
})(coordinate || (coordinate = {}));
var coordinate;
(function (coordinate) {
    (function (constants) {
        var LatticeAlternationPattern = (function () {
            function LatticeAlternationPattern() {
            }
            LatticeAlternationPattern.ALTERNATE_HORIZONTALLY = "diagonalLatticeAlternalHorizontally";

            LatticeAlternationPattern.ALTERNATE_VERTICALLY = "diagonalLatticeAlternalVertially";
            return LatticeAlternationPattern;
        })();
        constants.LatticeAlternationPattern = LatticeAlternationPattern;
    })(coordinate.constants || (coordinate.constants = {}));
    var constants = coordinate.constants;
})(coordinate || (coordinate = {}));
var coordinate;
(function (coordinate) {
    (function (constants) {
        var LatticeOrder = (function () {
            function LatticeOrder() {
            }
            LatticeOrder.ORDER_HORIZONTALLY = "latticeOrderHorizontally";

            LatticeOrder.ORDER_VERTICALLY = "latticeOrderVertically";
            return LatticeOrder;
        })();
        constants.LatticeOrder = LatticeOrder;
    })(coordinate.constants || (coordinate.constants = {}));
    var constants = coordinate.constants;
})(coordinate || (coordinate = {}));
var coordinate;
(function (coordinate) {
    (function (constants) {
        var LatticeType = (function () {
            function LatticeType() {
            }
            LatticeType.SQUARE = "squareLattice";

            LatticeType.DIAGONAL = "diagonalLattice";
            return LatticeType;
        })();
        constants.LatticeType = LatticeType;
    })(coordinate.constants || (coordinate.constants = {}));
    var constants = coordinate.constants;
})(coordinate || (coordinate = {}));
var coordinate;
(function (coordinate) {
    (function (constants) {
        var LayoutType = (function () {
            function LayoutType() {
            }
            LayoutType.ELLIPSE_3D = 'Ellipse3d';

            LayoutType.GRID_3D = 'Grid3d';

            LayoutType.SCATTER_3D = 'Scatter3d';

            LayoutType.SNAPSHOT_3D = 'Snapshot3d';

            LayoutType.SPHEROID_3D = 'Sphere3d';

            LayoutType.STACK_3D = 'Stack3d';

            LayoutType.WAVE_3D = 'Wave3d';

            LayoutType.WAVE_ELLIPSE_3D = 'WaveEllipse3d';

            LayoutType.ELLIPSE = 'Ellipse';

            LayoutType.FLOW = 'Flow';

            LayoutType.GRID = 'Grid';

            LayoutType.HORIZONTAL_LINE = 'HorizontalLine';

            LayoutType.LATTICE = 'Lattice';

            LayoutType.SCATTER = 'Scatter';

            LayoutType.SNAPSHOT = 'Snapshot';

            LayoutType.STACK = 'Stack';

            LayoutType.VERTICAL_LINE = 'VerticalLine';

            LayoutType.WAVE = 'Wave';
            return LayoutType;
        })();
        constants.LayoutType = LayoutType;
    })(coordinate.constants || (coordinate.constants = {}));
    var constants = coordinate.constants;
})(coordinate || (coordinate = {}));
var coordinate;
(function (coordinate) {
    (function (constants) {
        var LayoutUpdateMethod = (function () {
            function LayoutUpdateMethod() {
            }
            LayoutUpdateMethod.NONE = "none";

            LayoutUpdateMethod.UPDATE_ONLY = "updateOnly";

            LayoutUpdateMethod.UPDATE_AND_RENDER = "updateAndRender";
            return LayoutUpdateMethod;
        })();
        constants.LayoutUpdateMethod = LayoutUpdateMethod;
    })(coordinate.constants || (coordinate.constants = {}));
    var constants = coordinate.constants;
})(coordinate || (coordinate = {}));
var coordinate;
(function (coordinate) {
    (function (constants) {
        var PathAlignType = (function () {
            function PathAlignType() {
            }
            PathAlignType.ALIGN_PARALLEL = "alignParallel";

            PathAlignType.ALIGN_PERPENDICULAR = "alignPerpendicular";

            PathAlignType.NONE = "noAlign";
            return PathAlignType;
        })();
        constants.PathAlignType = PathAlignType;
    })(coordinate.constants || (coordinate.constants = {}));
    var constants = coordinate.constants;
})(coordinate || (coordinate = {}));
var coordinate;
(function (coordinate) {
    (function (constants) {
        var StackOrder = (function () {
            function StackOrder() {
            }
            StackOrder.ASCENDING = "stackAscending";

            StackOrder.DESCENDING = "stackDescending";
            return StackOrder;
        })();
        constants.StackOrder = StackOrder;
    })(coordinate.constants || (coordinate.constants = {}));
    var constants = coordinate.constants;
})(coordinate || (coordinate = {}));
var coordinate;
(function (coordinate) {
    (function (constants) {
        var WaveFunction = (function () {
            function WaveFunction() {
            }
            WaveFunction.SINE = "sineFunction";
            WaveFunction.COSINE = "cosineFunction";
            WaveFunction.TAN = "tanFunction";
            WaveFunction.ARCSINE = "arcsineFunction";
            WaveFunction.ARCCOSINE = "arccosineFunction";
            WaveFunction.ARCTAN = "arctanFunction";
            return WaveFunction;
        })();
        constants.WaveFunction = WaveFunction;
    })(coordinate.constants || (coordinate.constants = {}));
    var constants = coordinate.constants;
})(coordinate || (coordinate = {}));
var coordinate;
(function (coordinate) {
    (function (nodes) {
        var Node = (function () {
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

            Node.prototype.toObject = function () {
                throw (new Error('Method must be called in Node descendant'));
                return null;
            };
            return Node;
        })();
        nodes.Node = Node;
    })(coordinate.nodes || (coordinate.nodes = {}));
    var nodes = coordinate.nodes;
})(coordinate || (coordinate = {}));
var coordinate;
(function (coordinate) {
    (function (nodes) {
        (function (twodee) {
            var nodes = coordinate.nodes;
        })(nodes.twodee || (nodes.twodee = {}));
        var twodee = nodes.twodee;
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
            var nodes = coordinate.nodes;

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
                    set: function (value) {
                        this._x = value;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Node2d.prototype, "y", {
                    get: function () {
                        return this._y;
                    },
                    set: function (value) {
                        this._y = value;
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
                        return this._jitterY;
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
                    var n = new Node2d(this.link, this.x, this.y, this.jitterX, this.jitterY);
                    n.rotation = this._rotation;
                    return n;
                };

                Node2d.prototype.toObject = function () {
                    return { x: this._x, y: this._y, rotation: this.rotation };
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

                OrderedNode.prototype.clone = function () {
                    return new OrderedNode(this._link, this._order, this._x, this._y, this._jitterX, this._jitterY);
                };

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
