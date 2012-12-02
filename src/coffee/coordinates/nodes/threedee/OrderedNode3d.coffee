define (require)->

    Node3d = require "./Node3d"
    
    class OrderedNode3d extends Node3d

        constructor:(link=null,order=0,x=0,y=0,z=0,jitterX=0,jitterY=0,jitterZ=0)->
            super(link,x,y,z,jitterX,jitterY,jitterZ)
            @initConfig({order})

        clone:->
            ### Creates an exact copy of node with link and position properties carried over ###
            new OrderedNode3d(@_link,@_order,@_x,@_y,@_z,@_jitterX,@_jitterY,@_jitterZ)

        toJSON:->
            @toObject()

        toObject:->
            order:@_order
            x:@_x
            y:@_y
            z:@_z

        toString:->
            "[object OrderedNode3d]"
