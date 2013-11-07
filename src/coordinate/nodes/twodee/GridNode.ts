/**
 * @license see license.txt
 * @author mparaiso <mparaiso@online.fr>  
 * @url mparaiso@online.fr
 */
module coordinate.nodes.twodee {

    export class GridNode extends Node2d implements INode2d {

        _row: number;
        _column: number;

        /**
         * Node used for Grid layout
         *          * 
         * @param link          The node's target object
         * @param column        Column in the grid in which the node resides
         * @param row           Row in the grid in which the node resides
         * @param x             Node's x position
         * @param y             Node's y position
         * @param jitterX       Node's x-jitter value
         * @param jitterY       Node's y-jitter value
         * 
         */
        constructor(link: Object= null, column: number= -1, row: number= -1, x: number= 0,
            y: number= 0, jitterX: number= 0, jitterY: number= 0) {
            super(link, x, y, jitterX, jitterY);
            this._row = row;
            this._column = column;
        }

        /**
         * Mutator/accessor of the node's row property. <strong>Note</strong> - There's currently no error-checking if invaluid value is set
         * @return Row in the grid in which the node resides
         * 
         */
        get row(): number { return this._row; }
        set row(value: number) { this._row = value; }

        /**
         * Mutator/accessor of the node's column property. <strong>Note</strong> - There's currently no error-checking if invaluid value is set
         * @return Column in the grid in which the node resides
         * 
         */
        get column(): number { return this._column; }
        set column(value: number) { this._column = value; }

        /**
         * Creates an exact copy of node with link and position properties carried over
         * 
         * @return Cloned node
         * 
         */
        clone(): INode2d {
            return new GridNode(this._link, this._column, this._row, this._x,
                this._y, this._jitterX, this._jitterY);
        }

        /**
         * Packages the node as a generic object - mainly used for exporting layout data.
         *
         * @return Generic object containing all the node's layout properties
        */
        toObject(): Object {
            return {
                row: this._row, column: this._column, x: this._x, y: this._y,
                rotation: this._rotation
            };
        }
    }
}