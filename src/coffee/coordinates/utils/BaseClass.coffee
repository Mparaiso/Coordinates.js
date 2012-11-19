define (require)->
    class BaseClass
        mixins:null
        config:null
        constructor:->
            @initConfig()
            @initMixins()

        initConfig:(config=null)->

        initMixins:(mixins=null)->
            if mixins
                for mixin in mixins
                    for own key,value of mixin
                        if value instanceof Function
                            @[key] = value
            if @mixins
                for mixin in @mixins
                    for own key,value of mixin
                        if value instanceof Function
                            @[key] = value

        createGetter:(property,initialValue)->
            key = "blop"


        capitalize:(word)->
            first = word[...1]
            first = first.toUpper()
            return first+word[1..]