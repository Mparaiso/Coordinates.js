### @TODO écrire addToLayoutAt ###

define (require)->

    Layout2d = require("./Layout2d")
    StackOrder = require("../../constants/StackOrder")
    OrderedNode = require("../../nodes/twodee/OrderedNode")
    NodeEvent = require("../../events/NodeEvent")

    class Stack extends Layout2d
        ### Distributes nodes in a stack. ###
        constructor:(angle=45,offset=5,x=0,y=0,order=StackOrder.ASCENDING,jitterX=0,jitterY=0)->

            super(x,y,jitterX,jitterY)

            @initConfig(angle:angle,offset:offset,order:order,-> @updateFunction)


        toString:->
            ### Returns the type of layout in a string format ###
            "[object Stack]"

        addNode:(link,moveToCoordinates=true)->
            ### Adds object to layout in next available position. ###
            if @linkExists(link) then return 
            node = new OrderedNode link,(@nodes.length-1)
            @storeNode(node)
            @cleanOrder()
            @update()

            if moveToCoordinates then @render()

            @dispatchEvent(new NodeEvent(NodeEvent::ADD,node))

            return node

        clone:->
            ### Clones the current object's properties (does not include links to DisplayObjects) ###
            return new Stack(@_angle,@_offset,@_x,@_y,@_order,@_jitterX,@_jitterY)


        renderNode:(node)->
            super(node)
            node.getLink().setOrder node.getOrder()
            return

        update:->
            unless @nodes.length <= 0
                @cleanOrder()
                rad = @_angle * Math.PI / 180
                if @_order == StackOrder.ASCENDING
                    @nodes.sort (n2,n1)->
                        n2.getOrder() - n1.getOrder()
                else
                    @nodes.sort (n2,n1)->
                        n1.getOrder() - n2.getOrder() 
                for i in [0...@nodes.length]
                    node = @nodes[i]
                    node.setX @_x + (Math.cos(rad)*@_offset*i) + (node.getJitterX()*@_jitterX)
                    node.setY @_y + (Math.sin(rad)*@_offset*i) + (node.getJitterY()*@_jitterY)
            return

        cleanOrder:->
            ### sort croissant ###
            #@nodes.sort (n2,n1)->
                #n2.getOrder() > n1.getOrder()
            ### normalisation des order de chaque OrderNode ###
            for node,i in @nodes
                @nodes[i].setOrder i
            return





