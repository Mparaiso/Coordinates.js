package examples.basicconcepts;
import com.eclecticdesignstudio.motion.Actuate;
import com.eclecticdesignstudio.motion.easing.Cubic;
import com.somerandomdude.coordy.constants.LayoutUpdateMethod;
import com.somerandomdude.coordy.layouts.ILayout;
import com.somerandomdude.coordy.layouts.Layout;
import com.somerandomdude.coordy.layouts.twodee.Ellipse;
import com.somerandomdude.coordy.layouts.twodee.Lattice;
import com.somerandomdude.coordy.layouts.twodee.Layout2d;
import com.somerandomdude.coordy.layouts.twodee.Scatter;
import com.somerandomdude.coordy.layouts.twodee.VerticalLine;
import com.somerandomdude.coordy.layouts.twodee.Wave;
import com.somerandomdude.coordy.nodes.twodee.Node2d;
import examples.utils.Square;
import flash.display.DisplayObject;
import flash.display.Sprite;
import flash.events.TimerEvent;
import flash.utils.Timer;

class SwappingLayouts extends Sprite {
	
	private var currentLayout:Layout2d;
	private var timer:Timer;
	private var layouts:Array<Layout2d>;
	private var squares:Array<Square>;
	var i:Int;
	public function new(){
		super();
		i = 0;
		layouts = [new Ellipse(500, 500, 250, 250),new Wave(500,500,0,250)];
		timer = new Timer(5000, 100);
		timer.addEventListener(TimerEvent.TIMER, tick);
		currentLayout = layouts[i];
		currentLayout.updateMethod = LayoutUpdateMethod.UPDATE_ONLY;
		squares = [];
		for (i in 0...25) {
			var s:Square = new Square(Math.random() * 10 + 10, Square.getRandomColor());
			addChild(s);
			squares.push(s);
		}
		update();
		timer.start();
	}
	
	private function tick(e:TimerEvent):Void
	{
		update();
	}
	
	private function update()
	{
		
		currentLayout.updateMethod = LayoutUpdateMethod.NONE;
		var formerLayout:Layout2d = currentLayout;
		currentLayout = layouts[(i++ % (layouts.length))];
		for (square in squares) {
			currentLayout.addNode(square, false);
			currentLayout.update();
		}
		
		for (i in 0...currentLayout.size ) {
			var node:Node2d = currentLayout.nodes[i];
			var link :DisplayObject = cast(node.link, DisplayObject);
			Actuate.tween(link, Math.random() * 2 + 2, { x:node.x, y:node.y, rotation:node.rotation },false ).ease(Cubic.easeInOut);
		}
	}
}