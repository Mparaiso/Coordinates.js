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
            "layout2d/:layout":"setCurrentLayout"

        initialize:(config)->
            ### obtenir les params ###
            {@timerView,@imageUrlCollection,@stage2d,@appConfig,@layout2dCollection,@MenuStage2d} = config
            ### ecouter l'évenement reset de @imageUrlCollection ###
            #@imageUrlCollection.on("reset",@imageUrlCollectionReset,this)
            @appConfig.on("change:currentLayout",@currentLayoutChange,this)
            @MenuStage2d.on(MenuStage2d::MENU_CLICK,@stopTimer,this)
            @timerView.on(TimerView::TIMER_EVENT,@timerEvent,this)
            this.stage2d.on(Stage2d::ADDED_TO_STAGE,@imageUrlCollectionReset,this)
            @imageUrlCollection.fetch()
            @timerView.start()


        imageUrlCollectionReset:->
            ### creer domlinks quand imageUrlCollection est mis à jour ###

            @appConfig.set("domLinks",Coordinates.createDom2dLinks(_.pluck(@stage2d.getImageViews(),"el")) )
            @addDomLinksToLayouts()
            if not @appConfig.has("currentLayout")
                this.setCurrentLayout(@layout2dCollection.first().get("type"))
            else
                this.setCurrentLayout(this.appConfig.get("currentLayout"))

        addDomLinksToLayouts:->
            ### ajouter les domlinks à tout les layouts ###

            @layout2dCollection.forEach (layoutModel)=>
                Coordinates.addLinksTolayout(@appConfig.get("domLinks") , layoutModel.get("instance"))
            return

        setCurrentLayout:(layout)->
            ### set current layout ###
            @appConfig.set("currentLayout",layout)
            document.title = "#{layout} - Coordinates"
            @_currentLayoutModel = @layout2dCollection.where(type:layout)?[0]
            @_currentlayout = @_currentLayoutModel.get("instance")
            @_currentlayout.updateAndRender()
            @MenuStage2d.trigger(MenuStage2d::LAYOUT_CHANGE,@appConfig.get("currentLayout"))
            return

        stopTimer:->
            @timerView.stop()

        timerEvent:->
            if @_currentLayoutModel
                @setCurrentLayout( @layout2dCollection.getNextLayout(@_currentLayoutModel).get("type") )
            
