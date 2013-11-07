module coordinate.nodes.twodee {
    export interface INode2d {
        x: number;
        y: number;
        jitterX: number;
        jitterY: number;
        rotation: number;
        clone(): INode2d;
    }
}