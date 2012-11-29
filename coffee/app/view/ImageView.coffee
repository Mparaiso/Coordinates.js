define (require)->

    require "vendor/jquery.min"
    require "vendor/backbone-min"

    class ImageView extends Backbone.View
        ### affiche les images issues du service utilisé ###

        attributes:
            "data-type": "thumbnail"

        events:
            "load": "imageLoaded"
            "mouseover": "mouseover"
            "mouseout": "mouseout"

        initialize:(params)->
            @model.on("change",@render,this)

        imageLoaded:(event)->
            @$el.css({opacity:1})

        mouseover:->
            @$el.css({width:"60px",height:"60px"})
            return

        mouseout:->
            @$el.css({width:"50px",height:"50px"})
            return

        load:(src)->
            @$el.attr("src",null)
            @$el.css({opacity:0.2})
            @$el.attr("src",src)

        render:->
            @$el.attr('src',@model.get("url"))





      




