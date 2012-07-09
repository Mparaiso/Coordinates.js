package tests;
import haxe.unit.TestRunner;
import tests.com.somerandomdude.coordy.layouts.twodee.HorizontalLineTest;
import tests.com.somerandomdude.coordy.nodes.NodeTest;
import tests.com.somerandomdude.coordy.nodes.twodee.OrderedNodeTest;

/**
 * compile this class to launch tests
 */

class CoordyTest
{

	public static function main():Int{
		var testRunner:TestRunner = new TestRunner();
		testRunner.add(new NodeTest());
		testRunner.add(new OrderedNodeTest());
		testRunner.add(new HorizontalLineTest());
		testRunner.run();
		return 0;
	}
	
}