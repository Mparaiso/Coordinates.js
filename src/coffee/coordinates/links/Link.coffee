### coordinates.links.Link ###

define (require)->

    class Link

        constructor:(element,x=0,y=0,rotation=0)->
            Object.defineProperties this,
                x:
                    get:->x
                    set:(v)->x=v
                y:
                    get:->y
                    set:(v)->y=v
                rotation:
                    get:->rotation
                    set:(v)->rotation=v
                element:
                    get:->element
                    set:(v)->element=v

        toString:->
            "[object Link]"