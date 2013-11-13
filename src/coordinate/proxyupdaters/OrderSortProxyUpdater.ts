 

  
module coordinate.proxyupdaters
{
	import ants =  coordinate.ants ;
	import layouts =  coordinate.layouts ;
	import twodee =  coordinate.nodes.twodee ;
	
	import display =  flash.display ;
	import display =  flash.display ;
	
	export class OrderSortProxyUpdater implements IProxyUpdater
	{
		public static  NAME:string='orderSortUpdaterProxy';
		
		 get name():String { return NAME; }
		
		 _target:display.display.DisplayObjectContainer;
		 _layout:layouts.IOrderedLayout;
		
		
		
		 OrderSortProxyUpdater(target:display.display.DisplayObjectContainer, layout:layouts.IOrderedLayout)
		{
			_target=target;
			_layout=layout;
		}
		
		 update():void
		{
			if(!_layout.size) return;
			_layout.nodes.sortOn("order", Array.NUMERIC);
			if(_layout.order==constants.StackOrder.DESCENDING) _layout.nodes.reverse();
			var n:twodee.OrderedNode;
			for(var i=0; i<_layout.size; i++)
			{
				n=_layout.nodes[i];
				if(!n.link||!n.linkinstanceofDisplayObject) continue;
				_target.setChildIndex(_layout.nodes[i].link, i);
			}
		}

	}
}