package examples;
import examples.conceptsbasic.TweenLayoutItems;
import nme.display.Sprite;
import nme.Lib;

/**
 * ...
 * @author marc paraiso
 */

class ExamplesList extends Sprite
{

	public function new()
	{
		super();
		addChild(new TweenLayoutItems());
	}
	
	static function main() {
		Lib.current.addChild(new ExamplesList());
	}
}