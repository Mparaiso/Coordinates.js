/**
 * Typescript 0.9 cheat-sheet
 * @author MParaiso <mparaiso@online.fr>
 */

module com.ns {
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

/**
 * COOKBOOK
 */

//------------------------
// RECIPE 1 : INTERNAL MODULE IMPORT
//------------------------

module com.foo.bar {
    export class Foo {
        constructor() { }
    }
}

module B {
    import bar = com.foo.bar; // alias Foo from A
    var _foo: bar.Foo = new bar.Foo();
    export class Bar {
        constructor() { }
    }
}
//-----------------------
// RECIPE 2 : declaring ENUMS
//-----------------------
enum COLORS {
    WHITE= 0xFFF, BLACK= 0x000, GREY= 0x555, RED= 0xF00
}
enum DIRECTION {
    EAST, SOUTH, WEST, NORTH
}

//-----------------------
// RECIPE 3: declaring and using INTERFACES
//-----------------------

interface MyInterface {
    foo: string;
    bar: number;
    baz(qux: boolean): Array;
    zip?:Date; //optional marked with ?
}

class MyImplementation implements MyInterface {
    private _foo: string;
    bar: number;
    get foo() { return this._foo; }
    set foo(value: string) { this._foo = value }
    baz(qux: boolean) { return []; }
}

// Describing an object literal

interface Zip{
    foo:string;
    bar:number;
}

var zip:Zip={foo:"bar",bar:100,baz:false};

// Interfaces are open

interface Zip{ /* reopening interface */
   baz:boolean; 
}

// Describing an indexable object

interface StringMap{
    [name:string]:string;
}

var stringMap:StringMap={a:"a",b:"b",c:"c"};

//declare var require;

import blop = module('./blop');









