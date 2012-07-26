package examples.layouts3d;

import com.somerandomdude.coordy.layouts.threedee.Wave3d;
import examples.utils.Square;
import flash.display.Sprite;
import flash.events.Event;
import sandy.core.light.Light3D;
import sandy.core.Scene3D;
import sandy.core.scenegraph.Camera3D;
import sandy.core.scenegraph.Shape3D;
import sandy.core.scenegraph.TransformGroup;
import sandy.materials.Appearance;
import sandy.materials.attributes.LightAttributes;
import sandy.materials.attributes.LineAttributes;
import sandy.materials.attributes.MaterialAttributes;
import sandy.materials.ColorMaterial;
import sandy.materials.Material;
import sandy.primitive.Box;
import sandy.view.BasicView;

@:keep
class Wave3dLayout extends Sprite {
	private var angle:Float;
	static inline var PI:Float = Math.PI;
	private var basicView:BasicView;
	private var scene:Scene3D;
	private var camera:Camera3D;
	private var box:Box;
	private var group:TransformGroup;
	private var isUpdating:Bool;
	private var colorAppearance:Appearance;
	private var light3D:Light3D;
	private var layout:Wave3d;
	private var appearance:Appearance;
	private var colorMaterial:Material;
	private var boxes:Array<Shape3D>;
	static private inline var INITIAL_X:Float = 500;
	static private inline var INITIAL_Z:Float = 500;
	private var freebox:Box;
	private var groupTransform:TransformGroup;
	private var materialAttributes:MaterialAttributes;
	
	public function new(){
		super();
		//important , will not workother wise
		this.addEventListener(Event.ADDED_TO_STAGE, init);
		this.addEventListener(Event.REMOVED_FROM_STAGE, removed);
	}
	
	function removed(e:Event):Void
	{
		this.removeEventListener(Event.REMOVED_FROM_STAGE, removed);
		basicView.scene.dispose();
	}
	
	private function init(e:Event):Void
	{
		removeEventListener(Event.ADDED_TO_STAGE, init);
		
		basicView = new BasicView();
		
		basicView.init();
		materialAttributes = basicView.makeMaterialAttributes([new LineAttributes(1, 0x000022), new LightAttributes(true, 0.5)]);
		scene = basicView.scene;
		camera = basicView.camera;
		camera.z = 700;
		camera.x = 700;
		camera.y = 700;
		this.addChild(basicView);
		drawBoxes(basicView);
		camera.lookAtPoint(group.boundingBox.getCenter());

		angle = 0;
		this.addEventListener(Event.ENTER_FRAME, onEnterFrame);
	}
	
	function onEnterFrame(e:Event):Void
	{
		group.rotateZ += 1.5;
		group.rotateY += 0.5;
		group.rotateX += 0.25;
		scene.render(true);
	}
	
	function drawBoxes(basicView:BasicView) {

		layout = new Wave3d(400, 400, 400);
		layout.frequency = 2;

		layout.validateObject = function(object:Dynamic):Bool {
			return true;
		}
		layout.updateFunction = function() {
			layout.update();
			for (node in layout.nodes) {
				if (node.link == null) continue;
				var link:Box = cast(node.link, Box);
				link.x = node.x;
				link.y = node.y;
				link.z = node.z;
			}
		}
		group = new TransformGroup("myTransformGroup");
		group.useSingleContainer = false;
		boxes = [];
		for (i in 0...27) {
		
			boxes[i] = new Box("box" + i, 20, 20, 20, "quad");
			boxes[i].appearance = basicView.makeColorAppearance(Square.getRandomColor(), 1, materialAttributes);
			boxes[i].appearance.lightingEnable = true;
			group.addChild(boxes[i]);
			layout.addNode(boxes[i], false);
		}
		basicView.scene.root.addChild(group);
		layout.updateFunction();
	}
	
}