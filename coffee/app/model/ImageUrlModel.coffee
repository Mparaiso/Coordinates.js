define (require)->

    require "vendor/backbone-min"
    Flickr = require "app/service/Flickr"

    class ImageUrlModel extends Backbone.Model

        defaults:
            "format":"q"

        initialize:(params)->
            @getUrl()

        getUrl:->
            if not @has("url")
                @set "url", Flickr.getImageUrl(@get("farm"),@get("server"),@get("id"),@get("secret"),@get("format"))
            @get("url")


