define (require)->

    BaseClass = require "../../utils/BaseClass"
    
    class DOMLink3d extends BaseClass

        constructor:(element,x=0,y=0,z=0,rotation=0,rotationX=0,rotationY=0,rotationZ=0)->
            @initConfig({element,x,y,z,rotation,rotationX,rotationY,rotationZ},->@update())
            # @getElement().style.position = "absolute"

        setWidth:(v)->
            @_element.style.width = "#{v}px"
            @update()
            return

        setHeight:(v)->
            @_element.style.height= "#{v}px"
            @update()
            return

        getRotation:(v)->
            @_rotation

        setRotation:(v)->
            @_rotation = parseInt(v,10)
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
            @_order #||  parseInt(@_element.style.zIndex,10)

        update:->
            ### @note @javascript @css placer rotation après toute translation ou les des éffets indésirables se produiront###
            if @_element == "undefined" then return
            @_element.style.zIndex = @getOrder() # || 0
            for transform in ['webkitTransform','oTransform','msTransform','mozTransform','transform']
                @getElement().style[transform] = "translateX(#{@_x}px) translateY(#{@_y}px) translateZ(-#{@_z}px) rotate(#{@_rotation}deg) rotateX(#{@_rotationX}deg) rotateY(#{@_rotationY}deg) rotateZ(#{@_rotationZ}deg) "
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
            rotation:@getRotation()
            rotationX:@getRotationX()
            rotationY:@getRotationY()
            rotationZ:@getRotationZ()
