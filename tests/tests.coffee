###
EN : Unit test for Coordinates.js tests
FR : Tests unitaires
###
requirejs.config
    paths:
        "app":"js/app"
        "coordinates":"../src/js/coordinates"

requirejs(["./js/app"],(app)->

    module "flickr",
        setup:->
            @callback = (data)->
                ok(data!=null,"test callback #{JSON.stringify(data,null," ")}")
                ok(typeof data == "object","data is an object")
                start();
                return 
        teardown:->

    asyncTest "service/flickr",->
        app.service.Flickr.search("art",@callback)
)