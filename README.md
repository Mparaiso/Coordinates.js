#Coordinates.js

## a javascript layout framework that helps organize items in 2D or 3D space

##### license MIT

## Live Demo : http://paraiso.alwaysdata.net/javascript/coordinates/exemple/three/

###Author : M.PARAISO mparaiso@online.fr , http://paraiso.alwaysdata.net

##### Based on coordy by P J Onori : http://somerandomdude.com/work/coordy/

####Features

+ works with DOM elements
+ works with Canvas
+ works with 3d frameworks like Three.js

####Layouts

+ 2D layouts
	+ Ellipse
	+ Flow
	+ Grid
	+ Horizontal line
	+ Lattice
	+ Scatter
	+ Spiral
	+ Stack
	+ Vertical line
	+ Wave

+ 3D layouts
	+ Ellipse
	+ Grid 
	+ Scatter
	+ Stack
	+ Wave 
	+ Wave Ellipse

### GETTING STARTED 

create a html file and paste that code : 

<pre>
	<h1>Hello Coordinates</h1>
	<h6>Using Coordinates.js with DOM elements</h6>
	<div class="wrapper">
		<div id="viewport"></div>
	</div>
	<script type="text/javascript" src="Coordinates.js"></script>
	<script type="text/javascript">
		var DIV_NUMBER=30,
		divs=[],
		DIV_WIDTH=20,
		DIV_HEIGHT=20,
		layout,
		viewport,
		// get the root element  , viewport is a div element in the DOM with the id of viewport
		viewport = document.querySelector("#viewport");
		// make the root element position relative so every direct child position marked as absolute will be relative to the root element
		viewport.style.position = "relative";
		// create a wave layout ( width , height , x , y , frequency);
		layout = new Coordinates.layouts.twodee.Wave(400,200,0,100,2);
		// override the validateObject method called each time a object is added to the layout , we are simply going to return true so no real validateion
		layout.validateObject = function(object){
			return true;
		}
		// override the render method to fit the node link object structure ( here we are using a DOM element )
		layout.render = function(){
			for(var i=0 ; i< this.size ; i++){
				this.nodes[i].link.style.left = this.nodes[i].x+"px";
				this.nodes[i].link.style.top  = this.nodes[i].y+"px";
				this.nodes[i].link.style['-webkit-transform'] = 'rotate('+this.nodes[i].rotation+'deg)';
			}
		}
		// create divs
		for(var i=0; i<DIV_NUMBER; i++){
			var div = document.createElement("DIV");
			// get a random color , format it as a string like #FF00FF for use with CSS
			var color = "#"+(Math.ceil(Coordinates.getRandomColor())).toString(16);
			div.style.backgroundColor = color;
			div.style.border = "1px solid #FFFFFF";
			div.style.width = DIV_WIDTH+"px";
			div.style.height= DIV_HEIGHT+"px";
			div.style.position = "absolute";
			// add div to the dom
			viewport.appendChild(div);
			// add div to the layout
			layout.addNode(div);
		}
		// update and render the layout
		layout.updateAndRender();
	</script>
</pre>

