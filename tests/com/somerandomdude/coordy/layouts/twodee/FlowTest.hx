package tests.com.somerandomdude.coordy.layouts.twodee;


import com.somerandomdude.coordy.layouts.twodee.Flow;
import flash.display.DisplayObject;
import flash.display.DisplayObjectContainer;
import haxe.unit.TestCase;
import jeash.RGB;
import nme.display.Sprite;
import nme.Lib;
import tests.CoordyTest;

class FlowTest extends TestCase {
	private var flow:Flow;
	private var scene:Sprite;
	private var squares:Array<DisplayObject>;
	override public function setup():Void
	{
		super.setup();
		flow = new Flow(200, 200);
	}
	
	function testNew() {
		print("\nnew");
		assertTrue(flow != null);
	}
	
	function testAddNode() {
		print("\naddNode");
		scene = new Sprite();
		scene.alpha = 0.3;
		squares = [];
		for (i in 0...10) {
			squares.push(new Square((i + 1) * 20, new  hxColorToolkit.spaces.RGB(Math.random()*256,Math.random()*256,Math.random()*256).getColor()  ));
			flow.addNode(squares[i]);
			scene.addChild(squares[i]);
		}
		assertEquals(10, flow.size);
		assertEquals(cast(20, Float), squares[1].x);
		assertEquals(cast(60, Float), squares[2].x);
		assertEquals(cast(0, Float), squares[3].x);
		trace("blop");
		CoordyTest._main.addChild(scene);
	}
	
}

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