package com.somerandomdude.coordy.utils;
import com.somerandomdude.coordy.nodes.twodee.OrderedNode;


class Utilities
{

	/** fonction d'aide pour le trie des noeux **/
	public static function sortOnOrderAscending(x:OrderedNode, y:OrderedNode):Int {
			if (x.order == y.order) return 0;
			if (x.order > y.order) return 1;
			return -1; //when  x.order<y.order
	}
	
	/** fonction d'aide pour le trie des noeux **/
	public static function sortOnOrderDescending(x:OrderedNode, y:OrderedNode):Int {
			if (x.order == y.order) return 0;
			if (x.order > y.order) return -1;
			return 1; //when  x.order<y.order
	}
	
}