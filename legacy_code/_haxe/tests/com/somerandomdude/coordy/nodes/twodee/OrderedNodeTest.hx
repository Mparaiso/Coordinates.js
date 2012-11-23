package tests.com.somerandomdude.coordy.nodes.twodee;

import haxe.unit.TestCase;
import com.somerandomdude.coordy.nodes.twodee.OrderedNode;

class OrderedNodeTest extends TestCase {
	private var orderedNode:OrderedNode;
	private var link: { x:Int, y:Int };
	
	override public function setup():Void
	{
		super.setup();
		var link: { x:Int, y:Int }= { x:10, y:50 };
		orderedNode = new OrderedNode(link);
	}
	
	public function testConstructor()
	{
		assertTrue(orderedNode.link != null);
	}
}