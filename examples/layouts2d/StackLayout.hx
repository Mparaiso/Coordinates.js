package examples.layouts2d;
import com.somerandomdude.coordy.layouts.twodee.Stack;
import examples.utils.Square;
import flash.display.Sprite;

/**
 * ...
 * @author marc paraiso
 */

class StackLayout extends Sprite
{

	public function new()
	{
		super();
		var stack:Stack = new Stack();
		for (i in 0...51) {
			var square:Square = new Square(50, Square.getRandomColor());
			addChild(square);
			stack.addNode(square);
		}
		stack.updateAndRender();
	}
	
}