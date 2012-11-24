### coordinates.links.Link ###

define (require)->

    BaseClass = require("../utils/BaseClass")

    class Link extends BaseClass

        constructor:(element,x=0,y=0,rotation=0,width=1,height=1)->

            @initConfig(element:element,x:x,
            y:y,rotation:rotation,width:width,height:height,order:0)

            if  element.width then @setWidth element.width
            if  element.height  then @setHeight element.height

        toString:->
            "[object Link]"