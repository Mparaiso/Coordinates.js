define (require)->
    Node = require ("../Node")
    class Node2d extends Node

        constructor:(link=null,x=0,y=0,jitterX=0,jitterY=0)->
            super(link)
            rotation=0

            @getX=->x

            @setX=(value)->x=value

            @getY=->y

            @setY=(value)->y=value

            @getJitterX=->jitterX

            @setJitterX=(value)->jitterX=Math.random()*value*((Math.random()>0.5)?-1:1)

            @getJitterY=->jitterY

            @setJitterY=(value)->jitterY=Math.random()*value*((Math.random()>0.5)?-1:1)

            @getRotation=->rotation

            @setRotation=(value)->rotation=value

            @setJitterX(jitterX)
            @setJitterY(jitterY)

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
            "[object Node2d]"
