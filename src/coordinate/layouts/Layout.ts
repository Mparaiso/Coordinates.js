
module coordinate.layouts {
    //import com.serialization.json.JSON;
    //import com.somerandomdude.coordy.nodes.INode;

    //import flash.display.DisplayObject;
    //import flash.events.EventDispatcher;

    export class Layout extends events.EventDispatcher {

        _nodes: Array<nodes.INode>;
        _size: number;

        /**
         * Returns the number of nodes currently stored and managed
         *
         * @return  Total number of nodes   
         */
        get size(): number { return this._size; }

        /**
         * Returns an array of node objects
         *
         * @return  Array containing all node objects     
         */
        get nodes(): Array { return this._nodes; }

        /**
         * The most base-level class for all layouts. Cannot be instantiated as is.
         * 
         */
        Layout() {
            this._size = 0;
        }

        toString(): string { return ""; }

        /**
         * Serializes the layout data of each node as a JSON string. Includes the 'type', 'size' and 'nodes' properties.
         *
         * @return JSON representation of the layout's composition
        */
        toJSON(): string {
            var nodes: Array = new Array();
            var layout: any = new Object();

            for (var i: number = 0; i < this._size; i++) {
                nodes.push(this._nodes[i].toObject());
            }

            layout.type = toString();
            layout.size = this._size;
            layout.nodes = nodes;

            return JSON.stringify(layout);
        }

        addToLayout(object: Object, moveToCoordinates: Boolean= true): nodes.INode {
            throw (new Error('Method must be overriden by child class'));
            return null;
        }

        addNode(object: Object= null, moveToCoordinates: Boolean= true): nodes.INode {
            throw (new Error('Method must be overriden by child class'));
            return null;
        }

        /**
         * Adds a specified number of empty nodes to the layout
         * 
         * @param count The number of nodes to add to the layout 
        */
        addNodes(count: number): void {
            for (var i: number = 0; i < count; i++) this.addNode();
        }

        /**
         * Generates XML for the layout's properties.
         *
         * @return XML representation of the layout's composition
        */
        /*toXML(): XML {
            var xml: XML = <layout>< / layout>;
            xml.@type = toString();
            xml.@size = _size;
            for (var i: number = 0; i < _size; i++) {
                var node: XML = <node />
                var obj: Object = _nodes[i].toObject();
                for (var j: string in obj) {
                    node[string('@' + j)] = obj[j];
                }

                xml.appendChild(node);
            }

            return xml;
        }*/

        /**
         * Returns node object by specified display object
         *
         * @param  link  an absolute URL giving the base location of the image
         * @return      the node object which the display object is linked to
         * @see         INode
         */
        getNodeByLink(link: Object): nodes.INode {
            for (var i: number; i < this._nodes.length; i++) {
                if (this._nodes[i].link == link) return this._nodes[i];
            }
            return null;
        }

        /**
         * Returns specified node object's index in the collection 
         *
         * @param  node  Node object from layout organizer
         * @return      Index of node object in the collection of nodes
         * @see         INode
         */
        getNodeIndex(node: nodes.INode): number {
            for (var i: number = 0; i < this._nodes.length; i++) {
                if (this._nodes[i] == node) return i;
            }
            return null;
        }

        /**
         * Returns node object at specified index of collection
         *
         * @param  index  Index of item in the collection of nodes
         * @return      Node object at the specified location in the collection
         * @see         Node
         */
        getNodeAt(index: number): nodes.INode {
            return this._nodes[index];
        }

        /**
         * Returns true if a link (DisplayObject owned by a layout's node) exists in the layout
         *
         * @param  link  DisplayObject in question
         * @return      True if link exists in layout, false if not.
         * @see         Node
         */
        linkExists(link: Object): Boolean {
            for (var i: number = 0; i < this.size; i++) if (link == this._nodes[i].link) return true;
            return false;
        }

        /**
         * Swaps links of two node objects
         *
         * @param  nodeTo  
         * @param  nodeFrom
         */
        swapNodeLinks(nodeTo: nodes.INode, nodeFrom: nodes.INode): void {
            var tmpLink: Object = nodeTo.link;
            nodeTo.link = nodeFrom.link;
            nodeFrom.link = tmpLink;
        }

        /**
         * Removes all links between nodes and display objects 
         *
         */
        removeLinks(): void {
            for (var i: number = 0; i < this._nodes.length; i++) this._nodes[i].link = null;
        }

        /**
         * Removed the link between the node and display object at the specified index
         *
         * @param  index  index in collection of item to be removed
         */
        removeLinkAt(index: number): void {
            this._nodes[index].link = null;
        }

        /**
         * Removes specified node object from layout organizer
         *
         * @param  node specified Node object to remove
         */
        removeNode(node: nodes.INode): void {
            this._nodes.splice(this.getNodeIndex(node), 1);
            this._size--;
        }

        /**
         * Removes all nodes from the layout
         */
        removeAllNodes(): void {
            this.clearNodes();
            this._size = 0;
        }

        /**
         * Removes the node that is linked to the specified object
         * 
         * @param link 
         */
        removeNodeByLink(link: Object): void {
            for (var i: number = 0; i < this._size; i++) {
                if (this._nodes[i].link == link) this.removeNode(this._nodes[i]);
            }
        }

        /**
         * Adds a link between the specified display object to the node object at the specified index
         *
         * @param  object   item to add to collection
         * @param  index        position where to add the item
         */
        addLinkAt(object: Object, index: number): void {
            this._nodes[index].link = object;
        }

        /**
         * @protected 
         */
        private storeNode(node: nodes.INode): number {
            if (!this._nodes) this._nodes = new Array();
            this._nodes.push(node);
            this._size++;

            return this.size;
        }

        /**
         * @protected 
         */
        private storeNodeAt(node: nodes.INode, index: number): number {
            if (!this._nodes) this._nodes = new Array();
            if (index >= 0 && index < this._size) this._nodes.splice(index, 0, node);
            else this._nodes.push(node);
            this._size++;

            return this.size;
        }

        /**
         * @protected 
         */
        private getNextAvailableNode(): nodes.INode {
            for (var i= 0; i < this._nodes.length; i++) {
                if (!this._nodes[i].link) {
                    return this._nodes[i];
                }
            }
            return null;
        }

        /**
         * @protected 
         */
        private clearNodes(): void {
            if (this._nodes) {
                for (var i in this._nodes) {
                    delete this._nodes[i];
                    this._nodes[i] = null;
                }
            }
            this._nodes = new Array();
        }

    }
}