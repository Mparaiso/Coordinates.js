package tests.com.somerandomdude.coordy.layouts.threedee;

import com.somerandomdude.coordy.nodes.threedee.INode3d;
import flash.display.Sprite;
import flash.Lib;

import net.badimon.five3D.display.Scene3D;
import net.badimon.five3D.display.Sprite3D;

import tests.com.somerandomdude.coordy.layouts.twodee.FlowTest.Square;
import com.somerandomdude.coordy.layouts.threedee.Stack3d;
import haxe.unit.TestCase;

class Stack3dTest extends TestCase {
	
	private var stack3d:Stack3d;
	private var scene:Sprite;
	private var scene3d:Scene3D;
	
	override public function setup():Void
	{
		super.setup();
		stack3d = new Stack3d(45, 10, 30, 0, 0);
		#if js
		stack3d.validateObject = function(object:Dynamic):Bool {
			return true ;
		}
		var render = 	function(stack3d:Stack3d):Void{
				var n:INode3d;
				for(i in 0...stack3d.size)
				{
					n = stack3d.nodes[i];
					if (n.link == null) continue;
					var link:Sprite3D = cast(n.link, Sprite3D);
					link._x = n.x;
					link._y = n.y;
					link._z = n.z;
				}
		}
		stack3d.updateFunction = function() {	stack3d.update();render(stack3d);	}
		#end
		scene = new Sprite();
		scene3d = new Scene3D();
		scene3d.x = 0;
		scene3d.y = 0;
		scene.alpha = 0.4;
		//Lib.current.addChild(scene);
		Lib.current.addChild(scene3d);
	}
	
	function testNew() {
		assertTrue(stack3d != null);
	}
	
	function testAddNode() {
		print("\naddNode");
		var squares:Array<Dynamic> = [];
		for (i in 0...50) {
			#if js
				var shape:Sprite3D = new Sprite3D();
				Square.draw(shape, 50, Square.getRandomColor());
				squares.push(shape);
			//	stack3d.addNode(squares[i]);
				scene3d.addChild(shape);
				shape._y= 2 * i;
				shape._x= 2 * i;
				//shape._z= 2 * i;
			#else
				squares.push(new Square(50, Square.getRandomColor()));
				scene.addChild(squares[i]);
				stack3d.addNode(squares[i]);
				Reflect
			#end
		}
		assertTrue(true);
		//stack3d.updateFunction();
		//assertEquals(50, stack3d.size);
	}

}