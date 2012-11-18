define (require)->
    Link = require("./Link")

    class DOMLink2d extends Link

        constructor:(domElement)->
            x=0
            y=0
            rotation=0
            @getX=->x
            @setX=(v)->x=v;@applyTransform()
            @getY=->y
            @setY=(v)->y=v;@applyTransform()
            @getRotation=->rotation
            @setRotation=(v)->rotation=v;@applyTransform()
            @getDomElement=->domElement
            @setDomElement=(v)->domElement=v;@initTransform()
            @initTransform()
            ###
            descriptors = 
                x:
                    get:->@x
                    set:(value)->@x=value;@applyTransform()
                y:
                    get:->@y
            ###

        initTransform:->-

        applyTransform:->
            d = @getDomElement()
            for transform in ['transform',"webkitTransform","mozTransform","oTransform","msTransform"]
                #if d.style[transform]?
                    d.style[transform] = "translate(#{@getX()}px,#{@getY()}px) rotate(#{@getRotation()}deg)"
            return