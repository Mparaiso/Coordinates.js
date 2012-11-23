define (require)->

    Layout2d = require("./Layout2d")
    PathAlignType = require("../../constants/PathAlignType")
    NodeEvent = require("../../events/NodeEvent")
    
    class Spiral extends Layout2d

        PI = Math.PI

        constructor:(circumference,x=0,y=0,spiralConstant=0.15,angleDelta=30,rotation=0,jitterX=0,jitterY=0,alignType=PathAlignType.NONE,alignOffset=0)->
            ### Distributes nodes in a spiral. ###
            super(x,y,jitterX,jitterY)
            @initConfig({circumference:circumference,spiralConstant:spiralConstant,alignType:alignType,alignOffset:alignOffset,angleDelta:angleDelta},->@userFunction)

        toString:->
            "[object Spiral]"

        renderNode:(node)->
            super(node)
            node.getLink().setRotation(if @_alignType==PathAlignType.NONE then 0 else node.getRotation())

        clone:->
            new Spiral(@_circumference,@_spiralConstant,@_x,@_y,@_angleDelta,@_rotation,@_jitterX,@_jitterY,@_alignType,@_alignOffset)

        update:->
            ### Updates the nodes' virtual coordinates. <strong>Note</strong> - this method does not update the actual objects linked to the layout. ###
            unless @nodes.length <=0
                for node,i in @nodes
                    phi = @_angleDelta*i*PI/180
                    node.setX @_x+@_circumference*Math.exp(@_spiralConstant*phi)*Math.cos(phi)
                    node.setY @_y+@_circumference*Math.exp(@_spiralConstant*phi)*Math.sin(phi)
                    node.setRotation Math.atan2( (@_y)-node.getY() , (@_x) - node.getX() ) * (180/PI)
                    if @_alignType==PathAlignType.ALIGN_PERPENDICULAR then node.setRotation node.getRotation()+90
                    node.setRotation node.getRotation()+@_alignOffset
            return 