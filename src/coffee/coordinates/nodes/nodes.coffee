define (require)->
    Node:require("./Node")
    twodee:require("./twodee/twodee")
    threedee:
        Node3d: require "./threedee/Node3d"
        OrderedNode3d: require "./threedee/OrderedNode3d"