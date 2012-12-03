// Generated by CoffeeScript 1.3.3

requirejs.config({
  paths: {
    "vendor": "../vendor",
    "coordinates": "../../src/js/coordinates"
  }
});

/* application principale
*/


requirejs(["app", "coordinates/coordinates", "vendor/jquery.min", "vendor/underscore-min", "vendor/backbone-min"], function(app, coordinates) {
  var STAGE_HEIGHT, STAGE_WIDTH, stage2d, timerView;
  window.Coordinates = coordinates;
  window.app = app;
  STAGE_HEIGHT = 600;
  STAGE_WIDTH = 0;
  /* données de chaque layout , ainsi qu'une instance du layout
  */

  window.layout2dCollection = new app.collection.LayoutCollection([
    {
      type: "Scatter3d",
      name: "Scatted3d",
      options: {
        width: 100,
        height: 100,
        depth: 500,
        x: 100,
        y: 100
      }
    }
  ]);
  /* collection de layouts 3d
  */

  window.layout3dCollection = new app.collection.LayoutCollection([
    {
      type: "Stack3d",
      name: "Stack3d",
      options: {}
    }
  ]);
  window.layoutCollectionCollection = new app.collection.LayoutCollectionCollection([
    {
      name: "2D Layouts",
      instance: layout2dCollection
    }, {
      name: "3D Layouts",
      instance: layout3dCollection
    }
  ]);
  /* modèle configuration générale de l'application
  */

  window.appConfig = new app.model.AppConfig();
  /* menus des layouts 2d
  */

  window.menuStage2d = new app.view.MenuStage2d({
    el: "#menu-layout2d",
    collection: layout2dCollection
  });
  window.menuLayoutCollectionCollection = new app.view.MenuStage2d({
    el: "#menu-layoutCollectionCollection",
    collection: layoutCollectionCollection
  });
  /* collection d'urls d'images venant de flickr
  */

  window.imageUrlCollection = new app.collection.ImageUrlCollection({
    quantity: 30
  });
  /* zone de rendu des layouts 2d sur l'écran
  */

  stage2d = new app.view.Stage2d({
    el: "#stage-layout2d",
    collection: imageUrlCollection
  });
  timerView = new app.view.TimerView({
    model: new app.model.TimerModel()
  });
  /* router principal gére l'interaction entre les différentes parties de l'application
  */

  window.mainRouter = new app.router.MainRouter({
    timerView: timerView,
    imageUrlCollection: imageUrlCollection,
    stage2d: stage2d,
    appConfig: appConfig,
    layout2dCollection: layout2dCollection,
    menuStage2d: menuStage2d,
    menuLayoutCollectionCollection: menuLayoutCollectionCollection
  });
  Backbone.history.start();
});
