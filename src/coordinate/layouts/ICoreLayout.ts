 

module coordinate.layouts
{
	import nodes =  coordinate.nodes ;
	
	import display =  flash.display ;
	
	public Numbererface ICoreLayout
	{
		function get nodes():Array;
		function get size():Number;
		
		function addNodes(count:Number):void;
		function addNode(object:any=null, moveToCoordinates:boolean=true):nodes.INode;
		function addToLayout(object:any, moveToCoordinates:boolean=true):nodes.INode;
		function getNodeByLink(link:any):nodes.INode;
		function getNodeIndex(node:nodes.INode):Number;
		function getNodeAt(index:Number):nodes.INode;
		function addLinkAt(object:any, index:Number):void;
		function removeLinks():void;
		function removeLinkAt(index:Number):void;
		function removeNode(node:nodes.INode):void;
		function removeNodeByLink(object:any):void;
		function swapNodeLinks(nodeTo:nodes.INode, nodeFrom:nodes.INode):void;
		
		function updateAndRender():void;
		function update():void;
		function render():void;
		
		function toString():string;
		function toJSON():string;
		function toXML():XML;
		
	}
}