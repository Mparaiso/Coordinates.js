package examples;

import flash.display.Shape;

class ButtonBg extends Shape {
	public function new(width:Float=200,height:Float=200,bg=0xCCCCCC){
		super();
		graphics.lineStyle(1, 0x333333);
		graphics.beginFill(bg);
		graphics.drawRect(0, 0, width, height);
		graphics.endFill();
	}
}


