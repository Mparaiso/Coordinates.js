module coordinate.nodes.twodee {

    export class OrderedNode extends Node2d {
        _order: number;


        get order(): number { return this._order; }
        set order(value: number) { this._order = value; }

        constructor(link: any= null, order: number= 0, x: number= 0, y: number= 0, jitterX: number= 0, jitterY: number= 0) {
            super(link, x, y, jitterX, jitterY);
            this._order = order;
        }

        clone(): INode2d { return new OrderedNode(this._link, this._order, this._x, this._y, this._jitterX, this._jitterY); }

        toObject(): any {
            return { order: this._order, x: this._x, y: this._y, rotation: this._rotation };
        }

    }
}