declare module coordinate.nodes {
    interface INode {
    }
    /**
    * Base Node for Layouts
    */
    class Node implements INode {
        public _link: Object;
        constructor(link?: Object);
        public link : Object;
    }
}
