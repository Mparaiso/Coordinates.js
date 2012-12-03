define (require)->

    Node3d = require "./Node3d"
    
    class ScatterNode3d extends Node3d

        constructor:(link=null,x=0,y=0,z=0,rotationX=0,rotationY=0,rotationZ=0)->
            super(link,x,y,z)
            @initConfig({rotationX,rotationY,rotationZ})

        setXRelation:(v)->
            @_xRelation = v
            return

        getXRelation:->
            @_xRelation

        setYRelation:(v)->
            @_yRelation = v
            return

        getYRelation:->
            @_yRelation

        setZRelation:(v)->
            @_zRelation = v
            return

        getZRelation:->
            @_zRelation

        clone:->
            ### Creates an exact copy of node with link and position properties carried over ###
            new OrderedNode3d(@_link,@_order,@_x,@_y,@_z,@_rotationX,@_rotationY,@_rotationZ)

        toJSON:->
            @toObject()

        toObject:->
            x:@_x
            y:@_y
            z:@_z

        toString:->
            "[object ScatterNode3d]"
