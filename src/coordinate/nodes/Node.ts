


module coordinate.nodes {

    export class Node implements INode {
        _link: any;


        constructor(link: any= null) {
            this._link = link;
        }


        get link(): any { return this._link; }
        set link(value: any) { this._link = value; }


        toObject(): any {
            throw (new Error('Method must be called in Node descendant'));
            return null;
        }
    }
}