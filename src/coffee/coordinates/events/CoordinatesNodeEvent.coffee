### coordinates.events.CoordinateNodeEvent ###
define (require)->

    Event = require("./helpers/Event")

    class CoordinateNodeEvent extends Event

        ADD:"coordyNodeAdd"
        REMOVE:"coordyNodeRemove"

        constructor:(type,@node,bubbles=false,cancelable=false)->
            super(type,bubbles,cancelable)
        clone:->
            new CoordinateNodeEvent(@type,@node,@bubbles,@cancelable)
