define (require)->
    
    require "vendor/backbone-min"
    ImageView = require "app/view/ImageView"
    
    class Stage2d extends Backbone.View

        ADDED_TO_STAGE:"added_to_stage"

        initialize:(params)->

            ### ecouter l'évenement reset de @imageUrlCollection ###
            @collection.on("reset",@imageUrlCollectionReset,this)

        getImageViews:->
            @_imageViews

        setImageViews:(v)->
            @_imageViews = v
            @render()

        imageUrlCollectionReset:->
            ### creer les images destinées à être affichées ###
            @setImageViews  @collection.map (imageUrl)->
                imageView = new ImageView(el:$("<img>",{"class":"thb"}),model:imageUrl)
                imageView.load(imageView.model.get("url"))
                return imageView


        render:->
            ### pour chaque ImageView , ajouter le html de l'image view au html du Stage2d ###
            @$el.append(_.pluck(@getImageViews(),"$el"))
            this.trigger(Stage2d::ADDED_TO_STAGE)
            return this




        

        