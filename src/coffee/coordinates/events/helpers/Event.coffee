define (require)->
    EventPhase = require ("./EventPhase")

    class Event

        constructor:(@type,@bubbles=false,@cancelable=false)->
            @type || throw "#{this} type is not defined!"
            @_isCancelled = false
            @_isCancelledNow = false
            @target = null
            @currentTarget = null
            eventPhase = EventPhase.AT_TARGET
            ### Getters and Setters ###
            @setEventPhase =(phase)=>
                return eventPhase = phase
            @getEventPhase=()=>
                return eventPhase

        clone:->
            return new Event(@type,@bubbles,@cancelable)

        stopImmediatePropagation:->
            @_isCancelled = @_isCancelledNow = true
            return

        stopPropagation:->
            @_isCancelled = true
            return

        toString:->
            return "[object Event #{@type}]"

        createSimilar:(type,related,targ)->
            result = new Event(@type,@bubbles,@cancelable)
            if targ then result.target = targ
            return result 
