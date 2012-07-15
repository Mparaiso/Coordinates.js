package examples;

import flash.events.Event;

class MenuEvent extends Event
{
	public var message(default, default):Dynamic;
	static public inline var MESSAGE:String = "message";
	
	public function new(type:String,message:Dynamic,bubbles:Bool=false,cancelable:Bool=false){
		super(type, bubbles, cancelable);
		this.message = message;
	}
	override public function clone():Event
	{
		return new MenuEvent(type, message, bubbles, cancelable);
	}
}

