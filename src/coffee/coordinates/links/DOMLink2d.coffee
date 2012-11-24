define (require)->

    Link = require("./Link")

    class DOMLink2d extends Link

        constructor:(element,x=0,y=0,rotation=0)->
            # element instanceof window.HTMLElement || throw "domElement must be an instance of HTMLElement" doesnt work on IE8
            # element.nodeType?  == 1 || throw "domElement must be an instance of HTMLElement" 
            super(element,x,y,rotation)
            @getElement().style.position = "absolute"
            #@getElement().style.filter = "filter:progid:DXImageTransform.Microsoft.Matrix()"
            @setWidth @getWidth()
            @setHeight @getHeight()

        setX:(value)->
            @_x=value
            @applyTransform()

        setY:(value)->
            @_y=value
            @applyTransform()

        setRotation:(value)->
            @_rotation=value
            @applyTransform()

        setOrder:(value)->
            @_order = value
            @applyTransform()

        getHeight:->
            ### obtenir la hauteur ###
            r = @getElement().style.height.match(/(\d+)(px)/) || throw "Error getting height at #{this}"
            r[2] == "px" || throw "height must be expressed in px"
            return parseInt(r[1],10)

        getWidth:->
            ### obtenir la longueur ###
            r = @getElement().style.width.match(/(\d+)(px)/) || throw "Error getting width at #{this}"
            r[2] == "px" || throw "width must be expressed in px"
            return parseInt(r[1],10)

        applyTransform:->
            unless @_element == undefined || @_element == null
                @getElement().style.zIndex = @_order || 0
                for transform in ['transform',"webkitTransform","mozTransform","oTransform","msTransform"]
                    @getElement().style[transform] = "translate(#{parseInt(@_x)}px,#{parseInt(@_y)}px) rotate(#{parseInt(@_rotation)}deg)"
            return

        toString:->
            "[object DOMLink2d]"

