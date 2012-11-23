define (require)->
    
    Node2d = require "./Node2d"

    class ScatterNode extends Node2d
        ### Node used for Scatter layouts ###

        constructor: (link,x,y,rotation) ->
            super(link,x,y)
            @initConfig(rotation:rotation,xRelation:null,yRelation:null)


        toString:->
            "[object ScatterNode]"

        clone:->
            n = new ScatterNode(@_link,@_x,@_y,@_rotation)
            n.setXRelation @_xRelation
            n.setYRelation @_yRelation
            return n
        
    