package com.somerandomdude.coordy.helpers


	public class Vertex
	{
		
		public var x:Float;//position
		public var y:Float;
		public var z:Float;
		
		public var screenX:Int;//toSreen position
		public var screenY:Int;
		
		public var depth:Float;
		public var ratio:Float;
		public var color:uint;
		
		public function Vertex( X:Float = 0, Y:Float = 0, Z:Float = 0, C:uint = 0xFF000000 )
		{
			
			x = X;
			y = Y;
			z = Z;
			color = C;
			
			screenX = screenY = ratio = depth = 0;
			
		}
		
		public function clone():Vertex
		{
			return new Vertex( x, y, z, color );
		}
		
	}
	
}
