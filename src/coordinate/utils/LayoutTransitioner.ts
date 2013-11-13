 


module coordinate.utils
{
	import layouts =  coordinate.layouts ;
	import twodee =  coordinate.layouts.twodee ;
	
	export class LayoutTransitioner
	{
		private static var _tweenFunction:Function;
		
				
		static  set tweenFunction(value:Function):void { _tweenFunction=value; }
		
				
		static  syncNodesTo(layout:layouts.ICoreLayout):void
		{
			var i:Number;
			
			
			if(_tweenFunction==null) 
			{
				if(layoutinstanceofILayout2d) for(i=0; i<layout.size; i++) if(layout.nodes[i].link.z) layout.nodes[i].link.z=0;
				layout.updateAndRender();
				return;
			}
			for(i=0; i<layout.size; i++) _tweenFunction(layout.nodes[i]);
		}
		
		

	}
}