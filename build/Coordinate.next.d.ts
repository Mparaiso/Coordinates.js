declare module coordinate.nodes {
    interface INode {
    }
    /**
    * Base Node for Layouts
    */
    class Node implements INode {
        public _link: Object;
        /**
        * Core class for all 2d and 3d nodes
        * @param link Object to which the node reflects coordinate data
        *
        */
        constructor(link?: Object);
        public link : Object;
        /**
        * Packages the node as a generic object - mainly used for exporting layout data.
        * @return Generic object containing all the node's layout properties
        */
        public toObject(): Object;
    }
}
declare module coordinate.nodes.twodee {
    interface INode2d {
        x: number;
        y: number;
        jitterX: number;
        jitterY: number;
        rotation: number;
        clone(): INode2d;
    }
}
declare module coordinate.nodes.twodee {
    class Node2d extends nodes.Node implements twodee.INode2d {
        public _x: number;
        public _y: number;
        public _jitterX: number;
        public _jitterY: number;
        public _rotation: number;
        constructor(link?: Object, x?: number, y?: number, jitterX?: number, jitterY?: number);
        public x : number;
        public y : number;
        public jitterX : number;
        public jitterY : number;
        public rotation : number;
        public clone(): twodee.INode2d;
        /**
        * Packages the node as a generic object - mainly used for exporting layout data.
        *
        * @return Generic object containing all the node's layout properties
        */
        public toObject(): Object;
    }
}
declare module coordinate {
}
