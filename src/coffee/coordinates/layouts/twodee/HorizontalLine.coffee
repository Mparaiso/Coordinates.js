define (require)->
    
    Layout2d = require("./Layout2d")
    NodeEvent = require("../../events/NodeEvent")
    OrderedNode = require("../../nodes/twodee/OrderedNode")
    class HorizontalLine extends Layout2d

        constructor:(hPadding=0,x=0,y=0,jitterX=0,jiiterY=0)->
            super(x,y,jitterX,jiiterY)
            ### générer les getters et setters ###
            @initConfig(hPadding:hPadding,->@updateFunction())

        toString:->
            ### returns the type of layout in a string format ###
            "[object HorizontalLine]"

        addNode:(link=null,moveToCoordinates=true)->
            ### Adds object to layout in next available position. ###
            if @linkExists(link) then return

            node = new OrderedNode(link,@size)
            @storeNode(node)
            @cleanOrder()
            @update()
            if moveToCoordinates && link then @render()
            @dispatchEvent(new NodeEvent(NodeEvent::ADD,node))

            return node

        addToLayoutAt:(link,index,moveToCoordinates=true)->
            ### Adds object to layout in the specified order within the layout  ###
            if @linkExists(link) then return
            if not @nodes then @nodes = []
            node = new OrderedNode(link,index,0,0)
            @storeNodeAt(node,index)
            @cleanOrder()
            @update()
            if moveToCoordinates then render()
            @dispatchEvent(new NodeEvent(NodeEvent::ADD,node))
            return node

        clone:->
            ### Clones the current object's properties  ###
            new HorizontalLine(@getHPadding(),@getX(),@getY(),@getJitterX(),@getJitterY())

        update:->
            unless size <= 0
                @nodes.sort((a,b)->a.getOrder()>b.getOrder())
                xPos = 0
                for node in @nodes
                    node.setX( xPos+@getX()+(node.getJitterX()*@getJitterX()) )
                    node.setY(@getY())
                    xPos += node.getLink().getWidth() + @getHPadding()

        cleanOrder:->
            @nodes.sort((a,b)->a.getOrder()>b.getOrder())
            for i in [0...@size]
                @nodes[i].setOrder(i)