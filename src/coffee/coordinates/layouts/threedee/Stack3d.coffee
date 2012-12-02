define (require)->
    
    Layout3d = require "./Layout3d"
    StackOrder = require "../../constants/StackOrder"
    NodeEvent = require "../../events/NodeEvent"
    OrderedNode3d = require "../../nodes/threedee/OrderedNode3d"


    class Stack3d extends Layout3d
        ### Distributes nodes in a 3d stack. ###

        constructor:(angle=45,zOffset=5,x=0,y=0,z=0,order= StackOrder.ASCENDING,jitterX=0,jitterY=0,jitterZ=0)->
            super()
            @initConfig({angle,zOffset,x,y,z,order,jitterX,jitterY,jitterZ},->@updateFunction())

        addNode:(link,moveToCoordinates=true)->
            ###
              Adds object to layout in next available position.
            ###
            if(!@validateObject(link)) then throw "not a valid link" 
            if @linkExists(link) then return
            node = new OrderedNode3d(link,@size)
            @storeNode(node)
            @cleanOrder()
            @update()
            if moveToCoordinates then @render()
            @dispatchEvent(new NodeEvent(NodeEvent.ADD,node))
            return node

        cleanOrder:->
            @nodes.sort (a,b)->
                if a.getOrder()>b.getOrder() then return 1
                if a.getOrder()==b.getOrder() then return 0
                if a.getOrder()<b.getOrder() then return -1
            for node,i in @nodes
                @nodes[i].setOrder i
            return

        toString:->
            "[object Stack3d]"
