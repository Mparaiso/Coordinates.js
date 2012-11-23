package examples;

import flash.display.Sprite;
import flash.display.SimpleButton;
import flash.events.MouseEvent;
import flash.text.TextField;
import flash.text.TextFieldAutoSize;

class Button extends Sprite {
	private var __width:Float;
	private var __height:Float;
	private var __bg:Int;
	private var state_out:Sprite;
	private var state_over:Sprite;
	private var disabled(default, set_disabled):Bool;
	function set_disabled(value:Bool) {
		disabled = value;
		if (disabled) {
			useHandCursor = false;
			removeEventListener(MouseEvent.MOUSE_OVER, onMouseOver);
			removeEventListener(MouseEvent.MOUSE_OUT, onMouseOut);
		}else {
			useHandCursor = true;
			addEventListener(MouseEvent.MOUSE_OVER, onMouseOver);
			addEventListener(MouseEvent.MOUSE_OUT, onMouseOut);
		}
		return disabled;
	}
	public var command(default, set_command):String;
	function set_command(value:String) {
		if (value == null) disabled = true else disabled = false;
		return command = value;
	}
	
	public function new(text="some default text",command:String=null,width=200,height=20,bg=0xCCCCFF){
		super();
		
		this.command = command;
		this.__bg = bg;
		this.__width = width;
		this.__height = height;
		
		state_over = new Sprite();
		var b = new ButtonBg(__width, __height, __bg );
		b.alpha = 0.5;
		state_over.visible = false;
		state_over.addChild(b);
		addChild(state_over);

		state_out  = new Sprite();
		var b = new ButtonBg(__width, __height, __bg);
		b.alpha = 0.3;
		state_out.addChild(b);
		addChild(state_out);
		
		
		
		var label:TextField = new TextField();
		label.text = text;
		label.autoSize = TextFieldAutoSize.CENTER;
		label.height = height;
		label.width = width;
		label.y = height / 6;
		addChild(label);
	}
	
	private function onMouseOut(e:MouseEvent):Void
	{
		state_over.visible = false;
		
		state_out.visible =  ! state_over.visible;
	}
	
	private function onMouseOver(e:MouseEvent):Void
	{
		state_over.visible = true;
		state_out.visible = !state_over.visible;
	}
	

}

