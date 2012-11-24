define (require)->

    ###@TODO implementer les méthodes manquantes ###
    
    Layout2d = require "./Layout2d"
    GridLayoutDirection = require "../../constants/GridLayoutDirection"
    NodeEvent = require "../../events/NodeEvent"
    GridNode = require "../../nodes/twodee/GridNode"

    class Grid extends Layout2d

        constructor:(width,height,x=0,y=0,columns,rows,hPadding=0,vPadding=0,hDirection = GridLayoutDirection.LEFT_TO_RIGHT, vDirection = GridLayoutDirection.TOP_TO_BOTTOM,jitterX=0,jitterY=0)->
            ### Distributes nodes in a grid. ###
            super(x,y,jitterX,jitterY,width,height)
            @initConfig({columns:columns,rows:rows,hPadding:hPadding,vPadding:vPadding,hDirection:hDirection,vDirection:vDirection},->@updateFunction)

        setColumns:(v)->
            @_columns = v
            @_maxNodes = @_columns * @_rows 
            @updateFunction()

        setRows:(v)->
            @_rows = v
            @_maxNodes =  @_columns  * @_rows
            @updateFunction()

        addNode:(link,moveToCoordinates=true)->
            if @linkExists(link) || @size > @_maxNodes then return
            d = @calculateCellSize()
            c = @size % @_columns
            r = Math.floor(@size / ( @_maxNodes / @_rows ))
            node = new GridNode(link,c,r, d.width*c+c*@_hPadding+@_x , d.height*r+r*@_vPadding+@_y )
            @storeNode node
            if moveToCoordinates 
                link.setX node.getX() 
                link.setY node.getY()

            @dispatchEvent(new NodeEvent(NodeEvent::ADD,node))

            return node

        toString:->
            "[object Grid]"

        getColumn:(column)->
            ### Get cell objects by column index ###
            @nodes[(i*@_columns)+column] for node,i in @nodes

        getRow:(row)->
            ### Get cell objects by row index ###            
            @nodes[i] for i in [(row*@_columns)...(row*@_columns+@_columns)]

        update:->
            unless @nodes.length <= 0
                total = @_columns * @_rows
                d = @calculateCellSize()
                for node,i in @nodes
                    if not node then break
                    c = i%@_columns
                    r = Math.floor(i/ ( total / @_rows))
                    if @_hDirection == GridLayoutDirection.RIGHT_TO_LEFT then c = (@_columns-1)-c
                    if @_vDirection == GridLayoutDirection.BOTTOM_TO_TOP then r = (@_rows - 1 ) -r

                    node.setX = d.width*c + c*@_hPadding + @_x
                    node.setY = d.height*r + r*@_vPadding + @_y
            return

        calculateCellSize:->
            x:0
            y:0
            width: (@_width-((@_columns-1)*@_hPadding)) / @_columns 
            height: (@_height - ((@_rows - 1)* @_vPadding)) / @_rows