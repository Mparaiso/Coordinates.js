package examples;
import examples.conceptsbasic.TweenLayoutItems;
import flash.display.Sprite;
import flash.Lib;

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