package tests.com.somerandomdude.coordy.layouts.threedee;

import com.somerandomdude.coordy.layouts.threedee.Layout3d;
import haxe.unit.TestCase;
class Layout3dTest extends TestCase {
	private var layout3d:Layout3d;
	override public function setup():Void
	{
		super.setup();
		layout3d = new Layout3d();
	}
	
	function testNew() {
		print("\nnew");
		assertTrue(layout3d != null);
	}
}