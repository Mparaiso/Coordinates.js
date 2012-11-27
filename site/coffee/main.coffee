define (require)->
    require "vendor/jquery.min.js"
    require "vendor/underscore-min.js"
    require "vendor/backbone-min.js"
    Main = 
        Services:
            Flickr: require "js/services/flickr"

    return Main

