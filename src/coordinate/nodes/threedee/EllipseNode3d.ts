 

  
module coordinate.nodes.threedee
{
	import display =  flash.display ;
	
	final export class EllipseNode3d extends Node3d implements INode3d
	{
				
		 EllipseNode3d(link:any=null, x:Number=0, y:Number=0, z:Number=0, rotationX:Number=0, rotationY:Number=0, rotationZ:Number=0, jitterX:Number=0, jitterY:Number=0, jitterZ:Number=0)
		{
			super(link, x, y, z, jitterX, jitterY, jitterZ);
			_rotationX=rotationX;
			_rotationY=rotationY;
			_rotationZ=rotationZ;
		}
		
		
		  clone():INode3d 
		{ 
			var n:EllipseNode3d = new EllipseNode3d(link, x, y, z, rotationX, rotationY, rotationZ, jitterX, jitterY, jitterZ);
			return n; 
		}		
	}
}