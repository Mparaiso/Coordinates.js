###
EN : Unit test for Coordinates.js tests
FR : Tests unitaires
###
requirejs(["./js/main"],(Main)->

    module "flickr",
        setup:->
            @callback = (data)->
                ok(data!=null,"test callback #{JSON.stringify(data,null," ")}")
                ok(typeof data == "object","data is an object")
                start();
                return 
        teardown:->

    asyncTest "service/flickr",->
        Main.Services.Flickr.search("art",@callback)
)