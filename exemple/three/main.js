var camera, 
scene,
renderer,
group,
grid, 
wave , 
mesh,
currentLayout,
container,
layoutNames,
layoutTransitioner,
INITIAL_TEXT_X,
INITIAL_TEXT_Z,
pointLights,layouts,
renderingDelta,
textGroup,
textLayout,
textLayoutCoordinates,
delta,now,
transitionInterval = 5000,
renderingInterval = 60,
NODE_NUMBER=64,
delay=0,
iter = 0,
VIEWPORT_HEIGHT = window.innerHeight * 0.75,
VIEWPORT_WIDTH = window.innerWidth * 0.75,
INITIAL_TEXT_LAYOUT_X = - 800,
INITIAL_TEXT_LAYOUT_Y =   500,
INITIAL_TEXT_LAYOUT_Z = - 500,
SELECTED_LAYOUT_COLOR = "#0BB",
UNSELECTED_LAYOUT_COLOR = "#CCC",
NODE_TRANSITION_SPEED=1.6,
verticalLayout;

function main(){
  init();
  animate();
  displayScript();
}

function htmlEntities(str) {

    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}


function getCurrentLayout(){

  return  layouts[++iter % layouts.length];
}

function renderLayout(){
  for(var i in this.nodes){
    if(this.nodes[i].link==null)return;
    this.nodes[i].link.position.x = this.nodes[i].x;
    this.nodes[i].link.position.y = this.nodes[i].y;
    if(this.nodes[i].z){
      this.nodes[i].link.position.z = this.nodes[i].z;
    }else{
      this.nodes[i].link.position.z = 0;
    }
    if(this.nodes[i].rotationZ) this.nodes[i].link.rotation.z = this.nodes[i].rotationZ;
  }
}

function validateObject(object){

  return true;
}

function createHTMLTextGroup(rootElement,layouts){
  var ul ;
  var _rootElement = rootElement ; 
  var _layouts = layouts ;
  var _length = _layouts.length;
  var layoutNames=[];
  textLayout = new Coordinates.layouts.twoodee.Grid(100,400,1,layouts.length);
  textLayout.validateObject= validateObject;
  textLayout.render = function(){
    // le lien link est un élement du DOM
    for(var i=0;i<this.nodes.length;i++){
      if(this.nodes[i].link===null)continue;
      this.nodes[i].link.style.left = this.nodes[i].x+"px";
      this.nodes[i].link.style.top  = this.nodes[i].y+"px";
      //console.log(this.nodes[i].link);
    }
  }
  rootElement.appendChild(ul = document.createElement("DIV"));
  ul.style.position = "absolute" ; 
  ul.style.top = "0px";
  ul.style.left= "0px";

  for(var i=0;i<_length;i++){
      layoutNames[i] = document.createElement("DIV");
      layoutNames[i].innerHTML = layouts[i].toString();
      layoutNames[i].style.position = 'absolute' ; 
      layoutNames[i]['class'] = "layout-name";
      ul.appendChild(layoutNames[i]);
      textLayout.addNode(layoutNames[i]);
  }
  textLayout.updateAndRender();
  textGroup = ul ;
  INITIAL_TEXT_LAYOUT_Y = textGroup.offsetParent.offsetTop;
  return layoutNames;
}

function createCubeGroup(scene,layouts){
  var group = new THREE.Object3D();
  group.position.z = -500;
  var meshes=[];
  for(var i=0;i <  NODE_NUMBER;i++){
   var material = new THREE.MeshLambertMaterial( { color: Coordinates.getRandomColor(), wireframe: false } );

    var geometry = new THREE.CubeGeometry( 100, 100, 100 );
    meshes[i] = new THREE.Mesh( geometry, material );

    group.add(meshes[i]);
    for(var j=0;j<layouts.length;j++){
      layouts[j].addNode(meshes[i],false);
    }
  }
  return group;
}

function createLights(){
  // create a point light
  var pointLights = [];
  pointLights[0] =new THREE.PointLight(0xFFFFFF);
  // set its position
  pointLights[0].position.x = 3000;
  pointLights[0].position.y = -3000;
  pointLights[0].position.z = 3000;

  pointLights[1] =new THREE.PointLight(0xFFFFFF);
  // set its position
  pointLights[1].position.x = -1000;
  pointLights[1].position.y =  1000;
  pointLights[1].position.z = 1000;

  return pointLights ; 
}

