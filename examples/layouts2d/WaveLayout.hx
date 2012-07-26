package examples.layouts2d;
import com.somerandomdude.coordy.layouts.twodee.Wave;
import examples.utils.Square;
import flash.display.Sprite;

/**
 * ...
 * @author marc paraiso
 */


@:keep
class WaveLayout extends Sprite
{

	public function new()
	{
		super();
		var wave:Wave = new Wave(600, 300,150,150,3);
		for (i in 0...101) {
			var square:Square = new Square(10+Math.random()*20, Square.getRandomColor());
			addChild(square);
			wave.addNode(square);
		}
		wave.updateAndRender();
		//trace(wave.toJSON());
	}
	
}