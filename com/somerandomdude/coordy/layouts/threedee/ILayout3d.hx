package com.somerandomdude.coordy.layouts.threedee ;
import com.somerandomdude.coordy.layouts.ILayout;
import com.somerandomdude.coordy.nodes.threedee.INode3d;

interface ILayout3d implements ILayout {
	public var x(default, default);
	public var y(default, default);
	public var z(default, default);
	public var width(default, default);
	public var height(default, default);
	public var depth(default, default);
	public var jitterX(default, default);
	public var jitterY(default, default);
	public var jitter2(default, default);
	
	function renderNode(node:INode3d);
	function clone():ILayout3d;
}