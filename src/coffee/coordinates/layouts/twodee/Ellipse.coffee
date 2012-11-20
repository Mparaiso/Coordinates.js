define (require)->

    Layout2d = require("./Layout2d")
    EllipseNode = require("../../nodes/twodee/EllipseNode")
    NodeEvent = require("../../events/NodeEvent")
    PathAlignType = require("../../constants/PathAlignType")

    class Ellispe extends Layout2d

        getWidth:->
            @_width
        getHeight:->
            @_height
        getRotation:->
            @_rotation
        getAlignAngleOffset:->
            @_alignAngleOffset

        constructor:(width,height,x=0,y=0,rotation=0,jitterX=0,jitterY=0,alignType=PathAlignType.NONE,alignAngleOffset=0)->
            super(x,y,jitterX,jitterY,width,height,rotation)
            @initConfig({alignType:alignType,alignAngleOffset:alignAngleOffset},->@updateFunction())
            
        toString:->
            "[object Ellipse]"

        addNode:(link,moveToCoordinates=true)->
            ### Adds object to layout in next available position.###
            if @linkExists(link) then return
            node = new EllipseNode(link,0,0,0,0,0)
            @storeNode(node)
            @update()
            if moveToCoordinates then @render()
            @dispatchEvent(new NodeEvent(NodeEvent::ADD,node))
            return node

        renderNode:(node)->
            ### Renders all layout property values of a specified node  ###
            super(node)
            node.getLink().setRotation(if @getAlignType() == PathAlignType.NONE then 0 else node.getRotation())



        # setNodeAngle:(node,angle)->
        #     ### Sets angle of position of specified cell in degrees  ###
        #     nAngle = @getCellAngle(node)
        #     @setRotation(@getRotation()- nAngle- angle)

        clone:->
            ### Clones the current object's properties  ###
            new Ellispe(@getWidth(),@getHeight(),@getX(),@getY(),
                @getRotation(),@getJitterX(),@getJitterY(),
                @getAlignType(),@getAlignAngleOffset())

        update:->
            ### 
                Updates the nodes' virtual coordinates. <strong>Note</strong> 
                this method does not update 
                the actual objects linked to the layout. 
            ###
            PI = Math.PI
            w = @getWidth() / 2
            h = @getHeight() / 2
            rOffset = @getRotation()*(PI/180)
            for i in [0...@size]
                node = @nodes[i]
                rad = ((PI*(i))/(@size/2))+rOffset
                node.setX((w*Math.cos(rad))+(w+@getX())+(node.getJitterX()*@getJitterX())-w)
                node.setY((h*Math.sin(rad))+(h+@getY())+(node.getJitterY()*@getJitterY())-h)
                node.setRotation(Math.atan2((@getY())-node.getY(),@getX()-node.getX())*(180/PI))
                if @getAlignType() == PathAlignType.ALIGN_PERPENDICULAR
                    node.setRotation(node.getRotation()+90)
                node.setRotation(node.getRotation()+@getAlignAngleOffset())

        # rotateCellToTop:(cell)->
        #     xR = cell.getLink().getX() - ( @getX() + @getWidth() / 2 )
        #     yR = cell.getLink().getY() - ( @getY() + @getHeight() / 2 )

        #     rads = Math.atan2(yR*(@getWidth()/@getHeight()),xR)

        #     a = rads*(180/PI)+90

        #     @setRotation(@getRotation()-a)

        #     return a
