package tests.com.somerandomdude.coordy.layouts.twodee;

import com.somerandomdude.coordy.layouts.twodee.Grid;
import haxe.unit.TestCase;
class GridTest extends TestCase {
	private var grid:Grid;
	override public function setup():Void
	{
		super.setup();
		grid = new Grid(300, 300, 3, 3);
	}
	
	private function testNew()
	{
		print("\nnew");
		assertTrue(grid != null);
	}
}