define (require)->

    Link:require("./Link")
    threedee:
        Link3d: require "./threedee/Link3d"
        DOMLink3d:require "./threedee/DOMLink3d"
    DOMLink2d:require("./DOMLink2d")
