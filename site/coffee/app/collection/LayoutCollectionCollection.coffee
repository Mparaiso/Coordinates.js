define (require)->

    LayoutCollectionModel = require "app/model/LayoutCollectionModel"
    
    class LayoutCollectionCollection extends Backbone.Collection
        model: LayoutCollectionModel