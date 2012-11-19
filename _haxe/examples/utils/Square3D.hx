package examples.utils;
import flash.display.DisplayObject;
import flash.display.Sprite;
import net.badimon.five3D.display.Shape3D;

class Square3D extends Shape3D {
	public static function getRandomColor():Int {
		return new  hxColorToolkit.spaces.RGB(Math.random() * 256, Math.random() * 256, Math.random() * 256).getColor() ;
	}
	public function new(sideWidth:Float=10,color:Int=0xFF0000){
		super();
		draw(this,sideWidth,color);
	}
	public static function draw(ctx:Shape3D, sideWidth:Float = 10, color:Int = 0xFF0000):DisplayObject {
		ctx._graphics3D.lineStyle(0, 0x000000,0.6);
		ctx._graphics3D.beginFill(color);
		ctx._graphics3D.drawRect(0, 0, sideWidth, sideWidth);
		ctx._graphics3D.endFill();
		ctx._graphics3D.moveTo(sideWidth / 2, sideWidth / 2);
		ctx._graphics3D.lineTo(sideWidth / 2, sideWidth);
		return ctx;
	}
}