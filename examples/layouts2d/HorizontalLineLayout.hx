package examples.layouts2d;

	import com.somerandomdude.coordy.layouts.twodee.HorizontalLine;
	import com.somerandomdude.coordy.layouts.twodee.ILayout2d;
	import examples.utils.Square;
	
	import flash.display.Sprite;

@:keep
class HorizontalLineLayout extends Sprite
{
	public static inline var SIZE:Int=20;
	public static  inline var LAYOUT_WIDTH:Float=600;
	public static  inline var LAYOUT_HEIGHT:Float=600;
	private var _layout:ILayout2d;
	
	public function new()
	{
		super();
		_layout = new HorizontalLine(5);
		_layout.y=LAYOUT_HEIGHT/2;
		var c:Square;
		for(i in 0...SIZE)
		{
			c = new Square(i+10, Square.getRandomColor());
			_layout.addNode(c);
			addChild(c);
		}
		
	}
	
}