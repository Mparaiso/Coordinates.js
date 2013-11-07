
module coordinate.nodes.twodee {
    export class OrderedNode extends Node2d {
        _order: number;

        get order(): number { return this._order; }
        set order(value: number) { this._order = value; }

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
        constructor(link: Object= null, order: number= 0, x: number= 0, y: number= 0, jitterX: number= 0, jitterY: number= 0) {
            super(link, x, y, jitterX, jitterY);
            this._order = order;
        }

        /**
         * Creates an exact copy of node with link and position properties carried over
         * @return Cloned node
         * 
         */
        clone(): INode2d { return new OrderedNode(this._link, this._order, this._x, this._y, 
            this._jitterX, this._jitterY); }

        /**
         * Packages the node as a generic object - mainly used for exporting layout data.
         * @return Generic object containing all the node's layout properties
        */
        toObject(): Object {
            return { order: this._order, x: this._x, y: this._y, rotation: this._rotation };
        }

    }
}