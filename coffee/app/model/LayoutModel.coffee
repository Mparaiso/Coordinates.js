define (require)->
    
    require "vendor/backbone-min"
    
    class LayoutModel extends Backbone.Model
        defaults:
            type:'Flow'
            options:{width:500,height:500}