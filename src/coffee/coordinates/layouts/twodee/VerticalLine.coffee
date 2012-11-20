define (require)->
    Layout2d = require("./Layout2d")

    class VerticalLine extends Layout2d

        constructor:(vPadding=0,x=0,y=0,jitterX=0,jitterY=0)->

            super(x,y,jitterX,jitterY)

            @initConfig({vPadding:vPadding},->@updateFunction)
        

