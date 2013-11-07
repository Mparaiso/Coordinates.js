var com;
(function (com) {
    /**
    * a module
    */
    (function (namespace) {
        /**
        * A CLASS is exported (ie avaiable to the global scope
        */
        var Foo = (function () {
            function Foo() {
            }
            Object.defineProperty(Foo.prototype, "qux", {
                get: /**
                * getters and setters
                */
                function () {
                    return this._qux;
                },
                set: function (value) {
                    this._qux = value;
                },
                enumerable: true,
                configurable: true
            });
            return Foo;
        })();
        namespace.Foo = Foo;
    })(com.namespace || (com.namespace = {}));
    var namespace = com.namespace;
})(com || (com = {}));
//# sourceMappingURL=typescript-cheat-sheet.js.map
