define (require)->
    
    BaseClass = require "../../utils/BaseClass"

    class Link3d extends BaseClass
        ### represent a 3D object ###

        constructor:(link,x=0,y=0,z=0,width=1,height=1,depth=1,order=0,jitterX=0,jitterY=0,jitterZ=0,rotationX=0,rotationY=0,rotationZ=0)->

            this.initConfig({link,x,y,z,width,height,depth,order,jitterX,jitterY,jitterZ,rotationX,rotationY,rotationZ})

        toJSON:->
            ### return an object ###
            x:@_x
            y:@_y
            z:@_z
            order:@_order
            width:@_width
            height:@_height
            depth:@_depth
            jitterX:@_jitterX
            jitterY:@_jitterZ
            jitterZ:@_jitterZ

        toString:->
            ### return a string ###
            "[object Link3d]" 
