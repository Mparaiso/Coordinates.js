package tests.com.somerandomdude.coordy.nodes.twodee;
import com.somerandomdude.coordy.nodes.twodee.FlowNode;
import flash.display.Sprite;
import haxe.unit.TestCase;

/**
 * ...
 * @author marc paraiso
 */

class FlowNodeTest extends TestCase
{
	private var link:Sprite;
	private var flowNode:FlowNode;

	override public function setup():Void
	{
		super.setup();
		link = new Sprite();
		flowNode = new FlowNode(link, 0, 0);
	}
	
	function testNew() {
		print("\nnew");
		assertTrue(flowNode != null);
		assertTrue(flowNode.link = link);
	}
	
}