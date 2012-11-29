define (require)->

    require "vendor/backbone-min"
    ES5shims = require "coordinates/utils/ES5shims"
    LayoutModel = require "app/model/LayoutModel"
    Coordinates = require "coordinates/coordinates"

    class LayoutCollection extends Backbone.Collection

        model : LayoutModel

        initialize:(models)->
            ### crée les layouts à partir de la collection de layoutModel ###
            for model in models
                model.instance = Coordinates.createLayout(model.type.toString(),model.options)
                model.instance.setUpdateMethod(Coordinates.LayoutUpdateMethod.UPDATE_ONLY)
            return 