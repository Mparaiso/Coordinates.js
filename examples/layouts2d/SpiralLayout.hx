package examples.layouts2d;
import com.somerandomdude.coordy.layouts.twodee.Spiral;
import examples.utils.Square;
import flash.display.Sprite;

/**
 * ...
 * @author marc paraiso
 */

class SpiralLayout extends Sprite
{

	public function new()
	{
		super();
		var spiral:Spiral = new Spiral(50);
		spiral.y = 200;
		spiral.x = 200;
		for (i in 0...20) {
			var square:Square = new Square(20, Square.getRandomColor());
			addChild(square);
			spiral.addNode(square);
		}
		spiral.updateAndRender();
	}
	
}