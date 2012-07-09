package tests.com.somerandomdude.coordy.layouts.twodee;
import com.somerandomdude.coordy.layouts.twodee.Scatter;
import haxe.unit.TestCase;

/**
 * ...
 * @author marc paraiso
 */

class ScatterTest extends TestCase
{
	private var scatter:Scatter;

	override public function setup():Void
	{
		super.setup();
		scatter = new Scatter(400, 400);
	}
	
	function testNew() {
		print("\nnew");
		assertTrue(scatter != null);
	}
	
	function testAddNode() {
		print("\naddNode");
		var link = { x:1, y:2, rotation:0 };
		scatter.addNode(link);
		assertEquals(1, scatter.size);
		assertEquals(link, scatter.nodes[0].link);
		print(scatter.nodes[0]);
		print("\n"+scatter.nodes[0].x);
		print("\n"+scatter.nodes[0].y);
	}
	
}