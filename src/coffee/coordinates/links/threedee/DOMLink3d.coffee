define (require)->

    BaseClass = require "../../utils/BaseClass"
    
    class DOMLink3d extends BaseClass

        constructor:(element,x=0,y=0,z=0,rotationX=0,rotationY=0,rotationZ=0)->
            @initConfig({element,x,y,z,rotationX,rotationY,rotationZ},->@update())

        setWidth:(v)->
            @_element.style.width = "#{v}px"
            @update()
            return

        setHeight:(v)->
            @_element.style.height= "#{v}px"
            @update()
            return

        getWidth:->
            @_element.offsetWidth || if @_element.style.width == "" then 0 else parseInt(@_element.style.width.replace("px",""),10)

        getHeight:->
            @_element.offsetHeight || if @_element.style.width == "" then 0 else  parseInt(@_element.style.height.replace("px",""),10)

        setOrder:(value)->
            @_order = value
            @update()
            return

        getOrder:->
            @_order || parseInt(@_element.style.zIndex)

        update:->
            if @_element == "undefined" then return
            @_element.style.zIndex = @getOrder() || 0
            for transform in ['webkitTransform','oTransform','msTransform','mozTransform','transform']
                @getElement().style[transform] = "rotateX(#{@_rotationX}deg) rotateY(#{@_rotationY}deg) rotateZ(#{@_rotationZ}deg) translateX(#{@_x}px) translateY(#{@_y}px) translateZ(#{@_z}px)"
            return

        toString:->
            "[object DOMLink3d]"

        toJSON:->
            x:@getX()
            y:@getY()
            z:@getZ()
            order:@getOrder()
            width:@getWidth()
            height:@getHeight()
            rotationX:@getRotationX()
            rotationY:@getRotationY()
            rotationZ:@getRotationZ()
