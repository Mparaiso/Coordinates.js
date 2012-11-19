define (require)->
    Link = require("./Link")

    class DOMLink2d extends Link

        constructor:(domElement,x=0,y=0,rotation=0)->
            domElement instanceof window.HTMLElement || throw "domElement must be an instance of HTMLElement"
            Object.defineProperties? this,
                x:
                    get:->x
                    set:(value)->x=value;@applyTransform()
                y:
                    get:->y
                    set:(value)->y=value;@applyTransform()
                rotation:
                    get:->rotation
                    set:(value)->rotation=value;@applyTransform()
                domElement:
                    get:->domElement
                    set:(value)->domElement=value
            
        applyTransform:->
            d = @domElement
            for transform in ['transform',"webkitTransform","mozTransform","oTransform","msTransform"]
                #if d.style[transform]?
                    d.style[transform] = "translate(#{@x}px,#{@y}px) rotate(#{@rotation}deg)"
            return

        toString:->
            "[object DOMLink2d]"