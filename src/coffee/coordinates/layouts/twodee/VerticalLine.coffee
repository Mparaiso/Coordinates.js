define (require)->
    Layout2d = require("./Layout2d")
    OrderedNode = require("../../nodes/twodee/OrderedNode")
    NodeEvent = require("../../events/NodeEvent")

    class VerticalLine extends Layout2d

        constructor:(vPadding=0,x=0,y=0,jitterX=0,jitterY=0)->

            super(x,y,jitterX,jitterY)

            @initConfig({vPadding:vPadding,order:null},->@updateFunction)

        toString:->
            "[layout VerticalLine]"

        addNode:(link=null,moveToCoordinates=true)->
            ### Adds object to layout in next available position. ###
            if @linkExists(link) then return

            node=new OrderedNode(link,@size)
            @storeNode node
            @update()

            if moveToCoordinates then @render()

            @dispatchEvent(new NodeEvent(NodeEvent::ADD,node))

            return node

        clone:->
            new VerticalLine(@getVPadding(),@getX(),@getY(),@getJitterX(),@getJitterY())

        update:->
            ###  Updates the nodes' virtual coordinates. <strong>Note</strong> - this method does not update the actual objects linked to the layout. ###
            unless @size==0
                @nodes.sort(@sortOnOrder)
                yPos=0
                for node in @nodes
                    node.setY(yPos+@getY()+node.getJitterY()*@getJitterY())
                    node.setX(@getX()+(node.getJitterX()*@getJitterX()))
                    unless node.getLink() == null
                        yPos += node.getLink().getHeight() + @getVPadding()

        cleanOrder:->
            ### Cleans out duplicates and gaps  ###
            # for node,index in @nodes
            #     node.setOrder(index)
            # return

        sortOnOrder:(n1,n2)->
            ### fonction d'aide pour le trie des noeux ###
            if n1.getOrder() > n2.getOrder() then return 1
            if n1.getOrder() is n2.getOrder() then return 0
            if n1.getOrder() < n2.getOrder() then return -1
            
        renderNode:(node)->
            super(node)
            node.getLink().setRotation(0)


        

