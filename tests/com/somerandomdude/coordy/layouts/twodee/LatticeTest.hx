package tests.com.somerandomdude.coordy.layouts.twodee;
import tests.com.somerandomdude.coordy.layouts.twodee.FlowTest.Square;
import com.somerandomdude.coordy.layouts.twodee.Lattice;
import flash.display.Sprite;
import flash.Lib;
import haxe.unit.TestCase;

/**
 * ...
 * @author marc paraiso
 */

class LatticeTest extends TestCase
{
	private var lattice:Lattice;
	private var scene:Sprite;

	override public function setup():Void
	{
		super.setup();
		lattice = new Lattice(400,300,4,4);
		scene = new Sprite();
		scene.alpha = 0.1;
		Lib.current.addChild(scene);
	}
	
	function testNew() {
		print("\nnew");
		assertTrue(lattice != null);
	}
	
	function testAddNode() {
		print("\naddNode");
		var square:Array<Square> = [];
		for (i in 0...50) {
			square.push(new Square(10, Square.getRandomColor()));
			scene.addChild(square[i]);
			lattice.addNode(square[i]);
		}
		assertEquals(50, lattice.size);
	}
	
	
}