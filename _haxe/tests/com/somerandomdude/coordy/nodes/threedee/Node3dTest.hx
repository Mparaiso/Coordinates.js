package tests.com.somerandomdude.coordy.nodes.threedee;

import com.somerandomdude.coordy.nodes.threedee.Node3d;
import haxe.unit.TestCase;

class Node3dTest extends TestCase {
	private var link:Link;
	private var node3d:Node3d;
	override public function setup():Void
	{
		super.setup();
		link= { x:0, y:0, z:0, rotationX:0, rotationY:0, rotationZ:0 };
		node3d = new Node3d(link);
	}
	
	function testNew() {
		print("\nnew");
		assertTrue(node3d != null);
		assertTrue(node3d.link == link);
	}
	
	
}

typedef Link = {
	var x:Dynamic;
	var y:Dynamic;
	var z:Dynamic;
	var rotationX:Dynamic;
	var rotationY:Dynamic;
	var rotationZ:Dynamic;
}