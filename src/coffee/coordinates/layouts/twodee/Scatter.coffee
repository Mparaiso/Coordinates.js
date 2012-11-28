define (require)->

    NodeEvent = require "../../events/NodeEvent"
    ScatterNode = require "../../nodes/twodee/ScatterNode"
    Layout2d = require "./Layout2d"

    class Scatter extends Layout2d

        constructor:(width,height,x=0,y=0,jitter=1,jitterRotation=false)->
            super(x,y,0,0,width,height)
            @initConfig(jitter:jitter,jitterRotation:jitterRotation,->@updateFunction)

        toString:->
            ### print object type ###
            "[object Scatter]"

        addNode:(link,moveToCoordinates)->
            ### Adds object to layout in next available position. ###
            if @linkExists(link) then return null
            p = if Math.round(Math.random()) then -1 else 1
            xPos = (@_width/ 2+((Math.random()*@_width*@_jitter) / 2 ) * p ) + @_x
            p = if Math.round(Math.random()) then -1 else 1
            yPos =  (@_height/2+((Math.random()*@_height*@_jitter)/2)*p)+@_y
            p = if Math.round(Math.random()) then -1 else 1
            node = new ScatterNode(link,xPos,yPos,(if @_jitterRotation then Math.random()*p*360 else 0 ))
            node.setXRelation node.getX() / @_width
            node.setYRelation node.getY() / @_height

            @storeNode node

            if moveToCoordinates then @render()

            @dispatchEvent new NodeEvent NodeEvent::ADD,node

            return node

        update:->
            ### Updates the nodes' virtual coordinates. <strong>Note</strong> - this method does not update the actual objects linked to the layout. ###
            unless @nodes?.length <= 0
                for node in @nodes
                    node.setX node.getXRelation()*@_width
                    node.setY node.getYRelation()*@_height

        scatter:->
            ### Re-scatters layout and adjusts cell links appropriately ###
            if @nodes?.length <= 0 then return
            for node in @nodes
                p = if Math.round(Math.random()) then -1 else 1
                node.setX (@_width/ 2+((Math.random()*@_width*@_jitter) / 2 ) * p ) + @_x
                p = if Math.round(Math.random()) then -1 else 1
                node.setY (@_height/2+((Math.random()*@_height*@_jitter)/2)*p)+@_y
                node.setXRelation node.getX() / @_width
                node.setYRelation node.getY() / @_height
            @updateFunction()
            return

        renderNode:(node)->
            node.getLink().setX node.getX()
            node.getLink().setY node.getY()
            node.getLink().setRotation node.getRotation()
            return node

        clone:->
            ### Clones the current object's properties (does not include links to DisplayObjects) ###
            new Scatter(@_width,@_x,@_y,@_jitter,@_jitterRotation)


      