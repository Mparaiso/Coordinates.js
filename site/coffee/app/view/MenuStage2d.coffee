# app/view/MenuStage2d
define (require)->

    require "vendor/backbone-min"
    MenuTemplate =  require "app/template/MenuTemplate"
    
    class MenuStage2d extends Backbone.View
        ### 
            FR : affiche le menu de sélection des différents layouts
        ###

        template : _.template(MenuTemplate)

        LAYOUT_CHANGE:"layoutChange"
        MENU_CLICK:"menuClick"

        initialize:(options)->
            @collection.on("change",@render,this)
            @on(MenuStage2d::LAYOUT_CHANGE,@onCurrentLayoutChange,this)
            @render()

        events:
            "click li":"clickMenu"

        clickMenu:(e)->
            type = $(e.currentTarget).attr("data-type")
            @trigger(MenuStage2d::MENU_CLICK,type:type)

        onCurrentLayoutChange:(layout)->
            ### set active if not active ###
            selector = "li[data-type|=\"#{layout}\"]"
            $("li",@$el).removeClass("active")
            @$el.find(selector).addClass("active")


        render:->
            @$el.html(@template(layouts:@collection.toJSON()))
            