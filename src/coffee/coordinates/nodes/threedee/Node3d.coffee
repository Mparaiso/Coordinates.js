define (require)->

    BaseClass  = require "../../utils/BaseClass"
    
    class Node3d extends BaseClass

        ### represent a 3D node ###

        constructor:(link,x=0,y=0,z=0,jitterX=0,jitterY=0,jitterZ=0)->

            this.initConfig(link:link,x:x,y:y,z:z,jitterX:jitterX,jitterY:jitterY,jitterZ:jitterZ,rotationX:0,rotationY:0,rotationZ:0)

        setJitterX:(v)->
            @_jitterX = this.getRandom(v)

        setJitterY:(v)->
            @_jitterY = this.getRandom(v)

        setJitterZ:(v)->
            @_jitterZ = this.getRandom(v)

        toJSON:->
            ### return a hash ###
            x:@_x
            y:@_y
            z:@_z
            jitterX:@_jitterX
            jitterY:@_jitterZ
            jitterZ:@_jitterZ
            rotationX:@_rotationX
            rotationY:@_rotationY
            rotationZ:@_rotationZ

        clone:->
            ### clone le noeud ###
            n = new Node3d(@_x,@_y,@_z,@_jitterX,@_jitterY,@_jitterZ)
            n.setRotationX @_rotationX
            n.setRotationY @_rotationY
            n.setRotationZ @_rotationZ
            return n

        toString:->
            ### return a string ###
            "[object Link3d]" 

        getRandom:(v)->
            ### random ###
            if ( Math.random()*v* Math.random() ) > 0.5 then -1 else 1 


