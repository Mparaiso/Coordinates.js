 

  
module coordinate.nodes.threedee
{
	
	import display =  flash.display ;
	
	final export class ScatterNode3d extends Node3d implements INode3d
	{	
		
		 _xRelation:Number;
		 _yRelation:Number;
		 _zRelation:Number;
		
		
		 get xRelation():Number { return _xRelation; }
		 set xRelation(value:Number):void { this._xRelation=value; }
		
		
		 get yRelation():Number { return _yRelation; }
		 set yRelation(value:Number):void { this._yRelation=value; }
		
		
		 get zRelation():Number { return _zRelation; }
		 set zRelation(value:Number):void { this._zRelation=value; }
		
				
		 ScatterNode3d(link:any=null, x:Number=0, y:Number=0, z:Number=0, rotationX:Number=0, rotationY:Number=0, rotationZ:Number=0)
		{
			super(link, x, y, z);
			this._rotationX=rotationX;
			this._rotationY=rotationY;
			this._rotationZ=rotationZ;
		}

		
		  clone():INode3d 
		{ 
			var n:ScatterNode3d = new ScatterNode3d(link, x, y, z, rotationX, rotationY, rotationZ);
			n.xRelation=_xRelation;
			n.yRelation=_yRelation;
			n.zRelation=_zRelation;
			return n; 
		}
		
	}
}