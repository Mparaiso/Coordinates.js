package tests;
import flash.display.Sprite;
import flash.Lib;
import flash.events.Event;
import haxe.unit.TestRunner;
import tests.com.somerandomdude.coordy.layouts.threedee.Layout3dTest;
import tests.com.somerandomdude.coordy.layouts.threedee.Stack3dTest;
import tests.com.somerandomdude.coordy.layouts.threedee.Wave3dTest;
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
import tests.com.somerandomdude.coordy.nodes.threedee.OrderedNode3dTest;
import tests.com.somerandomdude.coordy.nodes.twodee.FlowNodeTest;
import tests.com.somerandomdude.coordy.nodes.twodee.OrderedNodeTest;

/**
 * compile this class to launch tests
 */

class CoordyTest extends Sprite
{
	public static var _main:Sprite;
	
	public function new(){
		super();
		addEventListener(Event.ADDED_TO_STAGE, init);
		
	}
	
	private function init(e:Event):Void
	{
		_main = this;
		removeEventListener(Event.ADDED_TO_STAGE, init);
		var testRunner:TestRunner = new TestRunner();
		//testRunner.add(new Stack3dTest());
		testRunner.add(new Wave3dTest());
		//testRunner.add(new OrderedNodeTest());
		//testRunner.add(new HorizontalLineTest());
		//testRunner.add(new VerticalLineTest());
		//testRunner.add(new ScatterTest());
		//testRunner.add(new FlowTest());
		//testRunner.add(new StackTest());
		//testRunner.add(new NodeTest());
		//testRunner.add(new Node3dTest());
		//testRunner.add(new OrderedNode3dTest());
		//testRunner.add(new GridTest());
		//testRunner.add(new FlowNodeTest());
		//testRunner.add(new EllipseTest());
		//testRunner.add(new SpiralTest());
		//testRunner.add(new WaveTest());
		//testRunner.add(new LatticeTest());
		testRunner.run();
		
	}

	public static function main() {
		Lib.current.addChild(new CoordyTest());
	}
	
}