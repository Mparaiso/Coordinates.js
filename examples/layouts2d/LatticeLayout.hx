package examples.layouts2d;
import com.somerandomdude.coordy.layouts.twodee.Lattice;
import examples.utils.Square;
import flash.display.Sprite;

/**
 * ...
 * @author marc paraiso
 */

class LatticeLayout extends Sprite
{

	public function new()
	{
		super();
		var lattice:Lattice = new Lattice(600, 600, 6, 6);
		for (i in 0...36) {
			var square:Square = new Square(20, Square.getRandomColor());
			addChild(square);
			lattice.addNode(square);
		}
		lattice.updateFunction();
	}
	
}