/**
 * a module
 */

module com.namespace {
    /**
     * A CLASS is exported (ie avaiable to the global scope 
    */
    export class Foo {
        // SOME PROPERTIES
        bar: Object;
        public baz: Number;
        private _qux: String;
        /**
         * getters and setters
         */
        get qux(): String { return this._qux; }
        set qux(value: String) { this._qux = value; }
    }
}
