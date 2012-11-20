### coordinates.links.Link ###

define (require)->

    BaseClass = require("../utils/BaseClass")

    class Link extends BaseClass

        constructor:(element,x=0,y=0,rotation=0,width=0,height=0)->

            @initConfig(element:element,x:x,
            y:y,rotation:rotation,width:width,height:height)

        toString:->
            "[object Link]"