package examples.layouts2d;

import com.somerandomdude.coordy.layouts.twodee.Scatter;
import examples.utils.Square;
import flash.display.Sprite;
class ScatterLayout extends Sprite {
	public function new(){
		super();
		var scatter:Scatter = new Scatter(600, 600);
		for (i in 0...200) {
			var square:Square = new Square(Math.random() * 20 + 10, Square.getRandomColor());
			addChild(square);
			scatter.addNode(square);
		}
		scatter.updateFunction();
	}
}