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

    Coordinates.LayoutTransitioner = Coordinates.utils.LayoutTransitioner
    Coordinates.LayoutUpdateMethod = Coordinates.constants.LayoutUpdateMethod
    Coordinates.FlowOverflowPolicy = Coordinates.constants.FlowOverflowPolicy
    Coordinates.FlowDirection = Coordinates.constants.FlowDirection
    Coordinates.FlowAlignment = Coordinates.constants.FlowAlignment
    Coordinates.StackOrder = Coordinates.constants.StackOrder
    
    return Coordinates
