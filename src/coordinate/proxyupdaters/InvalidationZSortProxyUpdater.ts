 

  
 
 module coordinate.proxyupdaters
{
	import helpers =  coordinate.helpers ;
	import threedee =  coordinate.layouts.threedee ;
	
	import display =  flash.display ;
	import events =  flash.events ;
	
	export class InvalidationZSortProxyUpdater implements IProxyUpdater
	{
		public static  NAME:string='invalidationZSortUpdaterProxy';
		 _target:display.DisplayObjectContainer;
		 _layout:threedee.ILayout3d;
		
		
		 InvalidationZSortProxyUpdater(target:display.DisplayObjectContainer, layout:threedee.ILayout3d)
		{
			_target=target;
			_target.addEventListener(events.Event.ADDED_TO_STAGE, addedToStageHandler);
			_layout=layout;
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
			helpers.SimpleZSorter.sortLayout(_target, _layout);
		}
		
		
		 addedToStageHandler(event:events.Event):void
		{
			update();
		}

	}
}