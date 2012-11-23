package tests.com.somerandomdude.coordy.layouts.twodee;

import com.somerandomdude.coordy.layouts.twodee.Stack;
import haxe.unit.TestCase;
import hxColorToolkit.spaces.RGB;
import nme.display.Sprite;
import nme.Lib;
import tests.com.somerandomdude.coordy.layouts.twodee.FlowTest.Square;


class StackTest extends TestCase
{
	private var stack:Stack;
	private var squares:Array<Square>;
	private var scene:Sprite;

	override public function setup():Void
	{
		super.setup();
		stack = new Stack();
		scene = new Sprite();
		scene.alpha = 0.3;
		Lib.current.addChild(scene);
	}
	
	private function testNew()
	{
		print("\nnew");
		assertTrue(stack != null);
		assertTrue("20" > "12");
	}
	
	private function testAddNode()
	{
		print("\naddNode");
		squares = [];
		for (i in 0...10) {
			squares.push(new Square(30, new RGB(Math.random() * 256, Math.random() * 256, Math.random() * 256).getColor()));
			scene.addChild(squares[i]);
			stack.addNode(squares[i]);
		}
		//assertEquals(cast(0,Float), squares[0].x);
		assertEquals(10, stack.size);
	}
	
}