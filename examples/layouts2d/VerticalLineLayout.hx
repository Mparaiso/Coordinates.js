package examples.layouts2d;

	import com.somerandomdude.coordy.layouts.twodee.VerticalLine;
	import com.somerandomdude.coordy.layouts.twodee.ILayout2d;
	import examples.utils.Square;
	
	import flash.display.Sprite;

class VerticalLineLayout extends Sprite
{
	public static inline var SIZE:Int=50;
	public static  inline var LAYOUT_WIDTH:Float=350;
	public static  inline var LAYOUT_HEIGHT:Float=750;
	private var _layout:ILayout2d;
	
	public function new()
	{
		super();
		_layout = new VerticalLine(5);
		_layout.x=LAYOUT_WIDTH/2;
		var c:Square;
		for(i in 0...SIZE)
		{
			c = new Square(i+10, Square.getRandomColor());
			_layout.addNode(c);
			addChild(c);
		}
		
	}
	
}