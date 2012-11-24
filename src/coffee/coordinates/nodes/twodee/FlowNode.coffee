define (require)->
    
    Node2d = require "./Node2d"

    class FlowNode extends Node2d
        ### Node used for Flow layout ###

        constructor:(link,x=0,y=0)->
            super(link,x,y)
            @initConfig(outsideBounds:false,width:@_link.getWidth(),height:@_link.getHeight())

        clone:->
            n = new FlowNode(@_link,@_x,@_y)
            n.setOutsideBounds @_outsideBounds
            return n

        toString:->
            "[object FlowNode]"

