package examples.layouts3d;
#if flash
import com.somerandomdude.coordy.helpers.SimpleZSorter;
import com.somerandomdude.coordy.proxyupdaters.InvalidationZSortProxyUpdater;
#end
import com.somerandomdude.coordy.layouts.threedee.Grid3d;
import examples.utils.Square;
import examples.utils.Square3D;
import net.badimon.five3D.display.Scene3D;
import net.badimon.five3D.display.Sprite3D;

/**
 * ...
 * @author marc paraiso
 */

class Grid3dLayout extends Scene3D
{

	public function new()
	{
		super();
		var grid3D:Grid3d = new Grid3d(500, 500, 200, 4, 4, 4);
		#if js
		this._viewDistance = 2000;
		#end
		#if flash
			grid3D.proxyUpdater = new InvalidationZSortProxyUpdater(this, grid3D);
		#end
		grid3D.validateObject = function(object:Dynamic) { return Std.is(object, Sprite3D); };
		grid3D.updateFunction = function() {
			grid3D.update();
			//render;
			for (node in grid3D.nodes) {
				if (node.link == null ) continue;
				var link:Sprite3D = cast(node.link, Sprite3D);
				link._x = node.x;
				link._y = node.y;
				link._z = node.z;
			}
		};
		for (i in 0...50) {
			var sprite3D:Sprite3D = new Sprite3D();
			sprite3D.addChild(new Square3D(100, Square.getRandomColor()));
						grid3D.addNode(sprite3D);

			addChild(sprite3D);
		}
		#if js
		sort();
		#end
		grid3D.updateFunction();
		
	}
	#if js
	function sort() {
		var objects:Array<Sprite3D> = [];
			for (i in 0...this.numChildren) {
				objects.push(cast(this.getChildAt(i),Sprite3D));
			}
		
				//this.removeChildren();
			
			objects.sort(function(x:Sprite3D, y:Sprite3D) {
					if (x._z > y._z) return 1;
					if (x._z == y._z) return 0;
					return -1;
			});
			var j = objects.length - 1;
			while (j >= 0) {
				this.addChild(objects[j]);
				j--;
			}
	}
	#end
	
}