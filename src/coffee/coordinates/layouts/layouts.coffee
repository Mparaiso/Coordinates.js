define (require)->
    Layout:require("./Layout")
    twodee:
        Layout2d:require("./twodee/Layout2d")
        VerticalLine:require("./twodee/VerticalLine")
        HorizontalLine:require("./twodee/HorizontalLine")
        Ellipse:require("./twodee/Ellipse")
        Wave:require("./twodee/Wave")