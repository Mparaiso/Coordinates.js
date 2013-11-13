 

  
 module coordinate.nodes.twodee
{
	import display =  flash.display ;

	final export class FlowNode extends Node2d implements INode2d
	{
		 _outsideBounds:boolean;
		
				
		 FlowNode(link:any=null, x:Number=0, y:Number=0)
		{
			super(link, x, y);
		}
		
				
		 get outsideBounds():Boolean { return this._outsideBounds; }
		 set outsideBounds(value:boolean):void { this._outsideBounds=value; }
		
			
		  clone():INode2d 
		{ 
			var n:FlowNode = new FlowNode(_link, _x, _y);
			n.outsideBounds=_outsideBounds;
			return n; 
		}
		
	}
}