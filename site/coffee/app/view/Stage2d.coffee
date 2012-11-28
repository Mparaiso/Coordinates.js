define (require)->
    
    require "vendor/backbone-min"
    ImageView = require "app/view/ImageView"
    
    class Stage2d extends Backbone.View


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
            console.log "form",this,"imageUrlCollectionReset"
            @setImageViews  @collection.map (imageUrl)->
                new ImageView(el:$("<img>",{"class":"thb","src":imageUrl.getUrl(),"style":"width:50px;height:50px"}),model:imageUrl)

        render:->
            ### pour chaque ImageView , ajouter le html de l'image view au html du Stage2d ###
            @$el.append(_.pluck(@getImageViews(),"$el"))
            return this




        

        