package examples.utils;

import nme.display.Shape;

class Circle extends Shape {
	public function new(radius:Float) {
		super();
		graphics.lineStyle(1, 0x5d504f);
		graphics.beginFill(0xded3d1, 0.75);
		graphics.drawCircle(0, 0, radius);
		graphics.endFill();
		graphics.lineStyle(1, 0x5d504f);
		graphics.moveTo(0, 0);
		graphics.lineTo(0, radius);
	}
}