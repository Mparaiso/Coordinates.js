package examples;
import com.somerandomdude.coordy.layouts.twodee.HorizontalLine;
import examples.advancedconcepts.NodeEvents;
import examples.basicconcepts.SwappingLayouts;
import examples.basicconcepts.TweenLayoutItems;
import examples.Data;
import examples.layouts2d.EllipseLayout;
import examples.layouts2d.FlowLayout;
import examples.layouts2d.GridLayout;
import examples.layouts2d.HorizontalLineLayout;
import examples.layouts2d.LatticeLayout;
import examples.layouts2d.ScatterLayout;
import examples.layouts2d.SpiralLayout;
import examples.layouts2d.StackLayout;
import examples.layouts2d.VerticalLineLayout;
import examples.layouts2d.WaveLayout;
import examples.layouts3d.Grid3dLayout;
import examples.layouts3d.Stack3dLayout;
import flash.display.DisplayObject;
import flash.display.Shape;
import flash.display.Sprite;
import flash.Lib;
import flash.text.TextField;
import flash.text.TextFieldAutoSize;
import flash.display.SimpleButton;
import flash.events.MouseEvent;
import flash.events.Event;
import com.somerandomdude.coordy.layouts.twodee.VerticalLine;
import haxe.Http;
import haxe.Json;
import haxe.Resource;
import nme.Assets;


class ExamplesList extends Sprite
{
	private var horizontalLayout:HorizontalLine;
	private var menu:DisplayObject;
	private var datas:Array<Data>;
	private var displayZone:DisplayZone;

public	function new()
	{
		super();
		init();
		var _datas:String = Assets.getText("assets/datas.json");
		onData(_datas);
	}
	
	function onData(_datas:String)
	{
		datas = Json.parse(_datas);
		horizontalLayout = new HorizontalLine(10);
		menu = new Menu(datas);
		addChild(menu);
		menu.addEventListener(MenuEvent.MESSAGE, onMessage);
		horizontalLayout.addNode(menu);
		displayZone = new DisplayZone(null);
		displayZone.addEventListener(Event.ADDED, onAddedDisplayZone);
		addChild(displayZone);
		displayZone.addChild(LayoutFactory.create(datas[1]._class));
		horizontalLayout.addNode(displayZone);
		menu.addEventListener(MenuEvent.MESSAGE, onMessage);
		horizontalLayout.updateAndRender();
	}
	
	function init()
	{
		var layouts:Array<Dynamic> = [];
	  new VerticalLineLayout();
		new HorizontalLineLayout();
		new GridLayout();
		new FlowLayout();
		new StackLayout();
		new WaveLayout();
		new SpiralLayout();
		new EllipseLayout();
		new LatticeLayout();
		new ScatterLayout();
		new Stack3dLayout();
		new Grid3dLayout();
		new NodeEvents();
		new TweenLayoutItems();
		new SwappingLayouts();
	}
	
	function onMessage(e:MenuEvent):Void
	{
		displayZone.addChild(LayoutFactory.create(e.message));
		horizontalLayout.updateFunction();
	}
	
	function onAddedDisplayZone(e:Event):Void
	{
		horizontalLayout.updateAndRender();
	}

}


