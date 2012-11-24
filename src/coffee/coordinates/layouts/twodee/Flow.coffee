define (require)->

    Layout2d = require "./Layout2d"
    NodeEvent = require "../../events/NodeEvent"
    FlowNode = require "../../nodes/twodee/FlowNode"
    FlowOverflowPolicy = require "../../constants/FlowOverflowPolicy"
    FlowAlignment = require "../../constants/FlowAlignment"
    FlowDirection = require "../../constants/FlowDirection"

    class Flow extends Layout2d

        constructor:(width,height,x=0,y=0,hPadding=0,vPadding=0)->
            super(x,y,0,0,width,height)
            @initConfig(hPadding:hPadding,vPadding:vPadding,overFlowPolicy:FlowOverflowPolicy.ALLOW_OVERFLOW, alignment:FlowAlignment.TOP_LEFT, horizontalAlign:"top",verticalAlign:"left",placementDirection:FlowDirection.HORIZONTAL,->@updateFunction())

        addNode:(link=null,moveToCoordinates=true)->
            ### Adds object to layout in next available position. ###
            if @linkExists(link) then return null
            node = new FlowNode(link,0,0)
            @storeNode(node)
            @update()
            if moveToCoordinates then @render()
            @dispatchEvent new NodeEvent NodeEvent::ADD,node
            return node

        clone:->
            ### Clones the current object's properties (does not include links to DisplayObjects) ###
            return new Flow(@_width,@_height,@_x,@_y,@_hPadding,@_vPading)

        setAlignment:(v)->
            ### Method in which layout aligns nodes withing the layout's bounds ###
            switch v

                when FlowAlignment.TOP_CENTER
                    @_verticalAlign = "top"
                    @_horizontalAlign = "center"
                when FlowAlignment.TOP_RIGHT
                    @_verticalAlign = "middle"
                    @_horizontalAlign = "right"
                when FlowAlignment.MIDDLE_LEFT
                    @_verticalAlign = "middle"
                    @_horizontalAlign = "left"
                when FlowAlignment.MIDLLE_CENTER
                    @_verticalAlign = "middle"
                    @_horizontalAlign = "center"
                when FlowAlignment.MIDDLE_RIGHT
                    @_verticalAlign = "middle"
                    @_horizontalAlign = "right"
                when FlowAlignment.BOTTOM_LEFT
                    @_verticalAlign = "bottom"
                    @_horizontalAlign ="left"
                when FlowAlignment.BOTTOM_CENTER
                    @_verticalAlign ="bottom"
                    @_horizontalAlign = "center"
                when FlowAlignment.BOTTOM_RIGHT
                    @_verticalAlign = "bottom"
                    @_horizontalAlign = "right"
                else
                    @_verticalAlign = "top"
                    @_horizontalAlign = "left"

            @_alignment = v
            @updateFunction()

        update:->
            ### Updates the nodes' virtual coordinates. <strong>Note</strong> - this method does not updatethe actual objects linked to the layout. ###
            if @nodes?.length <= 0 then return
            if @_placementDirection == FlowDirection.HORIZONTAL then @LayoutChildrenHorizontally(x:@_x,y:@_y,width:@_width,height:@_height) else @layoutChildrenVertically(x:@_x,y:@_y,width:@_width,height:@_height)
            # if @_overflowPolicy == FlowOverflowPolicy.HIDE_OVERFLOW
            #     for node,i in @nodes
            #         # do something

        LayoutChildrenHorizontally:(bounds)->
            START_X = bounds.x 
            yPosition = bounds.y
            xPosition = START_X
            maxChildHeight = 0
            row= []
            for node,i in @nodes
                if not node.getLink() then continue
                link = node.getLink()
                bb = {x:link.getX(),y:link.getY(),width:link.getWidth(),height:link.getHeight()}
                bb.x *= link.getWidth()/bb.width
                bb.y *= link.getHeight()/bb.height
                #next column if we're over the height, but not if we're at yposition == bounds.y
                endOfRow = xPosition + link.getWidth()
                if (endOfRow - bounds.x >= bounds.width ) && xPosition != START_X
                    @alignRow(row,maxChildHeight,bounds)
                    yPosition += maxChildHeight + @_vPadding
                    xPosition = START_X
                    maxChildHeight = 0
                    row=[]
                node.setOutsideBounds if yPosition+link.getHeight()>bounds.height then true else false
                node.setX xPosition-bb.x
                node.setY xPosition-bb.y
                row.push(node)
                maxChildHeight = Math.max(maxChildHeight,link.getHeight())
            @alignRow(row,maxChildHeight,bounds)
            return

        layoutChildrenVertically:(bounds)->
            START_X = bounds.x + 0
            yPosition = bounds.y + 0
            xPosition = START_X
            maxChildHeight = 0
            row = []
            for node,i in @nodes
                if not node.getLink() then continue
                link = node.getLink()
                bb = x:link.getX(),y:link.getY(),width:link.getWidth(),height:link.getHeight()      
                bb.x*=link.getWidth()/bb.width
                bb.y*=link.getHeight()/bb.height
                ### next column if we're over the height, but not if we're at yposition == bounds.y ###
                endOfRow = xPosition + link.getWidth() + 0
                if(endOfRow - bounds.x) >= (bounds.width) && xPosition != START_X
                    # update alignment
                    @alignRow(row,maxChildHeight,bounds)
                    yPosition += maxChildHeight + @_vPadding
                    xPosition = START_X
                    maxChildHeight = 0
                    row = []
                node.setOutSideBounds if yPosition+node.getHeight() > bounds.height then true else false
                node.setX xPosition-bb.x
                node.setY yPosition-bb.y
                row.push node
                maxChildHeight = Math.max(maxChildHeight,link.getHeight())
                xPosition += link.getWidth()+@_hPadding
            @alignRow(row,maxChildHeight,bounds)
            return

        alignColumn:(column,maxChildWidth,bounds)->
            if column.length <= 0 then return
            lastChild = column[column.length-1]
            columnHeight = (lastChild.getY()+lastChild.getLink().getHeight()) - bounds.y 
            difference = bounds.height - columnHeight
            columnCount = column.length
            for i in [0...column.length]
                child=column[i]
                @alignItems(child,{x:child.getX(),y:child.getY(),width:maxChildWidth,height:child.getLink().getHeight()},@_horizontalAlign,null)
                switch @_verticalAlign
                    when "middle"
                        child.setY child.getY()+difference/2
                    when "bottom"
                        child.setY child.getY()+difference
            return
                    
                
        alignRow:(row,maxChildHeight,bounds)->
            if row.length <= 0 then return
            lastChild = row[row.length-1]
            rowWidth = (lastChild.getX()+lastChild.getLink().getWidth()) - bounds.x ;
            difference = bounds.width - rowWidth
            rowCount = row.length 
            for i in [0...rowCount]
                child = row[i]
                @alignItems(child,{x:child.getX(),y:child.getY(),width:child.getLink().getWidth(),height:maxChildHeight},null,@_verticalAlign)
                switch @_horizontalAlign
                    when "center"
                        child.setX child.getX()+difference/2
                    when "right"
                        child.setX child.getX()+difference
            return
                    
        alignItems:(node,bounds,horizontalAlign,verticalAlign)->
            horizontalDifference  = bounds.width - node.getLink().getWidth()
            switch horizontalAlign
                when "left"
                    node.setX bounds.x
                when "center"
                    node.setX bounds.x + horizontalDifference/2
                when "right"
                    node.setX bounds.x + horizontalDifference
            verticalDifference = bounds.height - node.getLink().getHeight()
            switch verticalAlign
                when "top"
                    node.setY bounds.y
                when "middle"
                    node.setY bounds.y+ verticalDifference/2
                when "bottom"
                    node.setY bounds.y+verticalDifference
            return
                
        toString:->
            ### Returns the type of layout in a string format ###
            "[object Flow]"