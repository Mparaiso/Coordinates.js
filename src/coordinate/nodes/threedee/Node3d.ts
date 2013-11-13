 

  
module coordinate.nodes.threedee
{
	import nodes =  coordinate.nodes ;
	
	import display =  flash.display ;
	
	export class nodes.Node3d extends nodes.Node implements INode3d
	{
		 _x:Number=0;
		 _y:Number=0;
		 _z:Number=0;
		 _jitterX:Number=0;
		 _jitterY:Number=0;
		 _jitterZ:Number=0;
		 _rotationX:Number=0;
		 _rotationY:Number=0;
		 _rotationZ:Number=0;
		
		
		 get x():Number { return _x; }		
		 set x(value:Number):void { this._x=value; }
		
		
		 get y():Number { return _y; }		
		 set y(value:Number):void { this._y=value; }
		
		
		 get z():Number { return _z; }		
		 set z(value:Number):void { this._z=value; }
		
		
		 get jitterX():Number { return _jitterX; }		
		 set jitterX(value:Number):void { this._jitterX=Math.random()*value*((Math.random()>.5)?-1:1); }
		
		
		 get jitterY():Number { return _jitterY; }		
		 set jitterY(value:Number):void { this._jitterY=Math.random()*value*((Math.random()>.5)?-1:1); }
		
		
		 get jitterZ():Number { return _jitterZ; }		
		 set jitterZ(value:Number):void { this._jitterZ=value; }
		
				
		 get rotationX():Number { return this._rotationX; }	
		 set rotationX(value:Number):void { this._rotationX=value; }
		
				
		 get rotationY():Number { return this._rotationY; }	
		 set rotationY(value:Number):void { this._rotationY=value; }
		
				
		 get rotationZ():Number { return this._rotationZ; }	
		 set rotationZ(value:Number):void { this._rotationZ=value; }
		
				
		 nodes.Node3d(link:any=null, x:Number=0, y:Number=0, z:Number=0, jitterX:Number=0, jitterY:Number=0, jitterZ:Number=0)
		{
			super(link);
			this._x=x;
			this._y=y;
			this._z=z;
			this._jitterX=jitterX;
			this._jitterY=jitterY;
			this._jitterZ=jitterZ;
		}
		
				
		 clone():INode3d 
		{ 
			var n:nodes.Node3d = new nodes.Node3d(link, x, y, z, jitterX, jitterY, jitterZ);
			n.rotationX=_rotationX;
			n.rotationY=_rotationY;
			n.rotationZ=_rotationZ;
			return n; 
		}
		
		
		  toObject():any
		{
			return {x:_x, y:_y, z:_z, rotationX:_rotationX, rotationY:_rotationY, rotationZ:rotationZ};
		}

	}
}