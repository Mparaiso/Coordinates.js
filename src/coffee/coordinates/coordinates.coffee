define (require)->
    
    Coordinates = 
        events:require("./events/events")
        nodes:require("./nodes/nodes")
        links:require("./links/links")
        layouts:require("./layouts/layouts")
        helpers:require("./helpers/helpers")
        utils:require("./utils/utils")

    ### shortcuts ###
    Coordinates.DOMLink2d = Coordinates.links.DOMLink2d
    Coordinates.Link=Coordinates.links.Link
    Coordinates.Node=Coordinates.nodes.Node
    Coordinates.Node2d=Coordinates.nodes.twodee.Node2d
    Coordinates.Layout = Coordinates.layouts.Layout
    Coordinates.Layout2d = Coordinates.layouts.twodee.Layout2d
    Coordinates.VerticalLine = Coordinates.layouts.twodee.VerticalLine
    Coordinates.BaseClass = Coordinates.utils.BaseClass

    return Coordinates
