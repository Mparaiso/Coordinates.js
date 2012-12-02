define (require)->
    Layout:require("./Layout")
    twodee:
        Layout2d:require("./twodee/Layout2d")
        VerticalLine:require("./twodee/VerticalLine")
        HorizontalLine:require("./twodee/HorizontalLine")
        Ellipse:require("./twodee/Ellipse")
        Wave:require("./twodee/Wave")
        Stack:require("./twodee/Stack")
        Spiral:require("./twodee/Spiral")
        Grid: require "./twodee/Grid"
        Scatter:require "./twodee/Scatter"
        Flow: require "./twodee/Flow"
        Lattice: require "./twodee/Lattice"
        Quadric: require './twodee/Quadric'
    threedee:
        Layout3d: require "./threedee/Layout3d"