package tests.com.somerandomdude.coordy.layouts.twodee;
import tests.com.somerandomdude.coordy.layouts.twodee.FlowTest.Square;
import com.somerandomdude.coordy.layouts.twodee.Wave;
import flash.display.Sprite;
import flash.Lib;
import haxe.unit.TestCase;

/**
 * ...
 * @author marc paraiso
 */

class WaveTest extends TestCase
{
	private var wave:Wave;
	private var scene:Sprite;

	override public function setup():Void
	{
		super.setup();
		wave = new Wave(400, 400,50,200);
		scene = new Sprite();
		scene.alpha = 0.2;
		Lib.current.addChild(scene);
	}
	
	private function testNew()
	{
		print("\nnew");
		assertTrue(wave != null);
	}
	
	function testAddNode() {
		print("\nAddNode");
		var squares = [];
		for (i in 0...50) {
			squares[i] = new Square(Math.random()*20+20, Square.getRandomColor());
			scene.addChild(squares[i]);
			wave.addNode(squares[i]);
		}
		assertEquals(50, wave.size);
	}
	
}