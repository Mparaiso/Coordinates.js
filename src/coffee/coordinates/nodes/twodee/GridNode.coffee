define (require)->

    Node2d = require("./Node2d")

    class GridNode extends Node2d
        ### Node used for Grid layout ### 
        
        constructor:(link=null,column=-1,row=-1,x=0,y=0,jitterX=0,jitterY=0)->
            super(link,x,y,jitterX,jitterY)
            @initConfig(row:row,column:column)

        clone:->
            new GridNode(@_link,@_column,@_row,@_x,@_y,@_jitterX,@_jitterY)

        toString:->
            "[object GridNode]"

        toObject:->
            row:@_row
            column:@_column
            x:@_x
            y:@_y
            jitterX:@_jitterX
            jitterY:@_jitterY