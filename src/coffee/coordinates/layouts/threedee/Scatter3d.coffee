define (require)->
    
    Layout3d = require "./Layout3d"
    StackOrder = require "../../constants/StackOrder"
    NodeEvent = require "../../events/NodeEvent"
    ScatterNode3d = require "../../nodes/threedee/ScatterNode3d"

    class Scatter3d extends Layout3d

        constructor:(width,height,depth,jitter=1,x=0,y=0,z=0,jitterRotation=false)->
            super()
            @initConfig({width,height,depth,jitter,x,y,z,jitterRotation},->@updateFunction())

        toString:->
            ### Returns the type of layout in a string format ###
            "[object Scatter3d]"

        addNode:(link,moveToCoordinates=true)->
            ### Adds object to layout in next available position. ###
            if not @validateObject link then throw new Error("Link is not valid")
            if @linkExists link then return null
            p = -> if Math.round(Math.random()) then -1 else 1
            xPos = Math.random()*@_width*@_jitter*p() + @_x
            yPos = Math.random()*@_height*@_jitter*p() + @_y
            zPos = Math.random()*@_depth*@_jitter*p() + @_z

            ### @TODO jitter rotation ###
            node = new ScatterNode3d(link,xPos,yPos,zPos)

            node.setXRelation((node.getX()-@_width/2) / (@_width/2))
            node.setYRelation((node.getY()-@_height/2) / (@_height/2))
            node.setZRelation((node.getZ()-@_depth/2) / (@_depth/2))

            @storeNode(node)

            if moveToCoordinates
                @renderNode(node)

            @dispatchEvent( new NodeEvent(NodeEvent::ADD,node))

            return node

        render:->
            ### Applies all layout property values to all cells/display objects in the collection ###
            if @nodes.length <= 0 then return
            for node,i in @nodes
                @renderNode(node)
            return

        renderNode:(node)->
            super(node)
            node.getLink().setOrder(0)

        update:->
            if @nodes.length <= 0 then return
            for node,i in @nodes
                node.setX(node.getXRelation()*@_width + @_x)
                node.setY(node.getYRelation()*@_height + @_y)
                node.setZ(node.getZRelation()*@_depth + @_z)
            @cleanZ()
            return

        scatter:->
            ### Re-scatters layout and adjusts cell links appropriately ###
            p = -> if Math.round(Math.random()) then -1 else 1
            for node,i in @nodes
                node.setX(Math.random()*@_width*@_jitter*p() + @_x)
                node.setY(Math.random()*@_height*@_jitter*p() + @_y)
                node.setZ(Math.random()*@_depth*@_jitter*p() + @_z)
            return

        clone:->
            ### Clones the current object's properties (does not include links to DisplayObjects ###
            return new Scatter3d(@_width,@_height,@_depth,@_jitter,@_x,@_y,@_z,@_jitterRotation)

        cleanZ:->
            # @nodes.sort (a,b)->
            #     if a.getZ()>b.getZ() then return 1
            #     if a.getZ() is b.getZ() then return 0
            #     if a.getZ() < b.getZ() then return -1









