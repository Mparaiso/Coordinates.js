package examples.layouts2d;
import com.somerandomdude.coordy.layouts.twodee.Grid;
import examples.utils.Square;
import flash.display.Sprite;

/**
 * ...
 * @author marc paraiso
 */


@:keep
class GridLayout extends Sprite
{

	public function new()
	{
		super();
		var layout:Grid = new Grid(600, 500, 5, 5);
		for (i in 0...25) {
		var square:Square = new Square(30, Square.getRandomColor());
			addChild(square);
			layout.addNode(square);
		}
		layout.updateAndRender();
	}
	
}