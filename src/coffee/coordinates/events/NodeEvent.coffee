### coordinates.events.CoordinateNodeEvent ###
define (require)->

    Event = require("./helpers/Event")

    class NodeEvent extends Event

        ADD:"coordyNodeAdd"
        REMOVE:"coordyNodeRemove"

        constructor:(type,@node,bubbles=false,cancelable=false)->
            super(type,bubbles,cancelable)
        clone:->
            new NodeEvent(@type,@node,@bubbles,@cancelable)
