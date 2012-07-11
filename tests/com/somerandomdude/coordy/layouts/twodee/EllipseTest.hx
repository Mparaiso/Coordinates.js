package tests.com.somerandomdude.coordy.layouts.twodee;

import com.somerandomdude.coordy.layouts.twodee.Ellipse;
import tests.com.somerandomdude.coordy.layouts.twodee.FlowTest.Square;
import flash.display.Sprite;
import flash.Lib;
import haxe.unit.TestCase;

class EllipseTest extends TestCase {
	
	private var ellipse:Ellipse;
	private var scene:Sprite;
	
	override public function setup():Void
	{
		super.setup();
		ellipse = new Ellipse(400, 400,200,200);
		scene = new Sprite();
		scene.alpha = 0.5;
		Lib.current.addChild(scene);
	}
	
	private function testNew()
	{
		assertTrue(ellipse != null);
	}
	
	private function testAddNode() {
		var squares:Array<Dynamic> = [];
		for (i in 0...10) {
			squares.push(new Square(Math.random()*20+10, Square.getRandomColor()));
			scene.addChild(squares[i]);
			ellipse.addNode(squares[i]);
		}
		assertEquals(10, ellipse.size);
	}
}