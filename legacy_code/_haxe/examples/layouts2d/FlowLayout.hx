package examples.layouts2d;

	import com.somerandomdude.coordy.layouts.twodee.Flow;
	import com.somerandomdude.coordy.layouts.twodee.ILayout2d;
	import examples.utils.Square;
	
	import flash.display.Sprite;

	
@:keep
class FlowLayout extends Sprite
{
	public static inline var SIZE:Int=50;
	public static inline var LAYOUT_WIDTH:Float=750;
	public static inline var LAYOUT_HEIGHT:Float=350;
	private var _layout:ILayout2d;
	
	public function new()
	{
		super();
		_layout = new Flow(LAYOUT_WIDTH-40, LAYOUT_HEIGHT-40);
		_layout.x = 20;
		_layout.y = 20;
		var c:Square;
		for(i in 0...SIZE)
		{
			c=new Square(3+(Math.random()*35*2),Square.getRandomColor());
			_layout.addNode(c);
			addChild(c);
		}
		
	}
	
}
