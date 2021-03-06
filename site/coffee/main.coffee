requirejs.config
    paths:
        "vendor":"../vendor"
        "coordinates":"../../src/js/coordinates"

### application principale ###
requirejs ["app","coordinates/coordinates","vendor/jquery.min","vendor/underscore-min","vendor/backbone-min"],(app,coordinates)->


    window.Coordinates = coordinates
    window.app = app
    STAGE_HEIGHT = 600
    STAGE_WIDTH = 0

    ### données de chaque layout , ainsi qu'une instance du layout ###
    window.layout2dCollection = new app.collection.LayoutCollection([
                {type:"Stack3d",name:"Stack3d",options:{zOffset:30,offset:30,angle:45,x:100,y:100}}
                {type:"Flow",options:{width:600,height:500,hPadding:20,vPadding:20,y:100,x:100}},
                {type:"Spiral",options:{circumference:50,x:450,y:300}},
                {type:"VerticalLine",name:"Vertical",options:{vPadding:10,x:400}},
                {type:"Stack",options:{angle:40,offset:40,x:50,y:50}},
                {type:"Lattice",options:{width:500,height:500,x:200,y:50,columns:5,rows:4}},
                {type:"Quadric",options:{x:100,y:100,x1:0,y1:0,x2:600,y2:800,x3:600,y3:-400,x4:0,y4:400}}
                {type:"HorizontalLine",name:'Horizontal',options:{hPadding:10,y:300}}
                {type:"Grid",options:{width:500,height:500,columns:5,rows:6,x:200,y:50}},
                {type:"Ellipse",options:{width:450,height:450,x:450,y:275}},
                {type:"Wave",options:{width:800,height:300,x:50,y:300,frequency:2}},
                {type:"Scatter",options:{width:500,height:500,x:150,y:50}}
                # {type:"Scatter3d",name:"Scatted3d",options:{width:100,height:100,depth:500,x:100,y:100}}
                
    ])

    ### collection de layouts 3d ###
    window.layout3dCollection = new app.collection.LayoutCollection([
        {type:"Stack3d",name:"Stack3d",options:{}}
    ])

    window.layoutCollectionCollection = new app.collection.LayoutCollectionCollection([
        {name:"2D Layouts",instance:layout2dCollection},
        {name:"3D Layouts",instance:layout3dCollection}
    ])

    ### modèle configuration générale de l'application ###
    window.appConfig = new app.model.AppConfig()

    ### menus des layouts 2d ###
    window.menuStage2d = new app.view.MenuStage2d(el:"#menu-layout2d",collection:layout2dCollection)

    window.menuLayoutCollectionCollection = new app.view.MenuStage2d(el:"#menu-layoutCollectionCollection",collection:layoutCollectionCollection)

    ### collection d'urls d'images venant de flickr ###
    window.imageUrlCollection = new app.collection.ImageUrlCollection(quantity:30)

    ### zone de rendu des layouts 2d sur l'écran ###
    stage2d = new app.view.Stage2d(el:"#stage-layout2d",collection:imageUrlCollection)

    timerView= new app.view.TimerView(model:new app.model.TimerModel())

    ### router principal gére l'interaction entre les différentes parties de l'application ###
    window.mainRouter = new app.router.MainRouter({timerView,imageUrlCollection,stage2d,appConfig,layout2dCollection,menuStage2d,menuLayoutCollectionCollection})

    Backbone.history.start()


    return










