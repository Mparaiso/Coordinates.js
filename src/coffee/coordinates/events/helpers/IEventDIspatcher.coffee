define (require)->
    class IEventDispatcher
        addEventListener:(type,listener)->
        dispatchEvent:(event)->
        hasEventListener:(type)->
        removeEventLisnter:(type,listener)->
        willTrigger:(type)->