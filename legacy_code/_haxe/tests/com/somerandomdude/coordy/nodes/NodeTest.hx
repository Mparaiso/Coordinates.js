package tests.com.somerandomdude.coordy.nodes;

import haxe.unit.TestCase;
import com.somerandomdude.coordy.nodes.Node ;

class NodeTest extends TestCase {
	private var node:Node;
	private var link:Dynamic;
	override public function setup():Void
	{
		super.setup();
		link = { x:1, y:2, width:100, height:100 };
		node = new Node(link);
	}
	public function testLink()
	{
		print("\nlink");
		assertTrue(node.link != null);
		assertEquals(1, node.link.x);
		assertEquals(100, node.link.width);
	}
}