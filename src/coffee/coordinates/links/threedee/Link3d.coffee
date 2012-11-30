define (require)->
    
    BaseClass = require "../../utils/BaseClass"

    class Link3d extends BaseClass
        ### represent a 3D object ###

        constructor:(link,x=0,y=0,z=0,width=1,height=1,depth=1,jitterX=0,jitterY=0,jitterZ=0,rotationX=0,rotationY=0,rotationZ=0)->

            this.initConfig(link:link,x:x,y:y,z:z,width:width,height:height,depth:depth,jitterX:jitterX,jitterY:jitterY,jitterZ:jitterZ,rotationX:rotationX,rotationY:rotationY,rotationZ:rotationZ)

        toJSON:->
            ### return an object ###
            x:x
            y:y
            z:z
            width:width
            height:height
            depth:depth
            jitterX:jitterX
            jitterY:jitterZ
            jitterZ:jitterZ

        toString:->
            ### return a string ###
            "[object Link3d]" 
