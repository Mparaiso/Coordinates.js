define (require)->

    LayoutModel = require "app/model/LayoutModel"
    Coordinates = require "coordinates/coordinates"
    Coordinates = require "coordinates/coordinates"

    class LayoutCollection extends Backbone.Collection

        model : LayoutModel

        initialize:(models)->
            ### crée les layouts à partir de la collection de layoutModel ###
            for model in models
                model.instance = Coordinates.createLayout(model.type.toString(),model.options)
                model.instance.setUpdateMethod(Coordinates.LayoutUpdateMethod.UPDATE_ONLY)
            return 