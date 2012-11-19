define (require)->
    Layout = require("../Layout")

    class VerticalLine extends Layout
        constructor:(vPadding=0,x=0,y=0,jitterX=0,jitterY=0)->
            super()
            Object.defineProperties this, ->
                vPadding:
                    get:->vPadding
                    set:(v)->vPadding=v;@updateFunction()
                

