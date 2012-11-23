package examples.libraryintegration;

import com.somerandomdude.coordy.layouts.threedee.Grid3d;
import com.somerandomdude.coordy.layouts.threedee.Layout3d;
import flash.display.Sprite;
import flash.events.Event;
import sandy.core.data.Point3D;
import sandy.core.light.Light3D;
import sandy.core.Scene3D;
import sandy.core.scenegraph.Camera3D;
import sandy.core.scenegraph.Group;
import sandy.core.scenegraph.Shape3D;
import sandy.materials.Appearance;
import sandy.materials.attributes.LineAttributes;
import sandy.materials.attributes.MaterialAttributes;
import sandy.materials.ColorMaterial;
import sandy.materials.Material;
import sandy.primitive.Box;
import sandy.view.BasicView;

@:keep
class Sandy3dBasic extends Sprite {
	private var angle:Float;
	static inline var PI:Float = Math.PI;
	private var basicView:BasicView;
	private var scene:Scene3D;
	private var camera:Camera3D;
	private var box:Box;
	private var group:Group;
	private var isUpdating:Bool;
	private var colorAppearance:Appearance;
	private var light3D:Light3D;
	private var layout:Layout3d;
	private var appearance:Appearance;
	private var colorMaterial:Material;
	private var boxes:Array<Shape3D>;
	static private inline var INITIAL_X:Float = 500;
	static private inline var INITIAL_Z:Float = 500;
	private var freebox:Box;
	
	public function new(){
		super();
		//important , will not workother wise
		this.addEventListener(Event.ADDED_TO_STAGE, init);
		this.addEventListener(Event.REMOVED_FROM_STAGE, removed);
	}
	
	private function removed(e:Event):Void
	{
		removeEventListener(Event.REMOVED_FROM_STAGE, removed);
		basicView.scene.dispose();
	}
	
	private function init(e:Event):Void
	{
		removeEventListener(Event.ADDED_TO_STAGE, init);
		basicView = new BasicView();
		basicView.init();
		var materialAttributes:MaterialAttributes = basicView.makeMaterialAttributes([new LineAttributes(1, 0x000022)/*, new LightAttributes(true, 0.5)*/]);
		colorMaterial = new ColorMaterial(0xFF8888, 1,materialAttributes);
		colorMaterial.lightingEnable = true;
		appearance = new Appearance(colorMaterial);
		scene = basicView.scene;
		basicView.scene.light = new Light3D(new Point3D(0, 1000, 1000), 0.5);
		basicView.useRenderingCache = true;
		camera = basicView.camera;
		camera.z = INITIAL_Z+100;
		camera.x = INITIAL_X+100;
		camera.y = 500;
		camera.lookAt(250, 260, 250);
		this.addChild(basicView);
		drawBoxes(basicView);
		freebox = new Box("freebox", 20, 20, 20);
		freebox.appearance = appearance;
		group.addChild(freebox);
		scene.render();
		angle = 0;
		this.addEventListener(Event.ENTER_FRAME, onEnterFrame);
	}
	
	private function onEnterFrame(e:Event):Void
	{
		camera.x = Math.cos(angle * 180 / PI) * INITIAL_X;
		camera.z = Math.sin(angle * 180 / PI) * INITIAL_Z ;
	//	camera.x = Math.cos(
	//	scene.render();
		//camera.x =  Math.cos(angle * 180 / PI) * INITIAL_X +INITIAL_X;
		//camera.z =  Math.sin(angle * 180 / PI) * INITIAL_Z+ INITIAL_Z;
		camera.lookAt(100,100,100);
		angle = angle > 360 ? 0 : angle + 1/1000;
		
		scene.render(true);
	
	}
	
	function drawBoxes(basicView:BasicView) {

		layout = new Grid3d(200, 200, 200, 3, 3, 3);

		layout.validateObject = function(object:Dynamic):Bool {
			return true;
		}
		layout.updateFunction = function() {
			layout.update();
			//layout.nodes.sort(function(nodeA:Node3d, nodeB:Node3d):Int {
				//if (nodeA.z > nodeB.z) return -1;
				//if ( nodeA.z == nodeB.z) return 0;
				//return 1;
			//});
			for (node in layout.nodes) {
				if (node.link == null) continue;
				var link:Box = cast(node.link, Box);
				link.x = node.x;
				link.y = node.y;
				link.z = node.z;
			}
		}
		group = new Group("group");
		group.useSingleContainer = true;
		boxes = [];
		for (i in 0...27) {
		
			boxes[i] = new Box("box" + i, 30, 30, 30, "quad");
			boxes[i].appearance = appearance;
			group.addChild(boxes[i]);
			layout.addNode(boxes[i], false);
		}
		basicView.scene.root.addChild(group);
		layout.updateFunction();
	}
	
}