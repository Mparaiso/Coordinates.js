package tests;
import haxe.unit.TestRunner;
import tests.com.somerandomdude.coordy.layouts.twodee.EllipseTest;
import tests.com.somerandomdude.coordy.layouts.twodee.FlowTest;
import tests.com.somerandomdude.coordy.layouts.twodee.GridTest;
import tests.com.somerandomdude.coordy.layouts.twodee.HorizontalLineTest;
import tests.com.somerandomdude.coordy.layouts.twodee.LatticeTest;
import tests.com.somerandomdude.coordy.layouts.twodee.ScatterTest;
import tests.com.somerandomdude.coordy.layouts.twodee.StackTest;
import tests.com.somerandomdude.coordy.layouts.twodee.VerticalLineTest;
import tests.com.somerandomdude.coordy.layouts.twodee.WaveTest;
import tests.com.somerandomdude.coordy.layouts.twodee.SpiralTest;
import tests.com.somerandomdude.coordy.nodes.NodeTest;
import tests.com.somerandomdude.coordy.nodes.threedee.Node3dTest;
import tests.com.somerandomdude.coordy.nodes.twodee.FlowNodeTest;
import tests.com.somerandomdude.coordy.nodes.twodee.OrderedNodeTest;

/**
 * compile this class to launch tests
 */

class CoordyTest
{

	public static function main():Int{
		var testRunner:TestRunner = new TestRunner();
		

		testRunner.add(new OrderedNodeTest());
		testRunner.add(new HorizontalLineTest());
		testRunner.add(new VerticalLineTest());
		testRunner.add(new ScatterTest());
		testRunner.add(new FlowTest());
		testRunner.add(new StackTest());
		testRunner.add(new NodeTest());
		testRunner.add(new Node3dTest());
		testRunner.add(new GridTest());
		testRunner.add(new FlowNodeTest());
		testRunner.add(new EllipseTest());
		testRunner.add(new SpiralTest());
		testRunner.add(new WaveTest());
		testRunner.add(new LatticeTest());
		
		testRunner.run();
		return 0;
	}
	
}