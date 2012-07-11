package tests.com.somerandomdude.coordy.layouts.threedee;

import com.somerandomdude.coordy.layouts.threedee.Stack3d;
import haxe.unit.TestCase;

class Stack3dTest extends TestCase {
	
	private var stack3d:Stack3d;
	
	override public function setup():Void
	{
		super.setup();
		stack3d = new Stack3d();
	}
	
	function testNew() {
		assertTrue(stack3d != null);
	}
}