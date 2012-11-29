define (require)->

    Main = 
        service:
            Flickr: require "app/service/Flickr"
        view:
            ImageView: require "app/view/ImageView"
            MenuStage2d: require "app/view/MenuStage2d"
            Stage2d: require "app/view/Stage2d"
            TimerView: require "app/view/TimerView"
        router: 
            MainRouter: require "app/router/MainRouter"
        collection:
            LayoutCollection: require "app/collection/LayoutCollection"
            ImageUrlCollection: require "app/collection/ImageUrlCollection"
        model:
            AppConfig: require "app/model/AppConfig"
            LayoutModel : require "app/model/LayoutModel"
            ImageUrlModel: require "app/model/ImageUrlModel"
            TimerModel: require "app/model/TimerModel"
        template:
            MenuTemplate: require "app/template/MenuTemplate"


    return Main


    