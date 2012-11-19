package tests.com.somerandomdude.coordy.layouts.twodee;
import tests.com.somerandomdude.coordy.layouts.twodee.FlowTest.Square;
import com.somerandomdude.coordy.layouts.twodee.Spiral;
import flash.display.Sprite;
import flash.Lib;
import haxe.unit.TestCase;

/**
 * ...
 * @author marc paraiso
 */

class SpiralTest extends TestCase
{
	private var spiral:Spiral;
	private var scene:Sprite;
	static inline var SQUARE_QUANTITY = 50;
	override public function setup():Void
	{
		super.setup();
		spiral = new Spiral(10);
		scene = new Sprite();
		scene.alpha = 0.3;
		Lib.current.addChild(scene);
	}
	
	private function testNew()
	{
		print("\nnew");
		assertTrue(spiral != null);
	}
	
	function testAddNode() {
		print("\naddNode");
		var squares = [];
		for (i in 0...SQUARE_QUANTITY) {
			squares.push(new Square(20, Square.getRandomColor()));
			scene.addChild(squares[i]);
			spiral.addNode(squares[i]);
		}
		spiral.x = 400;
		spiral.y = 300;
		assertEquals(50, spiral.size);
	}
}