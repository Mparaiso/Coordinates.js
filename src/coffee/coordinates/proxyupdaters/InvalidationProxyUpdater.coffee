define (require)->

    BaseClass = require "../utils/BaseClass"

    class InvalidationProxyUpdater extends BaseClass

        constructor:(target,layout)->
            ### Performs a potentially more efficent method of rendering items on a stage by using 
         * <em>stage.invalidate()</em> when the specified layout is modified.
         *  ###
            super()
            @initConfig(target:target,layout:layout)

            @_target.addEventListener(Event.ADDED_TO_STAGE,@addedToStageHandler)
            @_layout.setProxyUpdater this


        update:->
            if not @_target.stage
                return @_layout.update()

            @_target.stage.addEventListener(Event.RENDER,-> @renderHandler())
            @_target.stage.invalidate()

        renderHandler:->
            @_target.stage.removeEventListener(Event.RENDER,renderHandler)
            @_layout.updateAndRander()

        addToStageHandler:(event)->
            @update()



