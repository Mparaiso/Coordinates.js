define (require)->

    require "vendor/backbone-min"
    
    Coordinates = require "coordinates/coordinates"

    class AppConfig extends Backbone.Model

        initialize:(params)->
            @on("change:currentLayout",@currentLayoutChange)

        currentLayoutChange:->
            console.log "from",this,"currentLayoutChange"



        
    