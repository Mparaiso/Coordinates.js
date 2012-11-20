define (require)->

    Layout = require("../Layout")
    LayoutUpdateMethod = require("../../constants/LayoutUpdateMethod")

    class Layout2d extends Layout

        constructor:(x=0,y=0,jitterX=0,jitterY=0,width=0,height=0,rotation=0)->
            super()

            @setUpdateMethod(LayoutUpdateMethod.UPDATE_AND_RENDER)

            @initConfig({x:x,y:y,width:width,height:height,rotation:rotation,jitterX:jitterX,jitterY:jitterY},->@updateFunction())

        getUpdateMethod: -> @_updateMethod

        setUpdateMethod:(v)->
            ### 
                Specifies whether layout properties (x, y, width, height, etc.) adjust the layout automatically without calling apply() method.
                An alternative method for updating layouts is to define a proxy updater using the proxyUpdater property
            ###
            @_updateMethod=v
            switch v
                when LayoutUpdateMethod.NONE
                    @updateFunction = ->
                when LayoutUpdateMethod.UPDATE_ONLY
                    @updateFunction = @update
                else
                    @updateFunction = @updateAndRender


        getProxyUpdater:-> @_proxyUpdater

        setProxyUpdater=(v)->
            ###
                Sets a proxy update method for altering layouts as opposed to internal update methods such as update(), render() or updateAndRender()
                This allows more customization for the updating sequence. 
            ###
            @setUpdateMethod(v.name)
            @updateFunction= v.update
            @_proxyUpdater = v

        addToLayout:(link,moveToCoordinates)->
            ### Adds object to layout in next available position.  ###
            throw 'Method must be overriden by child class'

        removeNode:(node)->
            ### Removes specified cell and its link from layout organizer and adjusts layout appropriately ###
            super.removeNode(node)
            @updateFunction()
            @dispatchEvent(new CoordyNodeEvent(CoordyNodeEvent::REMOVE,node))
            return 

        executeUpdateMethod:->
            ### 
                Performs the update method defined by the <em>updateMethod</em> property. Is helpful for behaviors and proxy updaters to work within the defined functiality set at runtime.
            ###
            @updateFunction()

        update:->
            ###  
                Updates the nodes virtual coordinates. <strong>Note</strong> - this method does not update the actual objects linked to the layout.
            ###
            console.log('update',this)


        render:->
            ### Renders all layout property values to all objects in the collection ###
            for node in @nodes
                @renderNode(node) unless node.getLink() == null
                # l = n.getLink()
                # l.setX(n.getX())
                # l.setY(n.getY())

        updateAndRender:->
            ### Performs an update on all the nodes' positions and renders each node's corresponding link ###
            console.log('updateAndRender',this)
            @update()
            @render()

        clone:->
            ### Clones the current object's properties (does not include links to DisplayDynamics) ###
            throw  'Method must be overriden by child class';

        renderNode:(node)->
            ### Renders all layout property values of a specified node ###
            node.getLink().setX(node.getX())
            node.getLink().setY(node.getY())

        validateObject:(obj)->
            ### Determines if an object added to the layout contains the properties/methods required from the layout. ###
            return true

        toString:->
            ### toString ###
            "[object Layout2d]"

