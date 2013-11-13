 

  
module coordinate.nodes.threedee
{
	import nodes =  coordinate.nodes ;
	
	public Numbererface nodes.INode3d extends nodes.INode
	{
		function get z():Number;
		function set z(value:Number):void;
		function get jitterZ():Number;
		function get x():Number;
		function get y():Number;
		function get jitterX():Number;
		function get jitterY():Number;	
		function get rotationX():Number;
		function set rotationX(value:Number):void;
		function get rotationY():Number;
		function set rotationY(value:Number):void;
		function get rotationZ():Number;
		function set rotationZ(value:Number):void;
		
		
		function clone():nodes.INode3d;
	}
}