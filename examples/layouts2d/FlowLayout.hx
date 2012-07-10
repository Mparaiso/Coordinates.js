package examples.layouts2d;

import com.somerandomdude.coordy.layouts.twodee.Flow;
import com.somerandomdude.coordy.layouts.twodee.ILayout2d;
import examples.utils.Circle;
	
import nme.display.Sprite;

public class FlowLayout extends Sprite
{
	public static inline var SIZE:int=50;
	public static inline var LAYOUT_WIDTH:Number=750;
	public static inline var LAYOUT_HEIGHT:Number = 350;
	
	private var _layout:ILayout2d;
	
	public function new()
	{
		super();
		_layout = new Flow(LAYOUT_WIDTH-40, LAYOUT_HEIGHT-40);
		_layout.x=20, _layout.y=20;
		var c:Circle;
		for(var i:int=0; i<SIZE; i++)
		{
			c=new Circle(3+(Math.random()*35));
			_layout.addNode(c);
			addChild(c);
		}
		
	}
	
}
