package tests.com.somerandomdude.coordy.layouts.threedee;
import com.somerandomdude.coordy.constants.PathAlignType;
import com.somerandomdude.coordy.layouts.threedee.Wave3d;
import com.somerandomdude.coordy.nodes.threedee.Node3d;
import examples.utils.Square;
import examples.utils.Square3D;
import flash.Lib;
import flash.display.Sprite;
import flash.events.Event;
import haxe.unit.TestCase;
import sandy.primitive.Box;
import sandy.view.BasicView;


/**
 * ...
 * @author marc paraiso
 */

class Wave3dTest extends TestCase
{
	private var wave:Wave3d;
	private var sprites3D:Array<Box>;
	static var length:Int = 50;
	private var scene:BasicView;
	private var root:Sprite;
	override public function setup():Void
	{
		super.setup();
		wave = new Wave3d(400, 400, 400);
		sprites3D = [];
		scene = new BasicView();
		root = new Sprite();
		root.addEventListener(Event.ADDED_TO_STAGE, init);
		
		scene.init();
		wave.validateObject = function(object:Dynamic) { return true; }
		wave.render = function() {
			
			var c:Node3d;
			for(i in 0...wave.size)
			{
				c=wave.nodes[i];
				if (c.link == null) continue;
				var link:Square3D = cast(c.link, Square3D);
				link._x=c.x;
				link._y=c.y;
				link._z=c.z;
				
				if(wave.alignType==PathAlignType.NONE) continue;
				
				link._rotationZ=c.rotationZ;
			}
		}
	}
	
	private function init(e:Event):Void
	{
		root.removeEventListener(Event.ADDED_TO_STAGE, init);
		root.addChild(scene);
	}
	
	function testNew():Void
	{
		print("\nnew");
		assertTrue(wave != null);
	}
	
	function testAdd() {
		print("\nadd");
		for (i in 0...length) {

			sprites3D[i] = scene.addBox();
			var appearance = scene.makeColorAppearance(Square.getRandomColor());
			sprites3D[i].appearance = appearance;
			wave.addNode(sprites3D[i]);
		}
		wave.updateFunction();
		scene.render();
		Lib.current.addChild(root);
		assertEquals(length, wave.size);
	}
	
}