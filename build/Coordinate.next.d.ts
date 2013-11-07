declare module coordinate.events {
    class EventDispatcher {
        constructor();
    }
}
declare module coordinate.events {
    class Event {
        constructor(type, bubbles?: boolean, cancelable?: boolean);
    }
}
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
    enum FlowDirection {
        /**
        * Nodes flow horizontally within the bounds of the layout
        */
        HORIZONTAL,
        /**
        * Nodes flow vertically within the bounds of the layout
        */
        VERTICAL,
    }
    enum FlowOverflowPolicy {
        /**
        * Allow all nodes within flow that are out of the layout's bounds to continue flowing.
        * For example, a flow layout in which the <em>flowDirection</em> was <em>HORIZONTAL</em> would continue
        * places nodes horizontally even if the bounds of the layout have been reached
        */
        ALLOW_OVERFLOW,
        /**
        * Will simply not place nodes that do not fit within the layout's bounds.
        */
        IGNORE_OVERFLOW,
        /**
        * Will remove node's DisplayObject link from the target's display stack if it does not
        * fit within that layout's bounds.
        */
        HIDE_OVERFLOW,
    }
    enum GridLayoutDirection {
        /**
        * Places nodes within the grid layout from left to right
        */
        LEFT_TO_RIGHT,
        /**
        * Places nodes within the grid layout from right to left
        */
        RIGHT_TO_LEFT,
        /**
        * Places nodes within the grid layout from top to bottom
        */
        TOP_TO_BOTTOM,
        /**
        * Places nodes within the grid layout from bottom to top
        */
        BOTTOM_TO_TOP,
    }
    enum LayoutType {
        /**
        * @see coordinate.layouts.threedee.Ellipse3d
        */
        ELLIPSE_3D,
        /**
        * @see coordinate.layouts.threedee.Grid3d
        */
        GRID_3D,
        /**
        * @see coordinate.layouts.threedee.Scatter3d
        */
        SCATTER_3D,
        /**
        * @see coordinate.layouts.threedee.Snapshot3d
        */
        SNAPSHOT_3D,
        /**
        * @see coordinate.layouts.threedee.Sphere3d
        */
        SPHEROID_3D,
        /**
        * @see coordinate.layouts.threedee.Stack3d
        */
        STACK_3D,
        /**
        * @see coordinate.layouts.threedee.Wave3d
        */
        WAVE_3D,
        /**
        * @see coordinate.layouts.threedee.WaveEllipse3d
        */
        WAVE_ELLIPSE_3D,
        /**
        * @see coordinate.layouts.twodee.Ellipse
        */
        ELLIPSE,
        /**
        * @see coordinate.layouts.twodee.Flow
        */
        FLOW,
        /**
        * @see coordinate.layouts.twodee.Grid
        */
        GRID,
        /**
        * @see coordinate.layouts.twodee.HorizontalLine
        */
        HORIZONTAL_LINE,
        /**
        * @see coordinate.layouts.twodee.Lattice
        */
        LATTICE,
        /**
        * @see coordinate.layouts.twodee.Scatter
        */
        SCATTER,
        /**
        * @see coordinate.layouts.twodee.Snapshot
        */
        SNAPSHOT,
        /**
        * @see coordinate.layouts.twodee.Stack
        */
        STACK,
        /**
        * @see coordinate.layouts.twodee.VerticalLine
        */
        VERTICAL_LINE,
        /**
        * @see coordinate.layouts.twodee.Wave
        */
        WAVE,
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
        toObject();
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
declare module coordinate.layouts {
    class Layout extends coordinate.events.EventDispatcher {
        public _nodes: coordinate.nodes.INode[];
        public _size: number;
        /**
        * Returns the number of nodes currently stored and managed
        *
        * @return  Total number of nodes
        */
        public size : number;
        /**
        * Returns an array of node objects
        *
        * @return  Array containing all node objects
        */
        public nodes : Array<T>;
        /**
        * The most base-level class for all layouts. Cannot be instantiated as is.
        *
        */
        public Layout(): void;
        public toString(): string;
        /**
        * Serializes the layout data of each node as a JSON string. Includes the 'type', 'size' and 'nodes' properties.
        *
        * @return JSON representation of the layout's composition
        */
        public toJSON(): string;
        public addToLayout(object: Object, moveToCoordinates?: Boolean): coordinate.nodes.INode;
        public addNode(object?: Object, moveToCoordinates?: Boolean): coordinate.nodes.INode;
        /**
        * Adds a specified number of empty nodes to the layout
        *
        * @param count The number of nodes to add to the layout
        */
        public addNodes(count: number): void;
        /**
        * Returns node object by specified display object
        *
        * @param  link  an absolute URL giving the base location of the image
        * @return      the node object which the display object is linked to
        * @see         INode
        */
        public getNodeByLink(link: Object): coordinate.nodes.INode;
        /**
        * Returns specified node object's index in the collection
        *
        * @param  node  Node object from layout organizer
        * @return      Index of node object in the collection of nodes
        * @see         INode
        */
        public getNodeIndex(node: coordinate.nodes.INode): number;
        /**
        * Returns node object at specified index of collection
        *
        * @param  index  Index of item in the collection of nodes
        * @return      Node object at the specified location in the collection
        * @see         Node
        */
        public getNodeAt(index: number): coordinate.nodes.INode;
        /**
        * Returns true if a link (DisplayObject owned by a layout's node) exists in the layout
        *
        * @param  link  DisplayObject in question
        * @return      True if link exists in layout, false if not.
        * @see         Node
        */
        public linkExists(link: Object): Boolean;
        /**
        * Swaps links of two node objects
        *
        * @param  nodeTo
        * @param  nodeFrom
        */
        public swapNodeLinks(nodeTo: coordinate.nodes.INode, nodeFrom: coordinate.nodes.INode): void;
        /**
        * Removes all links between nodes and display objects
        *
        */
        public removeLinks(): void;
        /**
        * Removed the link between the node and display object at the specified index
        *
        * @param  index  index in collection of item to be removed
        */
        public removeLinkAt(index: number): void;
        /**
        * Removes specified node object from layout organizer
        *
        * @param  node specified Node object to remove
        */
        public removeNode(node: coordinate.nodes.INode): void;
        /**
        * Removes all nodes from the layout
        */
        public removeAllNodes(): void;
        /**
        * Removes the node that is linked to the specified object
        *
        * @param link
        */
        public removeNodeByLink(link: Object): void;
        /**
        * Adds a link between the specified display object to the node object at the specified index
        *
        * @param  object   item to add to collection
        * @param  index        position where to add the item
        */
        public addLinkAt(object: Object, index: number): void;
        /**
        * @protected
        */
        private storeNode(node);
        /**
        * @protected
        */
        private storeNodeAt(node, index);
        /**
        * @protected
        */
        private getNextAvailableNode();
        /**
        * @protected
        */
        private clearNodes();
    }
}
declare module coordinate {
}
