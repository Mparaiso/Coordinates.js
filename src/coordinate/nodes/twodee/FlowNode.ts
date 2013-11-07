/**
 * @license see license.txt
 * @author mparaiso <mparaiso@online.fr>  
 * @url mparaiso@online.fr
 */
module coordinate.nodes.twodee {

    export class FlowNode extends Node2d implements INode2d {
        _outsideBounds: Boolean;

        /**
         * Node used for Flow layout
         * 
         * @see com.somerandomdude.coordy.layouts.twodee.Flow
         * 
         * @param link      The node's target DisplayObject
         * @param x         Node's x position
         * @param y         Node's y position
         * 
         */
        constructor(link: Object= null, x: number= 0, y: number= 0) {
            super(link, x, y);
        }

        /**
         * Property as to whether node's position exists outside of the layouts current bounds
         * @return Boolean of node's placement in/out of bounds. True if out of bounds
         * 
         */
        get outsideBounds(): Boolean { return this._outsideBounds; }
        set outsideBounds(value: Boolean) { this._outsideBounds = value; }

        /**
         * Creates an exact copy of node with link and position properties carried over
         * 
         * @return Cloned node
         * 
         */
        clone(): INode2d {
            var n: FlowNode = new FlowNode(this._link, this._x, this._y);
            n.outsideBounds = this._outsideBounds;
            return n;
        }

    }
}