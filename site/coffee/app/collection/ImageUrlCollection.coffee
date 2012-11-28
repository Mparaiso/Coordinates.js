define (require)->
    
    require "vendor/backbone-min"
    Flickr = require "app/service/Flickr"
    ImageUrlModel = require "app/model/ImageUrlModel"

    class ImageUrlCollection extends Backbone.Collection

        model:ImageUrlModel

        _update:->
            # console.log "update",arguments,this

        initialize:->
            @on("all",@_update,this)
            return

        url:->
            Flickr.getFlickApiUrl(text:"art",quantity:30)

        parse:(raw)->
            return raw.photos.photo