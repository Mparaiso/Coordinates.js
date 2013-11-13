

module coordinate.helpers
{

	export class Vertex 
	{
		
		 x:Number;//position
		 y:Number;
		 z:Number;
		
		 screenX:Number;//toSreen position
		 screenY:Number;
				 depth:Number;
		 ratio:Number;
		 color:Number;
		
		 Vertex( X:Number = 0, Y:Number = 0, Z:Number = 0, C:uint = 0xFF000000 ) 
		{
			
			x = X;
			y = Y;
			z = Z;
			color = C;
			
			screenX = screenY = ratio = depth = 0;
			
		}
		
		 clone():Vertex
		{
			return new Vertex( x, y, z, color );
		}
		
	}
	
}
