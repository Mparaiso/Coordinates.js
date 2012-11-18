### coordinates.events.helpers ###
define (require)->
    Event = require("./Event")
    EventDispatcher =require("./EventDispatcher")
    EventPhase = require("./EventPhase")
    IEventDispatcher = require("./IEventDispatcher")

    Event:Event
    EventDispatcher:EventDispatcher
    EventPhase:EventPhase
    IEventDispatcher:IEventDispatcher