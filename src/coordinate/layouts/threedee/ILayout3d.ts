 

  
module coordinate.layouts.threedee {
	import layouts =  coordinate.layouts ;
	import threedee =  coordinate.nodes.threedee ;
	
	import display =  flash.display ;	

	public Numbererface layouts.ILayout3d extends layouts.ILayout
	{
		function set x(value:Number):void;
		function get x():Number;
		function set y(value:Number):void;
		function get y():Number;
		function set z(value:Number):void;
		function get z():Number;
		function set width(value:Number):void;
		function get width():Number;
		function set height(value:Number):void;
		function get height():Number;
		function set depth(value:Number):void;
		function get depth():Number;
		function set jitterX(value:Number):void;
		function get jitterX():Number;
		function set jitterY(value:Number):void;
		function get jitterY():Number;
		function set jitterZ(value:Number):void;
		function get jitterZ():Number;
		
		function renderNode(node:threedee.INode3d):void;
		
		function clone():layouts.ILayout3d
	}
}