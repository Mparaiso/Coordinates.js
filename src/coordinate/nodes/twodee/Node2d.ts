module coordinate.nodes.twodee {
    export class Node2d extends Node implements INode2d {
        _x: number = 0;
        _y: number = 0;
        _jitterX: number = 0;
        _jitterY: number = 0;
        _rotation: number = 0;

        constructor(link: Object= null, x: number= 0, y: number= 0,
            jitterX: number= 0, jitterY: number= 0) {
            super(link);
            this._x = x;
            this._y = y;
            this._jitterX = jitterX;
            this._jitterY = jitterY;
        }

        get x(): number { return this._x; }
        set x(val: number) { this._x = val; }

        get y(): number { return this._y; }
        set y(val: number) { this._y = val }

        get jitterX(): number { return this._jitterX; }
        set jitterX(value: number) { this._jitterX = Math.random() * value * ((Math.random() > .5) ? -1 : 1); }

        get jitterY(): number { return this.jitterY; }
        set jitterY(value: number) { this._jitterY = Math.random() * value * ((Math.random() > .5) ? -1 : 1); }

        get rotation(): number { return this._rotation; }
        set rotation(value: number) { this._rotation = value; }


        clone(): INode2d {
            var n: Node2d = new Node2d(this._link, this._x, this._y, this._jitterX, this._jitterY);
            n.rotation = this._rotation;
            return n;
        }

        /**
         * Packages the node as a generic object - mainly used for exporting layout data.
         *
         * @return Generic object containing all the node's layout properties
        */
        toObject(): Object {
            return { x: this._x, y: this._y, rotation: this._rotation };
        }
    }
}