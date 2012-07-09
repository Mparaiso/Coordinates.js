package tests.com.somerandomdude.coordy.layouts.twodee;
import com.somerandomdude.coordy.layouts.twodee.VerticalLine;
import haxe.unit.TestCase;

class VerticalLineTest extends TestCase {
	private var verticalLine:VerticalLine;
	override public function setup():Void
	{
		super.setup();
		verticalLine = new VerticalLine();
	}
	
	function testNew() {
		assertTrue(verticalLine != null);
	}
	
	function testAddNode() {
		print("\naddNode");
		for (i in 0...10) {
			verticalLine.addNode( { x:1 * i, y:0, height:20,rotation:0 } );
		}
		verticalLine.updateAndRender();
		assertEquals(0, verticalLine.nodes[0].y);
		assertEquals(20, verticalLine.nodes[1].y);
		assertEquals(180, verticalLine.nodes[9].y);
		assertEquals(10, verticalLine.size);
	}
	
	function testRemoveNodeByLink() {
		print("\nremoveNodeByLink");
		print(verticalLine.size);
		assertEquals(0, verticalLine.size);
		var link = { x:1, y:1, height:10, rotation:0 };
		verticalLine.addNode(link);
		assertEquals(1, verticalLine.size);
		verticalLine.removeNodeByLink(link);
		assertEquals(0, verticalLine.size);
				

	}
}