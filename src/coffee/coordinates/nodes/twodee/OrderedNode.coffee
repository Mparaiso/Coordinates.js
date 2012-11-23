define (require)->

    Node2d = require("./Node2d")

    class OrderedNode extends Node2d
        constructor:(link=null,order=0,x=0,y=0,jitterX=0,jitterY=0)->

            super(link,x,y,jitterX,jitterY)

            @initConfig(order:order)

        clone:->
            return new OrderedNode(@getLink,@getOrder(),
                @getX(),@getY,@getJitterX(),@getJitterY())

        toObject:->
            order:@getOrder()
            x:@getX()
            y:@getY()
            rotation:@getRotation()

        toString:->
            "[object OrderedNode]"

