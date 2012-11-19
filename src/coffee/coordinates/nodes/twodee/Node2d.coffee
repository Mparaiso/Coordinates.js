define (require)->
    Node = require ("../Node")

    class Node2d extends Node

        constructor:(link=null,x=0,y=0,jitterX=0,jitterY=0)->
            super(link)
            @initConfig(rotation:0,x:x,y:y,
            jitterX:jitterX,jitterY:jitterY)

        setJitterX:(value)->
            #
            @_jitterX=Math.random()*value*( if Math.random()>0.5 then -1 else 1)


        setJitterY:(value)->
            #
            @_jitterY=Math.random()*value*(if Math.random()>0.5 then -1 else 1)

        clone:->
            n = new Node2d(@getLink(),@getX(),@getY(),@getJitterX(),@getJitterY)
            n.setRotation(@getRotation())
            return n

        toObject:->
            x:@getX()
            y:@getY()
            jitterX:@getJitterX()
            jitterY:@getJitterY()
            rotation:@getRotation()

        toString:->
            #
            "[object Node2d]"
