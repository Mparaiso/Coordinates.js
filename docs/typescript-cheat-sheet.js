var com;
(function (com) {
    (function (ns) {
        var Foo = (function () {
            function Foo() {
            }
            Object.defineProperty(Foo.prototype, "qux", {
                get: function () {
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
        ns.Foo = Foo;
    })(com.ns || (com.ns = {}));
    var ns = com.ns;
})(com || (com = {}));

var com;
(function (com) {
    (function (foo) {
        (function (bar) {
            var Foo = (function () {
                function Foo() {
                }
                return Foo;
            })();
            bar.Foo = Foo;
        })(foo.bar || (foo.bar = {}));
        var bar = foo.bar;
    })(com.foo || (com.foo = {}));
    var foo = com.foo;
})(com || (com = {}));

var B;
(function (B) {
    var bar = com.foo.bar;
    var _foo = new bar.Foo();
    var Bar = (function () {
        function Bar() {
        }
        return Bar;
    })();
    B.Bar = Bar;
})(B || (B = {}));

var COLORS;
(function (COLORS) {
    COLORS[COLORS["WHITE"] = 0xFFF] = "WHITE";
    COLORS[COLORS["BLACK"] = 0x000] = "BLACK";
    COLORS[COLORS["GREY"] = 0x555] = "GREY";
    COLORS[COLORS["RED"] = 0xF00] = "RED";
})(COLORS || (COLORS = {}));
var DIRECTION;
(function (DIRECTION) {
    DIRECTION[DIRECTION["EAST"] = 0] = "EAST";
    DIRECTION[DIRECTION["SOUTH"] = 1] = "SOUTH";
    DIRECTION[DIRECTION["WEST"] = 2] = "WEST";
    DIRECTION[DIRECTION["NORTH"] = 3] = "NORTH";
})(DIRECTION || (DIRECTION = {}));

var MyImplementation = (function () {
    function MyImplementation() {
    }
    Object.defineProperty(MyImplementation.prototype, "foo", {
        get: function () {
            return this._foo;
        },
        set: function (value) {
            this._foo = value;
        },
        enumerable: true,
        configurable: true
    });
    MyImplementation.prototype.baz = function (qux) {
        return [];
    };
    return MyImplementation;
})();

var zip = { foo: "bar", bar: 100, baz: false };

var stringMap = { a: "a", b: "b", c: "c" };



