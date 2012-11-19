package examples;
import flash.display.DisplayObject;

class LayoutFactory {
	public static function create(__class:String):DisplayObject {
		var displayObject:DisplayObject = null;
		var _class:Dynamic= Type.resolveClass(__class);
		//trace(_class);
		displayObject = Type.createInstance(_class, []);
		return displayObject;
	}
}
