 

  
 
 module coordinate.proxyupdaters
{
	import layouts =  coordinate.layouts ;
	
	import display =  flash.display ;
	import events =  flash.events ;
	
	export class InvalidationProxyUpdater implements IProxyUpdater
	{
		public static  NAME:string='invalidationUpdaterProxy';
		 _target:display.DisplayObjectContainer;
		 _layout:layouts.ILayout;
		
		
		 InvalidationProxyUpdater(target:display.DisplayObjectContainer, layout:layouts.ILayout)
		{
			_target=target;
			_target.addEventListener(events.Event.ADDED_TO_STAGE, addedToStageHandler);
			_layout=layout;
			
			_layout.proxyUpdater=this;
		}
		
		 get name():String { return NAME; }
		
		 update():void
		{
			if(!_target.stage) 
			{
				_layout.update();
				return;
			}
			_target.stage.addEventListener(events.Event.RENDER, renderHandler);
			_target.stage.invalidate();
		}
		
		
		 renderHandler(event:events.Event):void
		{
			_target.stage.removeEventListener(events.Event.RENDER, renderHandler);
			_layout.updateAndRender();			
		}
		
		
		 addedToStageHandler(event:events.Event):void
		{
			update();
		}

	}
}