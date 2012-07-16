package examples.basicconcepts;
import com.eclecticdesignstudio.motion.Actuate;
import com.eclecticdesignstudio.motion.easing.Cubic;
import com.somerandomdude.coordy.constants.LayoutUpdateMethod;
import com.somerandomdude.coordy.layouts.twodee.Scatter;
import com.somerandomdude.coordy.nodes.twodee.INode2d;
import com.somerandomdude.coordy.nodes.twodee.Node2d;
import com.somerandomdude.coordy.utils.LayoutTransitioner;
import examples.utils.Circle;
import examples.utils.Square;
import flash.display.DisplayObject;
import flash.display.Shape;
import flash.display.Sprite;
import flash.events.Event;
import flash.events.MouseEvent;
import flash.Lib;
import flash.utils.Timer;
import flash.events.TimerEvent;
/**
 * ...
 * @author marc paraiso
 */

class TweenLayoutItems extends Sprite
{

	static inline var SIZE:Int = 100;
	static inline var LAYOUT_WIDTH:Float = Lib.current.stage.stageWidth;
	static inline var LAYOUT_HEIGHT:Float = Lib.current.stage.stageHeight;
	
	var scatter:Scatter;
	var tweens:Array<Dynamic>;
	private var i:Int;
	private var layoutTransitioner:LayoutTransitioner;
	private var squares:Array<Square>;
	
	public function new() {
		super();
		addEventListener(Event.ADDED_TO_STAGE, addedToStageHandler);
	}
	
	private function addedToStageHandler(e:Event):Void
	{
		removeEventListener(Event.ADDED_TO_STAGE, addedToStageHandler);
		init();
	}
	
	function init() {
	 /*
		* For explanations on basic setup and adding items to the layout, refer to the
		* 'AddChildren' and/or 'AddToLayout' example clases.
		*/
		scatter = new Scatter(LAYOUT_WIDTH, LAYOUT_HEIGHT, 0, 0, 1, true);
		scatter.updateMethod = LayoutUpdateMethod.NONE;
		var square:Square;
		squares = new Array<Square>();
		for (i in 0...SIZE) {
			square = new Square(10+Math.random()*10,Square.getRandomColor());
		  squares.push(square);
			addChild(square);
			scatter.addNode(square);
		}
		scatter.updateAndRender();
		layoutTransitioner = new LayoutTransitioner(scatter, tweenItem);
		/*
		* The LayoutTransitioner class is a way to more simply move individual nodes in a layout.
		* By defining the 'tweenFunction' property, you can tween all linked DisplayObjects in a
		* layout with a customized tween method.
		*
		* The tween method defined must take a node object as the parameter. When dealing with 2d
		* layouts, you should set the type as 'INode2d'. When dealing with 3d layouts, you should
		* set the type as 'INode3d'. See the 'tweenItem' method below for an example.
		*/
		
		var timer:Timer = new Timer(2000, 100);
		timer.addEventListener(TimerEvent.TIMER, tick);
		timer.start();
	}
	
	private function tick(e:TimerEvent):Void
	{
		updateItems();
	}
	

	
	function updateItems() {
		
		/*
		* The 'scatter()' method completely randomizes the layout. Otherwise, changing the width, height
		* (and depth if Scatter3d) will move the nodes in their proportionally-correct places - maintaing
		* the same scatter layout.
		*/
		scatter.scatter();
		/*
		* If a 'tweenFunction' is defined in the 'LayoutTransitioner' class, it will call that method
		* for each node in the layout. Otherwise it will simply update the node's x, y (and z if 3d) properties.
		*/
	  layoutTransitioner.syncNodesTo();
	}
	
	function tweenItem(node:INode2d) {
		#if js
			// it seems there is a bug with javascript and actuate related to the way actuate updates fields , so properties need to be updated manually
			var link:DisplayObject = cast(node.link, DisplayObject);
			var updateFunction = function(x:Float, y:Float, rotation:Float) {
				trace(link.x);
				link.x = x;
				link.y = y;
				link.rotation = rotation;
			}
			var tween = Actuate.update(updateFunction, 1 + Math.random() * 2, [link.x, link.y, link.rotation], [node.x, node.y, node.rotation],false).ease(Cubic.easeInOut);
		#else
			Actuate.tween(node.link, 1 + Math.random() * 2, { x:node.x, y:node.y, rotation:node.rotation } ).ease(Cubic.easeInOut);
		#end
	}
	
}

