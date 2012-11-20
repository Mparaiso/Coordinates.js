define (require)->
    class BaseClass

        ### @TODO implement mixins ###


        initConfig:(config=null,listenerFunction=null)->
            ### set default properties from which getters and setters will be generated ###
            if config
                for own key,value of config
                    @_createGetter(key)
                    @_createSetter(key,value,listenerFunction)
            return


        _createGetter:(property)->
            key = "get"+property.capitalize()
            @[key]?= ->
                @["_"+property]
            return

        _createSetter:(property,val,listenerFunction=null)->
            key = "set"+property.capitalize()
            @[key]?= (value)->
                @["_"+property] = value
                if listenerFunction && listenerFunction instanceof Function
                    listenerFunction.call(this)
            @[key](val)
            return





