package examples.advancedconcepts;
	import com.eclecticdesignstudio.motion.Actuate;
	import com.eclecticdesignstudio.motion.easing.Cubic;
	import com.somerandomdude.coordy.constants.LayoutUpdateMethod;
	import com.somerandomdude.coordy.constants.PathAlignType;
	import com.somerandomdude.coordy.events.CoordyNodeEvent;
	import com.somerandomdude.coordy.layouts.twodee.Ellipse;
	import com.somerandomdude.coordy.nodes.twodee.Node2d;
	import examples.utils.Square;
	
	
	import flash.display.DisplayObject;
	import flash.display.Shape;
	import flash.display.Sprite;
	import flash.events.MouseEvent;
	import flash.events.TimerEvent;
	import flash.utils.Timer;
	
class NodeEvents extends Sprite {
	
	public static inline var SIZE:Int=50;
	public static inline var LAYOUT_WIDTH:Float=500;
	public static inline var LAYOUT_HEIGHT:Float=500;
	
	private var _layout:Ellipse;
	private var _angle:Float;
	private var _timer:Timer;
	
	private var _tweens:Array<Dynamic>;
	
	public function new()
	{
		super();
		_angle = 0;
		init();
	}
	
	private function init():Void
	{
		_layout = new Ellipse(LAYOUT_WIDTH, LAYOUT_HEIGHT);
		_layout.updateMethod = LayoutUpdateMethod.UPDATE_ONLY;
		
		/* Whenever a node is added or removed from a layout, it fires its corresponding
		* CoordyNodeEvent. This gives us an alternative method for handling the updating of
		* layouts when nodes are added or removed.
		*
		* In this case, when a node is added, the new node will be moved into place and all other
		* nodes in the layout will adjust to their new positions. Likewise, when a node is removed,
		* the linked DisplayObject will be removed from the stage and all nodes will be adjusted to their
		* newly calculated positions.
		*/
		_layout.addEventListener(CoordyNodeEvent.ADD, nodeAddHandler);
		_layout.addEventListener(CoordyNodeEvent.REMOVE, nodeRemoveHandler);
		_layout.x = LAYOUT_WIDTH / 2;
		_layout.y = LAYOUT_HEIGHT / 2;
		_layout.alignType=PathAlignType.ALIGN_PARALLEL;
		
		_timer = new Timer(1000, 50);
		_timer.addEventListener(TimerEvent.TIMER, timerHandler);
		_timer.start();
	}
	
	private function nodeAddHandler(event:CoordyNodeEvent):Void
	{
		
		var n:Node2d = cast(event.node,Node2d);
		if (n.link) cast(n.link,DisplayObject).x = Math.random() * 500;
		cast(n.link,DisplayObject).y = Math.random() * 500;
		
		moveItems();
	}
	
	private function nodeRemoveHandler(event:CoordyNodeEvent):Void
	{
		
		var n:Node2d = cast(event.node,Node2d);
		removeChild(cast(n.link,DisplayObject));
		
		moveItems();
	}
	
	private function moveItems():Void
	{
		var n:Node2d;
		Actuate.pauseAll();
		for(i in 0..._layout.size)
		{
			n=_layout.nodes[i];

			var link:DisplayObject = cast(n.link, DisplayObject);

			var actuator = Actuate.tween(link, 2*Math.random()*2, { x:n.x,y:n.y,rotation:n.rotation}, false );
			
		}
		Actuate.resumeAll();
	}
	
	private function timerHandler(event:TimerEvent):Void
	{
		var s:Square = new Square(20,Square.getRandomColor());
		addChild(s);
		_layout.addNode(s,false);
		s.addEventListener(MouseEvent.CLICK, itemClickHandler);
	}
	
	private function itemClickHandler(event:MouseEvent):Void
	{
		var t:Sprite = cast(event.target,Sprite);
		_layout.removeNodeByLink(t);
	}
}