define (require)->
    
    Layout3d = require "./Layout3d"
    StackOrder = require "../../constants/StackOrder"
    NodeEvent = require "../../events/NodeEvent"
    OrderedNode3d = require "../../nodes/threedee/OrderedNode3d"


    class Stack3d extends Layout3d
        ### Distributes nodes in a 3d stack. ###

        PI = Math.PI

        constructor:(angle=45,offset=5,zOffset=5,x=0,y=0,z=0,order= StackOrder.ASCENDING,jitterX=0,jitterY=0,jitterZ=0)->
            super()
            @initConfig({angle,offset,zOffset,x,y,z,order,jitterX,jitterY,jitterZ},->@updateFunction())

        addNode:(link,moveToCoordinates=true)->
            ###
              Adds object to layout in next available position.
            ###
            if(!@validateObject(link)) then throw "not a valid link" 
            if @linkExists(link) then return null
            node = new OrderedNode3d(link,@size)
            @storeNode(node)
            @cleanOrder()
            @update()
            if moveToCoordinates then @render()
            @dispatchEvent(new NodeEvent(NodeEvent::ADD,node))
            return node

        addToLayoutAt:(link,index,moveToCoordinates=true)->
            ###  Adds DisplayObject to layout in the specified order within the layout ###
            if not @validateObject(link) then throw new Error("Not a valid link")
            if @linkExists(link) then return null
            node = new OrderedNode3d(link,index,0,0,0)
            @storeNodeAt(node,index)
            @cleanOrder()
            @update()
            if moveToCoordinates then render()
            @dispatchEvent(new NodeEvent(NodeEvent::ADD,node))
            return node


        clone:->
            return new Stack3d(@_angle,@_offset,@_x,@_y,@_z,@_order,@_jitterX,@_jitterY,@_jitterZ)

        update:->
            if @nodes.length <= 0 then return
            @cleanOrder()
            rad = @_angle*PI/180
            if @_order is StackOrder.ASCENDING
                @nodes.sort (a,b)->
                    return 1 if a.getOrder() < b.getOrder()
                    return 0 if a.getOrder() is b.getOrder()
                    return -1 if a.getOrder() > b.getOrder()
            for node,i in @nodes
                node.setX @_x+Math.cos(rad)*@_offset*i + node.getJitterX()*@_jitterX
                node.setY @_y+Math.sin(rad)*@_offset*i + node.getJitterY()*@_jitterY
                node.setZ @_z+@_zOffset*i+node.getJitterZ()*@_jitterZ
            return

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
