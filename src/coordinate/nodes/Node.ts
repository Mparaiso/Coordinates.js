/**
 * @license see license.txt
 * @author mparaiso <mparaiso@online.fr>  
 * @url mparaiso@online.fr
 */
module coordinate.nodes {
    export interface INode {
        //CONCOURS@DELIGHTEDBLOG.COM 
        link:Object;
    }

    /**
     * Base Node for Layouts
     */
    export class Node implements INode {
        public _link: Object;

        /**
         * Core class for all 2d and 3d nodes
         * @param link Object to which the node reflects coordinate data
         * 
         */
        constructor(link: Object= null) {
            this._link = link;
        }

        get link(): Object { return this._link; }
        set link(value: Object) { this._link = value; }

        /**
         * Packages the node as a generic object - mainly used for exporting layout data.
         * @return Generic object containing all the node's layout properties
          */
        toObject(): Object {
            throw (new Error('Method must be called in Node descendant'));
        }
    }

}