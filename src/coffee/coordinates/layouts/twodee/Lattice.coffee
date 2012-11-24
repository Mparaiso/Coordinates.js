define (require)->
    
    Layout2d = require "./Layout2d"
    NodeEvent = require "../../events/NodeEvent"
    LatticeOrder = require "../../constants/LatticeOrder"
    LatticeType = require "../../constants/LatticeType"
    LatticeAlternationPattern = require "../../constants/LatticeAlternationPattern"
    GridNode = require "../../nodes/twodee/GridNode"

    class Lattice extends Layout2d
        ###  Distributes nodes in a lattice. ###
        constructor: (width,height,x=0, y=0, columns=1, rows=1, allowOverFlow=true, order=LatticeOrder.ORDER_HORIZONTALLY, hPadding=0, vPadding=0, jitterX=0, jitterY=0) ->

            super(x,y,jitterX,jitterY)
            @initConfig(hPadding:hPadding, vPadding:vPadding, columns:columns, rows:rows, maxCells:columns*rows, allowOverFlow:allowOverFlow, order:order, latticeType:LatticeType.DIAGONAL, alternate:LatticeAlternationPattern.ALTERNATE_HORIZONTALLY,width:width, height:height, ->@updateFunction)

        getWidth:->
            @_columnWidth*@_columns

        setWidth:(v)->
            @_width = v
            @_columnWidth = v / @_columns
            @updateFunction()

        getHeight:->
            @_rowHeight*@_rows

        setHeight:(v)->
            @_height = v
            @_rowHeight  = v/@_rows
            @updateFunction()

        setColumns:(v)->
            if v==0 then throw "columns cannot be equal to 0"
            @_columns = v
            @_order = LatticeOrder.ORDER_HORIZONTALLY
            # @adjustLattice()
            @updateFunction()
            @_maxCells = @_columns*@_rows
            return

        setRows:(v)->
            if v==0 then throw "rows cannot be equal to 0"
            @_rows = v
            @_order = LatticeOrder.ORDER_VERTICALLY
            # @adjustLattice()
            @updateFunction()
            @_maxCells = @_columns*@_rows
            return

        toString:->
            "[object Lattice]"

        addNode:(link,moveToCoordinates=true)->
            if @linkExists(link) then return 
            if not @_allowOverFlow and @size >= @_maxCells then return
            c = if @_order == LatticeOrder.ORDER_VERTICALLY then @size % @_columns else @size % Math.floor(@size/@_rows)
            r = if @_order == LatticeOrder.ORDER_VERTICALLY then Math.floor(@size/@_columns) else @size % @_rows
            node = new GridNode(link,c,r)
            @storeNode(node)
            @adjustLattice()
            @update()

            if moveToCoordinates then @render()

            if @_order == LatticeOrder.ORDER_VERTICALLY then @_columns = Math.ceil(@size/@_rows)
            else if @_order == LatticeOrder.ORDER_VERTICALLY then @_rows = Math.ceil(@size/@_columns)

            @dispatchEvent(new NodeEvent(NodeEvent::ADD,node))

            return node

        update:->
            if @size <= 0 then return
            for node,i in @nodes
                node.setX (node.getColumn()*(@_columnWidth+@_hPadding))+@_x+(node.getJitterX()*@_jitterX)
                node.setY (node.getRow()*(@_rowHeight+@_vPadding))+@_y+(node.getJitterY()*@_jitterY)
                if @_latticeType == LatticeType.DIAGONAL && @_alternate == LatticeAlternationPattern.ALTERNATE_VERTICALLY && node.getRow() % 2
                    node.setX node.getX()+@_columnWidth/2
                else if @_latticeType == LatticeType.DIAGONAL && @_alternate == LatticeAlternationPattern.ALTERNATE_HORIZONTALLY && node.getColumn() % 2  
                    node.setY node.getY() + @_rowHeight / 2
            return

        removeNode:(node)->
            super(node)
            @adjustLattice()
            @updateFunction()

        clone:->
            ### clone layout ###
            return new Lattice(@_width,@_height,@_x,@_y,@_columns,@_rows,@_allowOverFlow,@_order,@_hPadding,@_vPadding,@_jitterX,@_jitterY)

        adjustLattice:->
            if @_order == LatticeOrder.ORDER_HORIZONTALLY
                for node,i in @nodes
                    c = i%@_columns
                    r=Math.floor(i/@_columns)
                    node.setColumn c
                    node.setRow r
            else
                for node,i in @nodes
                    c = Math.floor i/@_rows
                    r = i%@_rows
                    node.setColumn c
                    node.setRow r

            if @_order == LatticeOrder.ORDER_VERTICALLY
                @_columns = Math.ceil @size/@_rows
            else if @_order = LatticeOrder.ORDER_HORIZONTALLY
                @_rows = Math.ceil @size/@_columns
            return
            
        
    