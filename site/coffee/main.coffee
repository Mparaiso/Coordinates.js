requirejs.config
    paths:
        "vendor":"../vendor"
        "coordinates":"../../src/js/coordinates"

### application principale ###
requirejs ["app","coordinates/coordinates"],(app,coordinates)->

    window.Coordinates = coordinates

    ### données de chaque layout , ainsi qu'une instance du layout ###
    window.layout2dCollection = new app.collection.LayoutCollection([
                {type:"Flow",options:{width:600,height:500,hPadding:40,vPadding:40,y:100,x:100}},
                {type:"Spiral",options:{circumference:50,x:450,y:300}},
                {type:"VerticalLine",options:{vPadding:10,x:400}},
                {type:"Stack",options:{angle:40,offset:40,x:50,y:50}},
                {type:"Lattice",options:{width:500,height:500,x:200,y:50,columns:5,rows:4}},
                {type:"HorizontalLine",options:{hPadding:10,y:300}}
                {type:"Grid",options:{width:500,height:500,columns:5,rows:6,x:200,y:50}},
                {type:"Ellipse",options:{width:450,height:450,x:450,y:300}},
                {type:"Wave",options:{width:800,height:300,x:50,y:300,frequency:2}},
                {type:"Scatter",options:{width:500,height:500,x:50,y:50}}
    ])

    ### modèle configuration générale de l'application ###
    window.appConfig = new app.model.AppConfig()

    ### menus des layouts 2d ###
    window.menuStage2d = new app.view.MenuStage2d(el:"#menu-layout2d",collection:layout2dCollection)

    ### collection d'urls d'images venant de flickr ###
    window.imageUrlCollection = new app.collection.ImageUrlCollection(quantity:30)

    ### zone de rendu des layouts 2d sur l'écran ###
    stage2d = new app.view.Stage2d(el:"#stage-layout2d",collection:imageUrlCollection)

    ### router principal gére l'interaction entre les différentes parties de l'application ###
    window.mainRouter = new app.router.MainRouter(imageUrlCollection:imageUrlCollection,stage2d:stage2d,appConfig:appConfig,layout2dCollection:layout2dCollection,MenuStage2d:menuStage2d)

    Backbone.history.start()

    return










