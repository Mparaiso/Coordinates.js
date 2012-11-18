### coordinates.links.Link ###

define (require)->

    class Link

        constructor:(x=0,y=0,rotation=0)->
            @getX=->x
            @setX=(value)->x=value
            @getY=->y
            @setY=(value)->y=value
            @getRotation=->rotation
            @setRotatation=(value)->rotation=value

        toString:->
            "[object Link]"