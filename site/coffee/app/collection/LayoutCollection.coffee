define (require)->

    require "vendor/backbone-min"
    ES5shims = require "coordinates/utils/ES5shims"
    LayoutModel = require "app/model/LayoutModel"
    Coordinates = require "coordinates/coordinates"

    class LayoutCollection extends Backbone.Collection
        ###
            FR : collection de LayoutModels
        ###

        model : LayoutModel

        initialize:(models)->
            ### crée les layouts à partir de la collection de layoutModel ###
            for model in models
                model.instance = Coordinates.createLayout(model.type.toString(),model.options)
                model.instance.setUpdateMethod(Coordinates.LayoutUpdateMethod.UPDATE_ONLY)
            return 

        getNextLayout:(layoutModel)->
            ###
                FR : retourne le prochain layout ou bien le premier si layoutModel est indéfini
            ###
            currentLayoutIndex = this.indexOf(layoutModel)
            return this.at(currentLayoutIndex+1) || this.first()

        getPreviousLayout:(layoutModel)->
            ###
                FR : retourn le layout précédent
            ###
            currentLayoutIndex = this.indexOf(layoutModel)
            return this.at(currentLayoutIndex-1) || this.last()

