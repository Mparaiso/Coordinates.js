package examples.layouts2d;
import com.somerandomdude.coordy.layouts.twodee.Ellipse;
import examples.utils.Square;
import flash.display.Sprite;
import flash.events.Event;
/**
 * ...
 * @author marc paraiso
 */

class EllipseLayout extends Sprite
{

	public function new()
	{
		super();
		addEventListener(Event.ADDED_TO_STAGE, init);
	}
	
	private function init(e:Event):Void
	{
		removeEventListener(Event.ADDED_TO_STAGE, init);
		var ellipse:Ellipse = new Ellipse(400,400,200,200);
		for (i in 0...50) {
			var square:Square = new Square(Math.random() * 20 + 10, Square.getRandomColor());
			addChild(square);
			ellipse.addNode(square);
		}
		ellipse.updateFunction();
	}
	
}