function createLayouts(){
  var layouts=[];
  layouts.push(new Coordinates.layouts.twodee.Wave(3000,2000,0,0,3));
  layouts.push(new Coordinates.layouts.threedee.Grid3d(1000,1000,1000,4,4,4));
  layouts.push(new Coordinates.layouts.twodee.Spiral(150,.10));
  layouts.push(new Coordinates.layouts.threedee.WaveEllipse3d(2000,2000,500,1,8,1));
  layouts.push(new Coordinates.layouts.threedee.Scatter3d(3000,3000,3000));
  layouts.push(new Coordinates.layouts.threedee.WaveEllipse3d(2000,2000,500,3,2,1));
  layouts.push(new Coordinates.layouts.twodee.Lattice(3000,3000,16,4));
  layouts.push(new Coordinates.layouts.threedee.WaveEllipse3d(2000,2000,500,2,1,2));
  layouts.push(new Coordinates.layouts.threedee.Stack3d(45,200,200));
  layouts.push(new Coordinates.layouts.threedee.Wave3d(3000,800,800,0,0,0,4));
  layouts.push(new Coordinates.layouts.twodee.Ellipse(2500,2500));

  for(var i=0;i < layouts.length;i++){
    layouts[i].validateObject = validateObject;
    layouts[i].render = renderLayout;
  }

  return layouts ; 
}

function tweenFunction(node){
  var link = node.link;

  TweenLite.to(link.position,NODE_TRANSITION_SPEED,{x:node.x,y:node.y,z:(node.z||0),ease:Power4.easeInOut,delay:delay});
  delay+=0.025;
}

function tweenY(target,value){

  TweenLite.to(target.position,1,{y:value,ease:Power4.easeInOut});
}

function tweenTop(target,value){

  TweenLite.to(target,1,{css:{top:value+"px"},ease:Power4.easeInOut});
}

function tweenColor(target,value){

  TweenLite.to(target,0.5,{r:value.r,g:value.g,b:value.b});
}

function animate(now) {

  if(now-delta>=transitionInterval){
    currentLayout = getCurrentLayout();

    if(currentLayout.distributeNodes)currentLayout.distributeNodes();
    currentLayout.update();
    layoutTransitioner.syncNodesTo(currentLayout);

    if(layoutNames !== undefined ){
      animateLayoutNames();
    }
    delay=0;
    delta = Date.now();
  }
  // note: three.js includes requestAnimationFrame shim
  requestAnimationFrame( animate );
  if(now - renderingDelta >= renderingInterval ){
    render();
    renderingDelta = Date.now();
  }
}

function animateLayoutNames(){
  tweenTop(textGroup,-INITIAL_TEXT_LAYOUT_Y-textLayout.nodes[iter%textLayout.size].y);
  for(var i=0;i<layoutNames.length;i++){
    if(i == iter % layoutNames.length ){
      TweenLite.to(
        layoutNames[i],
        1,
        {css:{
            "font-size":"25px",
            opacity:1,
            color:SELECTED_LAYOUT_COLOR,
            ease:Power4.easeInOut
          }
        });
    }else{
      TweenLite.to(
        layoutNames[i],
        1,
        {css:{
          "font-size":"20px",
          opacity:0.8,
          color:UNSELECTED_LAYOUT_COLOR,
          ease:Power4.easeInOut
          }
        });
    }
  }
}

function render() {

  group.rotation.x += 0.01;
  group.rotation.y += 0.03;
  renderer.render( scene, camera );
}

function init() {

  scene = new THREE.Scene();

  layouts = createLayouts();
  
  currentLayout = layouts[iter];

  pointLights = createLights();

  for(var i=0;i<pointLights.length;i++){
    scene.add(pointLights[i]);
  }
  
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );

  camera.position.z = 2000;
  scene.add( camera );

  group = createCubeGroup(scene,layouts);
  scene.add(group);

  //createTextGroup(scene,layouts);
  layoutNames = createHTMLTextGroup(document.querySelector("#textContainer"),layouts);

  renderer = new THREE.SVGRenderer({antialias : true,overdraw:false});
  renderer.setSize( VIEWPORT_WIDTH, VIEWPORT_HEIGHT);
  // insert the viewport in the DOM
  document.querySelector("#target").appendChild( renderer.domElement );
  layoutTransitioner = new Coordinates.utils.LayoutTransitioner(currentLayout,tweenFunction);
  delta = renderingDelta = Date.now();
  currentLayout.update();
  layoutTransitioner.syncNodesTo(currentLayout);
  container = document.getElementById("container");
  container.style.width = VIEWPORT_WIDTH+"px";
  container.style.height = VIEWPORT_HEIGHT+"px";
  animateLayoutNames();
}

function displayScript(){
  var body = document.body;
  var script = document.querySelector("#main-script").innerHTML;
  var c = document.createElement("PRE");
  c.innerHTML =  htmlEntities(script);
  body.appendChild(c);
}