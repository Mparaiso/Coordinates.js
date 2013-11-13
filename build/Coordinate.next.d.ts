declare module coordinate.events {
    class EventDispatcher {
    }
}
declare module coordinate.constants {
    class FlowAlignment {
        static TOP_LEFT: string;
        static TOP_CENTER: string;
        static TOP_RIGHT: string;
        static MIDDLE_LEFT: string;
        static MIDDLE_CENTER: string;
        static MIDDLE_RIGHT: string;
        static BOTTOM_LEFT: string;
        static BOTTOM_CENTER: string;
        static BOTTOM_RIGHT: string;
    }
}
declare module coordinate.constants {
    class FlowDirection {
        static HORIZONTAL: string;
        static VERTICAL: string;
    }
}
declare module coordinate.constants {
    class FlowOverflowPolicy {
        static ALLOW_OVERFLOW: string;
        static IGNORE_OVERFLOW: string;
        static HIDE_OVERFLOW: string;
    }
}
declare module coordinate.constants {
    class GridLayoutDirection {
        static LEFT_TO_RIGHT: string;
        static RIGHT_TO_LEFT: string;
        static TOP_TO_BOTTOM: string;
        static BOTTOM_TO_TOP: string;
    }
}
declare module coordinate.constants {
    class LatticeAlternationPattern {
        static ALTERNATE_HORIZONTALLY: string;
        static ALTERNATE_VERTICALLY: string;
    }
}
declare module coordinate.constants {
    class LatticeOrder {
        static ORDER_HORIZONTALLY: String;
        static ORDER_VERTICALLY: String;
    }
}
declare module coordinate.constants {
    class LatticeType {
        static SQUARE: string;
        static DIAGONAL: string;
    }
}
declare module coordinate.constants {
    class LayoutType {
        static ELLIPSE_3D: string;
        static GRID_3D: string;
        static SCATTER_3D: string;
        static SNAPSHOT_3D: string;
        static SPHEROID_3D: string;
        static STACK_3D: string;
        static WAVE_3D: string;
        static WAVE_ELLIPSE_3D: string;
        static ELLIPSE: string;
        static FLOW: string;
        static GRID: string;
        static HORIZONTAL_LINE: string;
        static LATTICE: string;
        static SCATTER: string;
        static SNAPSHOT: string;
        static STACK: string;
        static VERTICAL_LINE: string;
        static WAVE: string;
    }
}
declare module coordinate.constants {
    class LayoutUpdateMethod {
        static NONE: string;
        static UPDATE_ONLY: string;
        static UPDATE_AND_RENDER: string;
    }
}
declare module coordinate.constants {
    class PathAlignType {
        static ALIGN_PARALLEL: string;
        static ALIGN_PERPENDICULAR: string;
        static NONE: string;
    }
}
declare module coordinate.constants {
    class StackOrder {
        static ASCENDING: string;
        static DESCENDING: string;
    }
}
declare module coordinate.constants {
    class WaveFunction {
        static SINE: string;
        static COSINE: string;
        static TAN: string;
        static ARCSINE: string;
        static ARCCOSINE: string;
        static ARCTAN: string;
    }
}
declare module coordinate.nodes {
    interface INode {
        link: any;
        toObject(): any;
    }
}
declare module coordinate.nodes {
    class Node implements nodes.INode {
        public _link: any;
        constructor(link?: any);
        public link : any;
        public toObject(): any;
    }
}
declare module coordinate.nodes.twodee {
    interface INode2d extends nodes.INode {
        x: Number;
        y: Number;
        jitterX: Number;
        jitterY: Number;
        rotation: Number;
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
        constructor(link?: any, x?: number, y?: number, jitterX?: number, jitterY?: number);
        public x : number;
        public y : number;
        public jitterX : number;
        public jitterY : number;
        public rotation : number;
        public clone(): twodee.INode2d;
        public toObject(): any;
    }
}
declare module coordinate.nodes.twodee {
    class OrderedNode extends twodee.Node2d {
        public _order: number;
        public order : number;
        constructor(link?: any, order?: number, x?: number, y?: number, jitterX?: number, jitterY?: number);
        public clone(): twodee.INode2d;
        public toObject(): any;
    }
}
declare module coordinate {
}
