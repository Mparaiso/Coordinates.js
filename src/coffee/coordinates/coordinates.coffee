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
    Coordinates.Link=Coordinates.links.Link
    Coordinates.Node=Coordinates.nodes.Node
    Coordinates.Node2d=Coordinates.nodes.twodee.Node2d
    Coordinates.Layout = Coordinates.layouts.Layout
    Coordinates.Layout2d = Coordinates.layouts.twodee.Layout2d
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

    ### @todo ###

    # Coordinates.createDomLinks()
    # Coordinates.createLinks()
    # Coordinates.tweenLayouts(layout1,layout2,duration)
    # Coordinates.cloneLayout(layout2)
    # Coordinates.addLinksTolayout(links,layout) 

    Coordinates.createDomLinks = (domElements)->
        return new Coordinates.DOMLink2d(element) for element in domElements 

    Coordinates.createLayout = (type,options,links=null)->
        ### helper method to create layouts ###
        type = type.capitalize()
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
                # when Coordinates.LayoutType.LATTICE
                # when Coordinates.LayoutType.SCATTER
                # when Coordinates.LayoutType.SNAPSHOT
                # when Coordinates.LayoutType.STACK
                # when Coordinates.LayoutType.VERTICAL_LINE
                when Coordinates.LayoutType.WAVE
                    {width, height, x, y, frequency, waveFunction, jitterX, jitterY, alignType, alignOffset} = options
                    new Coordinates.Wave(width, height, x, y, frequency, waveFunction, jitterX, jitterY, alignType, alignOffset)
        ### if links , then add nodes ###
        if links then layout.addNodes(links)
        ### return layout ###
        return layout



                
                    

                
            
        

    
    return Coordinates
