/**
 * a module
 */

module com.namespace {
    /**
     * An INTERFACE
     * @see http://blogs.msdn.com/b/typescript/archive/2013/01/24/interfaces-walkthrough.aspx
     */
    export interface IFoo {
        bar: Object;
        blop?: Number; // with ? this property is optional
    }
    /**
     * A CLASS is exported (ie avaiable to the global scope 
    */
    export class Foo implements IFoo {
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
