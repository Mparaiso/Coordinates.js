define (require)->

    Link = require("./Link")

    class DOMLink2d extends Link

        constructor:(element,x=0,y=0,rotation=0)->
            element instanceof window.HTMLElement || throw "domElement must be an instance of HTMLElement"
            super(element,x,y,rotation)

        setX:(value)->
            @_x=value
            @applyTransform()

        setY:(value)->
            @_y=value
            @applyTransform()

        setRotation:(value)->
            @_rotation=value
            @applyTransform()

        applyTransform:->
            for transform in ['transform',"webkitTransform","mozTransform","oTransform","msTransform"]
                @getElement().style[transform] = "translate(#{@_x}px,#{@_y}px) rotate(#{@_rotation}deg)"
            return

        toString:->
            "[object DOMLink2d]"