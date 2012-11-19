package com.somerandomdude.coordy.utils;

import com.somerandomdude.coordy.layouts.ICoreLayout;
import com.somerandomdude.coordy.layouts.twodee.ILayout2d;

class LayoutTransitioner
{
	
	private static var _tweenFunction(null, default):Dynamic->Dynamic;
	
	/**
	 *
	 * @param	layout
	 */
	public static function syncNodesTo(layout:ICoreLayout):Void
	{
		if (_tweenFunction==null)
		{
			if (Std.is(layout,ILayout2d)) {
				for (i in 0...layout.size) {
					if (layout.nodes[i].link.z) {
						layout.nodes[i].link.z = 0;
					}
				}
			}
			layout.updateAndRender();
			return;
		}
		for (i in 0...layout.size) {
			_tweenFunction(layout.nodes[i]);
		}
	}
	
	
}