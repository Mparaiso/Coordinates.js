# app/router/MainRouter
define (require)->
    ###
        app/route/MainRouter
    ###
    require "vendor/underscore-min"
    require "vendor/backbone-min"
    ImageView = require "app/view/ImageView"
    Coordinates = require "coordinates/coordinates"
    Stage2d = require "app/view/Stage2d"
    MenuStage2d = require "app/view/MenuStage2d"
    TimerView = require "app/view/TimerView"
    
    class MainRouter extends Backbone.Router

        ### MainRouter ###

        routes:
            "changelayout/:layoutcollection/:layout": "setCurrentLayout"
            "changelayout/:layoutcollection": "setCurrentLayoutCollection"

        initialize:(config)->
            ### obtenir les params ###
            {@timerView,@imageUrlCollection,@stage2d,@appConfig,@layout2dCollection,@menuStage2d,@menuLayoutCollectionCollection} = config
            ### ecouter l'évenement reset de @imageUrlCollection ###
            #@imageUrlCollection.on("reset",@imageUrlCollectionReset,this)
            @appConfig.on("change:currentLayout",@currentLayoutChange,this)
            @menuStage2d.on(MenuStage2d::MENU_CLICK,@stopTimer,this)
            @menuLayoutCollectionCollection.on("click li",->console.log "click")
            @timerView.on(TimerView::TIMER_EVENT,@timerEvent,this)
            this.stage2d.on(Stage2d::ADDED_TO_STAGE,@imageUrlCollectionReset,this)
            @imageUrlCollection.fetch()
            @timerView.start()

        imageUrlCollectionReset:->
            ### creer domlinks quand imageUrlCollection est mis à jour ###
            @appConfig.set("domLinks",Coordinates.createDOMLink3d(_.pluck(@stage2d.getImageViews(),"el")) )
            @addDomLinksToLayouts()
            if not @appConfig.has("currentLayout")
                this.setCurrentLayout("layout2d",@layout2dCollection.first().get("type"))
            else
                this.setCurrentLayout("layout2d",this.appConfig.get("currentLayout"))

        addDomLinksToLayouts:->
            ### ajouter les domlinks à tout les layouts ###
            @layout2dCollection.forEach (layoutModel)=>
                Coordinates.addLinksTolayout(@appConfig.get("domLinks") , layoutModel.get("instance"))
            return

        setCurrentLayoutCollection:(layoutcollection)->
            @appConfig.set("layoutCollection",layoutcollection)
            console.log "setCurrentLayoutCollection",layoutcollection
            return

        setCurrentLayout:(layoutcollection,layout)->
            ### configurer la collection de layouts courante ###
            @setCurrentLayoutCollection(layoutcollection)
            ### set current layout ###
            @appConfig.set("currentLayout",layout)
            document.title = "#{layout} - Coordinates"
            @_currentLayoutModel = @layout2dCollection.where(type:layout)?[0]
            @_currentlayout = @_currentLayoutModel.get("instance")
            @resetDomLinksZindex()
            @_currentlayout.updateAndRender()
            @menuStage2d.trigger(MenuStage2d::LAYOUT_CHANGE,@appConfig.get("currentLayout"))
            return

        resetDomLinksZindex:()->
            if not @appConfig.has("domLinks") then return
            for domLink in @appConfig.get("domLinks")
                domLink.setZ 0
            return

        stopTimer:->
            ### arrete le timer responsable du changement de layout ###
            @timerView.stop()

        timerEvent:->
            if @_currentLayoutModel
                @setCurrentLayout("layout2d",@layout2dCollection.getNextLayout(@_currentLayoutModel).get("type") )
            
