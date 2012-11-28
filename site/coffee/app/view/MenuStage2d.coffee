define (require)->

    require "vendor/backbone-min"
    MenuTemplate =  require "app/template/MenuTemplate"
    
    class MenuStage2d extends Backbone.View
        ### 
            FR : affiche le menu de sélection des différents layouts
        ###

        template : _.template(MenuTemplate)

        LAYOUT_CHANGE:"layoutChange"

        initialize:(options)->
            @collection.on("change",@render,this)
            @on(MenuStage2d::LAYOUT_CHANGE,@onCurrentLayoutChange,this)
            @render()

        events:
            "click li":"clickMenu"

        clickMenu:(e)->
            type = $(e.currentTarget).attr("data-type")
            @trigger("click",type:type)

        onCurrentLayoutChange:(layout)->
            ### set active if not active ###
            selector = "li[data-type|=\"#{layout}\"]"
            console.log "onCurrentLayoutChange",selector
            $("li",@$el).removeClass("active")
            @$el.find(selector).addClass("active")


        render:->
            @$el.html(@template(layouts:@collection.toJSON()))
            