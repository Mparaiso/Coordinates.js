package examples.layouts3d;
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
			addChild(sprite3D);
			grid3D.addNode(sprite3D);
		}
		grid3D.updateFunction();
	}
	
}