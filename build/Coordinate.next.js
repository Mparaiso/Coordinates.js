var coordinate;
(function (coordinate) {
    (function (nodes) {
        /**
        * Base Node for Layouts
        */
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
            return Node;
        })();
        nodes.Node = Node;
    })(coordinate.nodes || (coordinate.nodes = {}));
    var nodes = coordinate.nodes;
})(coordinate || (coordinate = {}));
//# sourceMappingURL=Coordinate.next.js.map
