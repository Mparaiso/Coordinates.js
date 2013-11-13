 
  
module coordinate.nodes.threedee
{
	import threedee =  coordinate.nodes.threedee ;
	
	import display =  flash.display ;

	export class OrderedNode3d extends threedee.Node3d
	{
		 _order:Number;
		
		
		 get order():Number { return this._order; }
		 set order(value:Number):void { this._order=value; }
		
				
		 OrderedNode3d(link:any=null, order:Number=0, x:Number=0, y:Number=0, z:Number=0, jitterX:Number=0, jitterY:Number=0, jitterZ:Number=0)
		{
			super(link, x, y, z, jitterX, jitterY, jitterZ);
			this._order=order;
		}
		
				
		  clone():INode3d 
		{ 
			var n:OrderedNode3d = new OrderedNode3d(link, order, x, y, z, jitterX, jitterY, jitterZ);
			return n; 
		}
		
		
		  toObject():any
		{
			return {order:_order, x:_x, y:_y, z:_z};
		}
		
	}
}