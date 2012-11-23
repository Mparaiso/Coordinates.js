package examples.utils;
import flash.display.DisplayObject;
import flash.display.Sprite;

class Square extends Sprite {
	public static function getRandomColor():Int {
		return new  hxColorToolkit.spaces.RGB(Math.random() * 256, Math.random() * 256, Math.random() * 256).getColor() ;
	}
	public function new(sideWidth:Float=10,color:Int=0xFF0000){
		super();
		draw(this,sideWidth,color);
	}
	public static function draw(ctx:Sprite,sideWidth:Float=10,color:Int=0xFF0000):DisplayObject{
		ctx.graphics.lineStyle(0, 0x000000,0.6);
		ctx.graphics.beginFill(color);
		ctx.graphics.drawRect(0, 0, sideWidth, sideWidth);
		ctx.graphics.endFill();
		ctx.graphics.moveTo(sideWidth / 2, sideWidth / 2);
		ctx.graphics.lineTo(sideWidth / 2, sideWidth);
		return ctx;
	}
}