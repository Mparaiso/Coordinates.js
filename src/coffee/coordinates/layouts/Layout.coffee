define (require)->

    EventDispatcher = require("../events/helpers/EventDispatcher")

    class Layout extends EventDispatcher

        constructor:->
            super()
            @size=0
            @nodes=null

        toString:->
            "[object Layout]"


        toJSON:->
            ###  Serializes the layout data of each node as a JSON string. Includes the 'type', 'size' and 'nodes' properties. ###
            
            nodes = @nodes[i].toObject() for i in [0...@size]

            type:@toString()
            size:@size
            nodes:nodes


        addToLayout:(object,moveToCoordinates)->
            throw 'Method must be overriden by child class'

        addNode:(object,moveToCoordinates)->
            throw 'Method must be overriden by child class'
        
        addNodes:(count)->
            ### Adds a specified number of empty nodes to the layout ###
            @addNode() for i in [0...count]