 

  
module coordinate.nodes.twodee
{
	
	import display =  flash.display ;
	
	final export class EllipseNode extends Node2d implements INode2d
	{
		
				
		 EllipseNode(link:any=null, x:Number=0, y:Number=0, rotation:Number=0, jitterX:Number=0, jitterY:Number=0)
		{
			super(link, x, y, jitterX, jitterY);
			_rotation=rotation;
		}
		
			
		  clone():INode2d { return new EllipseNode(_link, _x, _y, _rotation, _jitterX, _jitterY); }
		
	}
}