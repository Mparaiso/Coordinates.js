define (require)->
    
    Coordinates = 
        events:require("./events/events")
        nodes:require("./nodes/nodes")
        links:require("./links/links")

    ### shortcuts ###
    Coordinates.DOMLink2d = Coordinates.links.DOMLink2d
    Coordinates.Link=Coordinates.links.Link
    Coordinates.Node=Coordinates.nodes.Node
    Coordinates.Node2d=Coordinates.nodes.twodee.Node2d

    return Coordinates
