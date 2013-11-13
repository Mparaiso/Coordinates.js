 

  
module coordinate.layouts.threedee {
	import ants =  coordinate.ants ;
	import events =  coordinate.events ;
	import layouts =  coordinate.layouts ;
	import nodes =  coordinate.nodes ;
	import threedee =  coordinate.nodes.threedee ;
	import proxyupdaters =  coordinate.proxyupdaters ;

	export class layouts.Layout3d extends layouts.Layout implements ILayout3d
	{
		 _x:Number;
		 _y:Number;
		 _z:Number;
		 _width:Number;
		 _height:Number;
		 _depth:Number;
		 _rotation:Number=0;
		 _jitterX:Number;
		 _jitterY:Number;
		 _jitterZ:Number;
		
		 _updateMethod:string=constants.layouts.LayoutUpdateMethod.UPDATE_AND_RENDER;
		 _updateFunction:Function=updateAndRender;
		
		 _proxyUpdater:proxyupdaters.IProxyUpdater;
		
		
		 get proxyUpdater():proxyupdaters.IProxyUpdater { return _proxyUpdater; }
		 set proxyUpdater(value:proxyupdaters.IProxyUpdater):void
		{
			this._updateMethod=value.name;
			this._updateFunction=value.update;
		}
		
		
		 get updateMethod():String { return this._updateMethod; }
		 set updateMethod(value:string):void 
		{ 
			this._updateMethod = value; 
			switch(value)
			{
				case constants.layouts.LayoutUpdateMethod.NONE:
					this._updateFunction=function():void {};
					break;
				case constants.layouts.LayoutUpdateMethod.UPDATE_ONLY:
					this._updateFunction=update;
					break;
				default :
					this._updateFunction=updateAndRender;
			}
		}
		
				
		 get rotation():Number { return this._rotation; }
		 set rotation(value:Number):void
		{
			this._rotation=value;
			this._updateFunction();
		}
		
		
		 get x():Number { return this._x; }	
		 set x(value:Number):void
		{
			this._x=value;
			this._updateFunction();
		}
		
		
		 get y():Number { return this._y; }
		 set y(value:Number):void
		{
			this._y=value;
			this._updateFunction();
		}
		
		
		 get z():Number { return this._z; }
		 set z(value:Number):void
		{
			this._z=value;
			this._updateFunction();
		}
		
		
		 get width():Number { return this._width; }
		 set width(value:Number):void
		{
			this._width=value;
			this._updateFunction();
		}
		
		
		 get height():Number { return this._height; }
		 set height(value:Number):void
		{
			this._height=value;
			this._updateFunction();
		}		
		
		
		 get depth():Number { return this._depth; }
		 set depth(value:Number):void
		{
			this._depth=value;
			this._updateFunction();
		}
		
				
		 get jitterX():Number { return this._jitterX; }
		 set jitterX(value:Number):void
		{
			this._jitterX=value;
			this._updateFunction();
		}
		
				
		 get jitterY():Number { return this._jitterY; }	
		 set jitterY(value:Number):void
		{
			this._jitterY=value;
			this._updateFunction();
		}
		
				
		 get jitterZ():Number { return this._jitterZ; }	
		 set jitterZ(value:Number):void
		{
			this._jitterZ=value;
			this._updateFunction();
		}
		
				
		 layouts.Layout3d() {}
		
				
		  addToLayout(object:any,  moveToCoordinates:boolean=true):nodes.INode
		{
			throw(new Error('Method must be n by child class'));
			return null;
		}
		
		
		  removeNode(node:nodes.INode):void
		{
			super.removeNode(node);
			this._updateFunction();
			dispatchEvent(new events.CoordyNodeEvent(events.CoordyNodeEvent.REMOVE, node));
		}
		
		
		 clone():ILayout3d
		{
			throw(new Error('Method must be n by child class'));
			return null;
		}
		
		
		 executeUpdateMethod():void
		{
			_updateFunction();
		}
		
				
		 updateAndRender():void
		{
			this.update();
			this.render();
		}
		
				
		 update():void 
		{
			throw(new Error('Method must be n by child class'));
		}
		
		
		 render():void
		{
			var n:nodes.threedee.INode3d;
			for(var i=0; i<_size; i++)
			{
				n = this._nodes[i];
				if(!n.link) continue;
				n.link.x=n.x, n.link.y=n.y, n.link.z=n.z;
			}
			
		}
		
				
		 renderNode(node:nodes.threedee.INode3d):void
		{
			node.link.x=node.x, node.link.y=node.y, node.link.z=node.z;
		}
		
		
		 validateObject(object:any):boolean
		{
			if(	object.hasOwnProperty('x')&&
				object.hasOwnProperty('y')&&
				object.hasOwnProperty('z')&&
				object.hasOwnProperty('rotationX')&&
				object.hasOwnProperty('rotationY')&&
				object.hasOwnProperty('rotationZ')
			) return true;
			
			return false;
		}

	}
}