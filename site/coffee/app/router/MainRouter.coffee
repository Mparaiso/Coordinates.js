define (require)->
    ###
        app/route/MainRouter
    ###
    require "vendor/backbone-min"
    ImageView = require "app/view/ImageView"
    Coordinates = require "coordinates/coordinates"
    Stage2d = require "app/view/Stage2d"
    MenuStage2d = require "app/view/MenuStage2d"
    
    class MainRouter extends Backbone.Router
        ### MainRouter ###

        initialize:(config)->
            ### obtenir les params ###
            {@imageUrlCollection,@stage2d,@appConfig,@layout2dCollection,@MenuStage2d} = config
            ### ecouter l'évenement reset de @imageUrlCollection ###
            @imageUrlCollection.on("reset",@imageUrlCollectionReset,this)
            @appConfig.on("change:currentLayout",@currentLayoutChange,this)
            @imageUrlCollection.fetch()

        routes:
            "layout2d/:layout":"setCurrentLayout"

        imageUrlCollectionReset:->
            ### creer domlinks quand imageUrlCollection est mis à jour ###
            @appConfig.set("domLinks",Coordinates.createDom2dLinks(_.pluck(@stage2d.getImageViews(),"el")) )
            @addDomLinksToLayouts()
            # console.log "current layout",@appConfig.get("currentLayout")
            unless @appConfig.get("currentLayout")
                @appConfig.set("currentLayout",@layout2dCollection.first().get("type"))
            return

        addDomLinksToLayouts:->
            ### ajouter les domlinks à tout les layouts ###
            @layout2dCollection.forEach (layoutModel)=>
                Coordinates.addLinksTolayout(@appConfig.get("domLinks") , layoutModel.get("instance"))
            return

        updateAndRenderCurrentLayout:(l)->
            # console.log "from",this,"updateAndRenderCurrentLayout",arguments

        currentLayoutChange:(model, layout, object)->
            # console.log "from",this,"currentLayoutChange"
            document.title = "#{layout} - Coordinates"
            layout = @layout2dCollection.where(type:layout)?[0].get("instance")
            layout.updateAndRender()
            @MenuStage2d.trigger(MenuStage2d::LAYOUT_CHANGE,@appConfig.get("currentLayout"))
            return

        setCurrentLayout:(layout)->
            @appConfig.set("currentLayout",layout)
            return
            
