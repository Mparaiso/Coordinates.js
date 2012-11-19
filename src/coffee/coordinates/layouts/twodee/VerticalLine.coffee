define (require)->
    Layout = require("../Layout")

    class VerticalLine extends Layout
        constructor:(vPadding=0,x=0,y=0,jitterX=0,jitterY=0)->
            super(x,y,jitterX,jitterY)
            @initConfig({vPadding:vPadding},@updateFunction)
        

