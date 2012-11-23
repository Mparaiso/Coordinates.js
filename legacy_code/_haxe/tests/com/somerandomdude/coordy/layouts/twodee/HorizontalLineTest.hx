package tests.com.somerandomdude.coordy.layouts.twodee;

import com.somerandomdude.coordy.layouts.twodee.HorizontalLine;
import haxe.unit.TestCase;

class HorizontalLineTest extends TestCase {
	
	private var horizontalLayout:HorizontalLine;
	
	override public function setup():Void
	{
		super.setup();
		horizontalLayout = new HorizontalLine();
	}
	
	public function testNew()
	{
		assertTrue(horizontalLayout != null);
	}
}