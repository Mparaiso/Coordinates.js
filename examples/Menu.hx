package examples;

import com.somerandomdude.coordy.layouts.twodee.VerticalLine;
import com.somerandomdude.coordy.nodes.twodee.OrderedNode;
import examples.Data;
import flash.display.Sprite;
import flash.display.DisplayObject;
import flash.events.Event;
import flash.events.MouseEvent;

class Menu extends Sprite {
	
	private var menu:Array<DisplayObject>;
	private var menuLayout:VerticalLine;
	private var datas:Array<Data>;
	
	public function new(datas:Array<Data>){
		super();
		this.datas = datas;
		addEventListener(Event.ADDED_TO_STAGE, init);
		

	}
	
	private function init(e:Event):Void
	{
		removeEventListener(Event.ADDED_TO_STAGE, init);
		menu = [];
		menuLayout = new VerticalLine(5);
		for (data in datas) {
		//	trace(data.label);
			var b:Button = new Button(data.label, data._class);
			addChild(b);
			var node:OrderedNode = 	cast(menuLayout.addNode(b),OrderedNode);
	//	trace(node.order);
			if(data._class!=null){
				b.addEventListener(MouseEvent.MOUSE_UP, this.onClick);
			}
		}

		menuLayout.updateFunction();
	//	trace(menuLayout.toJSON());
	}
	
	private function onClick(e:MouseEvent):Void
	{
		dispatchEvent(new MenuEvent(MenuEvent.MESSAGE, cast(e.currentTarget, Button).command));
	}
	

	
}