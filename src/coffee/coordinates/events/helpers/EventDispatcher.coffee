define (require)->

    EventPhase = require("./EventPhase")
    BaseClass = require("../../utils/BaseClass")
    sIDs = 1

    class Listener

        constructor:(@mListner,@mUseCapture,@mPriority)->
            @mID = sIDs++

        Is:(inListener,inCapture)->
            return @mListner == inListener && @mUseCapture == inCapture

        dispatchEvent:(event)->
            @mListner(event)

    class EventDispatcher extends BaseClass

        constructor:(@_target=this)->
            @_eventMap = []

        _getList:(type)->
            return @_eventMap[type]

        _setList:(type,list)->
            @_eventMap[type] = list

        _existList:(type)->
            @_eventMap[type]?

        _compareListeners:(l1,l2)->
            l1.mPriority < l2.mPriority

        addEventListener:(type,inListener,capture=false,priority=0,useWeakReference=false)->
            list = @_getList(type)
            if not @_existList(type)
                list = []
                @_setList(type,list)
            list.push(new Listener(inListener,capture,priority))
            list.sort(@_compareListeners)
            return 

        dispatchEvent:(event)->
            if not event.target
                event.target = @_target

            capture = event.eventPhase == EventPhase.CAPTURING_PHASE

            if @_existList(event.type)
                list = @_getList(event.type)
                idx = 0
                while idx < list.length
                    listener = list[idx]
                    if listener.mUseCapture == capture
                        listener.dispatchEvent(event)
                        if event._isCancelledNow==true
                            return true
                    ### Detect if the just used event listener was removed... ###
                    if(idx<list.length && listener != list[idx])
                        ### do not advance to next item because it looks like one was just removed ###
                    else
                        idx++
                return true
            else
                return false



        hasEventListener:(type)->
            @_existList(type)

        removeEventListener:(type,listener,capture=false)->
            if !@_existList(type) then return 
            list = @_getList(type)
            for i in [0...list.length]
                if list[i].Is(type,listener)
                    list.splice(i,1)
                    return
                   
        toString:()->
            "[object EventDispatcher]"         

        willTrigger:(type)->
            return @hasEventListener(type)