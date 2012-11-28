define (require)->
    
    require "vendor/backbone-min"

    class ImageModel extends Backbone.Model
        ### contient les données d'un ImageVIew ###
        defaults:
            src:""


            