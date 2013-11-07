/**
* @license see license.txt
* @author mparaiso <mparaiso@online.fr>
* @url mparaiso.online.fr
*/
declare module coordinate.constantes {
    enum FlowAlignment {
        /**
        * Flow nodes align to the top-left bounds
        */
        TOP_LEFT,
        /**
        * Flow nodes align to the top-center bounds
        */
        TOP_CENTER,
        /**
        * Flow nodes align to the top-right bounds
        */
        TOP_RIGHT,
        /**
        * Flow nodes align to the middle-left bounds
        */
        MIDDLE_LEFT,
        /**
        * Flow nodes align to the middle-center bounds
        */
        MIDDLE_CENTER,
        /**
        * Flow nodes align to the middle-right bounds
        */
        MIDDLE_RIGHT,
        /**
        * Flow nodes align to the bottom-left bounds
        */
        BOTTOM_LEFT,
        /**
        * Flow nodes align to the bottom-center bounds
        */
        BOTTOM_CENTER,
        /**
        * Flow nodes align to the bottom-right bounds
        */
        BOTTOM_RIGHT,
    }
}
/**
* @license see license.txt
* @author mparaiso <mparaiso@online.fr>
* @url mparaiso@online.fr
*/
declare module coordinate.nodes {
    interface INode {
        link: Object;
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
declare module coordinate.nodes.twodee {
    class OrderedNode extends twodee.Node2d {
        public _order: number;
        public order : number;
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
        constructor(link?: Object, order?: number, x?: number, y?: number, jitterX?: number, jitterY?: number);
        /**
        * Creates an exact copy of node with link and position properties carried over
        * @return Cloned node
        *
        */
        public clone(): twodee.INode2d;
        /**
        * Packages the node as a generic object - mainly used for exporting layout data.
        * @return Generic object containing all the node's layout properties
        */
        public toObject(): Object;
    }
}
/**
* @license see license.txt
* @author mparaiso <mparaiso@online.fr>
* @url mparaiso@online.fr
*/
declare module coordinate.nodes.twodee {
    class FlowNode extends twodee.Node2d implements twodee.INode2d {
        public _outsideBounds: Boolean;
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
        constructor(link?: Object, x?: number, y?: number);
        /**
        * Property as to whether node's position exists outside of the layouts current bounds
        * @return Boolean of node's placement in/out of bounds. True if out of bounds
        *
        */
        public outsideBounds : Boolean;
        /**
        * Creates an exact copy of node with link and position properties carried over
        *
        * @return Cloned node
        *
        */
        public clone(): twodee.INode2d;
    }
}
/**
* @license see license.txt
* @author mparaiso <mparaiso@online.fr>
* @url mparaiso@online.fr
*/
declare module coordinate.nodes.twodee {
    class GridNode extends twodee.Node2d implements twodee.INode2d {
        public _row: number;
        public _column: number;
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
        constructor(link?: Object, column?: number, row?: number, x?: number, y?: number, jitterX?: number, jitterY?: number);
        /**
        * Mutator/accessor of the node's row property. <strong>Note</strong> - There's currently no error-checking if invaluid value is set
        * @return Row in the grid in which the node resides
        *
        */
        public row : number;
        /**
        * Mutator/accessor of the node's column property. <strong>Note</strong> - There's currently no error-checking if invaluid value is set
        * @return Column in the grid in which the node resides
        *
        */
        public column : number;
        /**
        * Creates an exact copy of node with link and position properties carried over
        *
        * @return Cloned node
        *
        */
        public clone(): twodee.INode2d;
        /**
        * Packages the node as a generic object - mainly used for exporting layout data.
        *
        * @return Generic object containing all the node's layout properties
        */
        public toObject(): Object;
    }
}
declare module coordinate.layouts {
    interface ILayout extends layouts.ICoreLayout {
        updateMethod: String;
        proxyUpdater: Object;
        executeUpdateMethod(): void;
    }
}
declare module coordinate.layouts {
    interface ICoreLayout {
        nodes: Array<T>;
        size: number;
        addNodes(count: number): void;
        addNode(object: Object, moveToCoordinates: Boolean): coordinate.nodes.INode;
        addToLayout(object: Object, moveToCoordinates: Boolean): coordinate.nodes.INode;
        getNodeByLink(link: Object): coordinate.nodes.INode;
        getNodeIndex(node: coordinate.nodes.INode): number;
        getNodeAt(index: number): coordinate.nodes.INode;
        addLinkAt(object: Object, index: number): void;
        removeLinks(): void;
        removeLinkAt(index: number): void;
        removeNode(node: coordinate.nodes.INode): void;
        removeNodeByLink(object: Object): void;
        swapNodeLinks(nodeTo: coordinate.nodes.INode, nodeFrom: coordinate.nodes.INode): void;
        updateAndRender(): void;
        update(): void;
        render(): void;
        toString(): String;
        toJSON(): String;
        toXML(): String;
    }
}
declare module coordinate {
}
