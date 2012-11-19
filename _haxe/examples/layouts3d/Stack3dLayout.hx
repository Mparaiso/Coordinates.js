package examples.layouts3d;
import com.somerandomdude.coordy.layouts.threedee.Stack3d;
import examples.utils.Square;
import examples.utils.Square3D;
import net.badimon.five3D.display.Scene3D;
import net.badimon.five3D.display.Sprite3D;

/**
 * ...
 * @author marc paraiso
 */

class Stack3dLayout extends Scene3D
{

	public function new()
	{
		super();
		
		var stack3D:Stack3d = new Stack3d(45, 20, 60);
		stack3D.validateObject = function(object:Dynamic) { return Std.is(object, Sprite3D); };
		stack3D.updateFunction = function() {
			stack3D.update();
			//render;
			for (node in stack3D.nodes) {
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
			stack3D.addNode(sprite3D);
		}
		stack3D.updateFunction();
	}
	
}