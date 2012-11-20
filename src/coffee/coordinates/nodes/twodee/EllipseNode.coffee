define (require)->

    Node2d = require("./Node2d")

    class EllipseNode extends Node2d

        constructor:(link=null,x=0,y=0,rotation=0,jitterX=0,jitterY=0)->
            ### Node used for Ellipse layout ###
            @initConfig(rotation:rotation)
            super(link,x,y,jitterX,jitterY)

        clone:->
            ### Creates an exact copy of node with link and position properties carried over ###
            new EllipseNode(@getLink(),@getX(),@getY(),
            @getRotation(),@getJitterX(),@getJitterY())