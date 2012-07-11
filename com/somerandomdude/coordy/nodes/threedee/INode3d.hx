package com.somerandomdude.coordy.nodes.threedee;
import com.somerandomdude.coordy.nodes.INode;

interface INode3d implements INode {
	public var x(default, default);
	public var y(default, default);
	public var z(default, default);
	
	public var jitterX(default, default);
	public var jitterY(default, default);
	
	public var rotationX(default, default);
	public var rotationY(default, default);
	public var rotationZ(default, default);

	function clone():INode3d;
}