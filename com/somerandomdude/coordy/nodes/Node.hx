package com.somerandomdude.coordy.nodes;

class Node implements INode {
	//public var link(default, set_link):Dynamic;
	public var link(default, default):Dynamic;
	
	//function set_link(value:Dynamic):Dynamic {
		//link = value;
		//return link;
	//}
	/**
	 * Packages the node as a generic object - mainly used for exporting layout data.
	 *
	 * @return Generic object containing all the node's layout properties
	*/
	public function toObject():Dynamic
	{
		throw ('Method must be called in Node descendant');
		return null;
	}
}