package tests.com.somerandomdude.coordy.nodes.threedee;

import com.somerandomdude.coordy.nodes.threedee.OrderedNode3d;
import haxe.unit.TestCase;

class OrderedNode3dTest extends TestCase {
	private var orderedNode:OrderedNode3d;
	private var link:Dynamic;
	
	override public function setup():Void
	{
		super.setup();
		 link= { x:10, y:50 ,z:10};
		orderedNode = new OrderedNode3d(link);
	}
	
	public function testNew()
	{
		print("\nnew");
		assertTrue(orderedNode.link != null);
		print(orderedNode.link);
		assertTrue(orderedNode.link== link);
	}
}