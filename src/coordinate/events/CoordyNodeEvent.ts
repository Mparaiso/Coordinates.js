module coordinate.events
{
	import nodes =  coordinate.nodes ;
	
	import events =  flash.events ;

	export class CoordyNodeEvent extends events.Event
	{
		public static  ADD:string='coordyNodeAdd';
		public static  REMOVE:string='coordyNodeRemove';
		
		 _node:nodes.INode;
		
		 get node():nodes.INode { return _node; }
		
		 CoordyNodeEvent(type:string, node:nodes.INode, bubbles:boolean=false, cancelable:boolean=false)
		{
			_node=node;
			super(type, bubbles, cancelable);
			
		}
		
		  clone():events.Event { return new CoordyNodeEvent(type, _node, bubbles, cancelable); }
	}
}