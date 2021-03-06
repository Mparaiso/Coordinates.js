define (require)->
    
    Coordinates = 
        events:require("./events/events")
        nodes:require("./nodes/nodes")
        links:require("./links/links")
        layouts:require("./layouts/layouts")
        helpers:require("./helpers/helpers")
        utils:require("./utils/utils")
        constants:require("./constants/constants")

    ### shortcuts ###
    Coordinates.DOMLink2d = Coordinates.links.DOMLink2d
    Coordinates.DOMLink3d = Coordinates.links.threedee.DOMLink3d
    Coordinates.Link=Coordinates.links.Link
    Coordinates.Link3d = Coordinates.links.threedee.Link3d
    Coordinates.Node=Coordinates.nodes.Node
    Coordinates.Node2d=Coordinates.nodes.twodee.Node2d
    Coordinates.OrderedNode3d = Coordinates.nodes.threedee.OrderedNode3d
    Coordinates.Scatternode3d = Coordinates.nodes.threedee.Scatternode3d
    Coordinates.Layout = Coordinates.layouts.Layout
    Coordinates.Layout2d = Coordinates.layouts.twodee.Layout2d
    Coordinates.Layout3d = Coordinates.layouts.threedee.Layout3d

    Coordinates.VerticalLine = Coordinates.layouts.twodee.VerticalLine
    Coordinates.HorizontalLine = Coordinates.layouts.twodee.HorizontalLine
    Coordinates.Ellipse = Coordinates.layouts.twodee.Ellipse
    Coordinates.BaseClass = Coordinates.utils.BaseClass
    Coordinates.NodeEvent = Coordinates.events.NodeEvent
    Coordinates.Wave = Coordinates.layouts.twodee.Wave
    Coordinates.Stack = Coordinates.layouts.twodee.Stack
    Coordinates.Spiral = Coordinates.layouts.twodee.Spiral
    Coordinates.Flow = Coordinates.layouts.twodee.Flow
    Coordinates.Grid = Coordinates.layouts.twodee.Grid
    Coordinates.Scatter = Coordinates.layouts.twodee.Scatter
    Coordinates.Lattice = Coordinates.layouts.twodee.Lattice
    Coordinates.Quadric = Coordinates.layouts.twodee.Quadric

    Coordinates.Stack3d = Coordinates.layouts.threedee.Stack3d
    Coordinates.Scatter3d = Coordinates.layouts.threedee.Scatter3d
    Coordinates.LayoutTransitioner = Coordinates.utils.LayoutTransitioner
    Coordinates.LayoutUpdateMethod = Coordinates.constants.LayoutUpdateMethod
    Coordinates.FlowOverflowPolicy = Coordinates.constants.FlowOverflowPolicy
    Coordinates.FlowDirection = Coordinates.constants.FlowDirection
    Coordinates.FlowAlignment = Coordinates.constants.FlowAlignment
    Coordinates.StackOrder = Coordinates.constants.StackOrder
    Coordinates.LatticeAlternationPattern = Coordinates.constants.LatticeAlternationPattern
    Coordinates.LatticeOrder = Coordinates.constants.LatticeOrder
    Coordinates.LatticeType = Coordinates.constants.LatticeType
    Coordinates.LayoutType = Coordinates.constants.LayoutType

    ###
        FACADE : 
            EN : some methods to facilitate work with layouts
            FR : une série de méthodes pour faciliter le travail avec les layouts
    ###

    ### @todo ###

    Coordinates.createDOMLink2d=(domElements)->
        ### creates and returns a or several DOMLink2d ###
        if toString.call(domElements) is "[object Array]"
            for element in domElements
                new Coordinates.DOMLink2d(element)
        else
            new Coordinates.DOMLink2d(domElements)

    Coordinates.createDOMLink3d=(domElements)->
        if toString.call(domElements) is "[object Array]" 
            for element in domElements
                new Coordinates.DOMLink3d(element)
        else
                new coordinates.DOMLink3d(domElements)

    # Coordinates.createLinks()
    # Coordinates.tweenLayouts(layout1,layout2,duration)
    # Coordinates.cloneLayout(layout2)

    Coordinates.addLinksTolayout=(links,layout)->
        ### 
            add links to layout 
            @return layout
        ###
        for own link in links
            layout.addNode(link)
        return layout

    Coordinates.createDomLinks = (domElements)->
        return new Coordinates.DOMLink3d(element) for element in domElements if toString.call(domElements) is "[object Array]"
        return new Coordinates.DOMLink3d(domElements)

    Coordinates.createLayout = (type,options,links)->
        ###
            helper method to create layouts
            @param root HTMLElement the root element from which the children elements will be associated with the layout
        ###
        type = type.capitalize()
        ### instancier un layout suivant son type (factory) ###
        layout = do ->
            switch type
                when Coordinates.LayoutType.ELLIPSE
                    {width,height,x,y,rotation,jitterX,jitterY,alignType,alignAngleOffset}=options
                    new Coordinates.Ellipse(width,height,x,y,rotation,jitterX,jitterY)

                when Coordinates.LayoutType.SPIRAL
                    {circumference, x, y, spiralConstant, angleDelta, rotation, jitterX, jitterY, alignType, alignOffset} = options
                    new Coordinates.Spiral(circumference, x, y, spiralConstant, angleDelta, rotation, jitterX, jitterY, alignType, alignOffset)

                when Coordinates.LayoutType.FLOW
                    {width, height, x, y, hPadding, vPadding} = options
                    new Coordinates.Flow(width, height, x, y, hPadding, vPadding)

                when Coordinates.LayoutType.GRID
                    {width, height, x, y, columns, rows, hPadding, vPadding, hDirection, vDirection, jitterX, jitterY} = options
                    new Coordinates.Grid(width,height,x,y, columns, rows, hPadding, vPadding, hDirection, vDirection, jitterX, jitterY)

                when Coordinates.LayoutType.HORIZONTAL_LINE
                    {hPadding, x, y, jitterX, jitterY} = options
                    new Coordinates.HorizontalLine(hPadding, x, y, jitterX, jitterY)

                when Coordinates.LayoutType.LATTICE
                     {width,height,x, y, columns, rows, allowOverFlow, order, hPadding, vPadding, jitterX, jitterY}=options
                     new Coordinates.Lattice(width,height,x, y, columns, rows, allowOverFlow, order, hPadding, vPadding, jitterX, jitterY)

                when Coordinates.LayoutType.SCATTER
                    {width,height,x,y,jitter,jitterRotation} = options
                    new Coordinates.Scatter(width,height,x,y,jitter,jitterRotation)

                when Coordinates.LayoutType.QUADRIC
                    {x,y,x1,y1,x2,y2,x3,y3,x4,y4,jitterX,jitterY} = options
                    new Coordinates.Quadric(x,y,x1,y1,x2,y2,x3,y3,x4,y4,jitterX,jitterY)
                    
                when Coordinates.LayoutType.STACK
                    {angle,offset,x,y,order,jitterX,jitterY}=options
                    new Coordinates.Stack(angle,offset,x,y,order,jitterX,jitterY)

                when Coordinates.LayoutType.VERTICAL_LINE
                    {vPadding,x,y,jitterX,jitterY} = options
                    new Coordinates.VerticalLine(vPadding, x, y, jitterX, jitterY)

                when Coordinates.LayoutType.WAVE
                    {width, height, x, y, frequency, waveFunction, jitterX, jitterY, alignType, alignOffset} = options
                    new Coordinates.Wave(width, height, x, y, frequency, waveFunction, jitterX, jitterY, alignType, alignOffset)

                    ### threedee ###

                when Coordinates.LayoutType.STACK_3D
                    {angle,offset,zOffset,x,y,z,order,jitterX,jitterY,jitterZ} = options
                    new Coordinates.Stack3d(angle,offset,zOffset,x,y,z,order,jitterX,jitterY,jitterZ)

                when Coordinates.LayoutType.SCATTER_3D
                    {width,height,depth,jitter,x,y,z,jitterRotation} = options
                    new Coordinates.Scatter3d(width,height,depth,jitter,x,y,z,jitterRotation)

        ### if links , then add nodes ###
        if links then layout.addNodes(links)
        ### return layout ###
        return layout

    Coordinates.createDomLayout = (type,options,root,autoUpdate=true)->
        ###
            helper method to create layouts , and create dom links from a root element
            @param type layout type
            @param options layout parameters
            @param root HTMLElement the root element from which the children elements will be associated with the layout
            @param autoUpdate autoupdate layout when a HTMLElement is added or removed from the root element
        ###
        layout = Coordinates.createLayout(type,options)
        unless autoUpdate
            layout.setUpdateMethod Coordinates.LayoutUpdateMethod.UPDATE_ONLY
        Coordinates.addLinksTolayout(root.childNodes)
        return layout

                

    ### export coordinates ###
    return Coordinates
