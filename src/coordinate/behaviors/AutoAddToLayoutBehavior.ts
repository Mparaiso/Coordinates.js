 

  
 
 module coordinate.behaviors
{
	import layouts =  coordinate.layouts ;
	
	import display =  flash.display ;
	import display =  flash.display ;
	import events =  flash.events ;
	
	export class AutoAddToLayoutBehavior
	{ 
		 _target:display.display.DisplayObjectContainer;
		 _layout:layouts.ILayout;
		
				
		 AutoAddToLayoutBehavior(target:display.display.DisplayObjectContainer, layout:layouts.ILayout)
		{
			_target=target;
			_layout=layout;
			
			_target.addEventListener(events.Event.ADDED, addedHandler);
			_target.addEventListener(events.Event.REMOVED, removedHandler);
		}
		
		
		 addedHandler(event:events.Event):void
		{
			if(event.target.parent!=_target) return;
			for(var i=0; i<_layout.size; i++) if(event.target==_layout.nodes[i].link) return;
			_layout.addToLayout(event.<display.DisplayObject>target, false);
			_layout.executeUpdateMethod();
		}
		
			
		 removedHandler(event:events.Event):void
		{
			if(event.target.parent!=_target) return;
			_layout.removeNodeByLink(event.<display.DisplayObject>target);
			_layout.executeUpdateMethod();
		}

	}
}