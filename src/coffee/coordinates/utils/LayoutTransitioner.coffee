define (require)->

    BaseClass = require("./BaseClass")

    class LayoutTransitioner extends  BaseClass

        constructor:(tweenFunction,layout)->
            @initConfig({tweenFunction:tweenFunction,layout:layout})

        syncNodesTo:(layout=null)->

            if layout
                @setLayout(layout)

            if @getTweenFunction()==null
                @getLayout().updateAndRender()
            else
                for node in @getLayout().nodes
                    @getTweenFunction()(node)


