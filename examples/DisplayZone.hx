package examples;

import flash.display.Sprite;
import flash.display.DisplayObject;

class DisplayZone extends Sprite {

	public function new(child:DisplayObject=null){
		super();
		if (child != null) {
			addChild(child);
		}
	}
	override public function addChild(child:DisplayObject):DisplayObject
	{
		for (i in 0...numChildren) {
			removeChildAt(i);
		}
		return super.addChild(child);
	}
}


