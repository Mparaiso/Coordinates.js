define (require)->

    EventDispatcher = require("../events/helpers/EventDispatcher")
    NodeEvent = require("../events/NodeEvent")

    class Layout extends EventDispatcher

        constructor:->
            super()
            @size=0
            @nodes=[]

        addToLayout:(object,moveToCoordinates)->
            ### ###
            throw 'Method must be overriden by child class'

        addNode:(object,moveToCoordinates)->
            ### ###
            throw 'Method must be overriden by child class'
        
        addNodes:(nodes)->
            ### Adds a specified number of empty nodes to the layout ###
            @addNode(n) for n in nodes
            return

        toString:->
            "[object Layout]"

        toJSON:->
            ###  Serializes the layout data of each node as a JSON string. Includes the 'type', 'size' and 'nodes' properties. ###
            
            nodes = @nodes[i].toObject() for i in [0...@size]

            type:@toString()
            size:@size
            nodes:nodes

        getNodeByLink:(link)->
            ### Returns node object by specified display object ###
            for node in @nodes
                return node if node.getLink()==link
            return null

        getNodeIndex:(node)->
            ### Returns specified node object's index in the collection ###
            return @nodes.indexOf(node)

        getNodeAt:(index)->
            ### Returns node object at specified index of collection ###
            return @nodes[index]

        linkExists:(link)->
            ### Returns true if a link (DisplayObject owned by a layout's node) exists in the layout ###
            for node in @nodes
                return true if link == node.getLink()
            return false

        swapNodeLinks:(nodeTo,nodeFrom)->
            ### Swaps links of two node objects ###
            tmpLink = nodeTo.getLink()
            nodeTo.setLink(nodeFrom.getLink())
            nodeFrom.setLink(tmpLink)
            return

        removeLinks:->
            ### Removes all links between nodes and display objects ###
            for node in @nodes
                node.setLink(null)
            return

        removeLinkAt:(index)->
            ### Removed the link between the node and display object at the specified index ###
            @nodes[index].setLink(null)

        removeNode:(node)->
            [removedNode] = @nodes.splice(@getNodeIndex(node),1)
            @dispatchEvent(new NodeEvent(NodeEvent::REMOVE,removedNode))
            --@size

        removeAllNodes:->
            ### Removes all nodes from the layout ###
            @nodes = []
            @size=0

        removeNodeByLink:(link)->
            ### Removes the node that is linked to the specified object ###
            for node in @nodes
                if node.getLink() == link
                    @removeNode(node)
                    return

        addLinkAt:(link,index)->
            ### Adds a link between the specified display object to the node object at the specified index ###
            @nodes[index].setLink(link)

        storeNode:(node)->
            if not @nodes then @nodes=[]
            @nodes.push(node)
            ++@size

        storeNodeAt:(node,index)->
            if not @nodes then @nodes=[]
            @nodes.splice(index,0,node)
            ++@size

        getNextAvailableNode:->
            for node in @nodes
                return node if node.getLink()!=null