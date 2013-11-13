 

  
module coordinate.layouts.threedee {
	import ants =  coordinate.ants ;
	import ants =  coordinate.ants ;
	import events =  coordinate.events ;
	import layouts =  coordinate.layouts ;
	import nodes =  coordinate.nodes ;
	import threedee =  coordinate.nodes.threedee ;

	export class Stack3d extends Layout3d implements ILayout3d, layouts.IOrderedLayout
	{
		
		 _offset:Number;
		 _zOffset:Number;
		 _angle:Number;
		 _order:string;
		
				
		 get order():String { return this._order; }
		 set order(value:string):void
		{
			this._order=value;
			_updateFunction();
		}
		
				
		 get offset():Number { return this._offset; }
		 set offset(value:Number):void
		{
			this._offset=value;
			_updateFunction();
		}
		
				
		 get zOffset():Number { return this._zOffset; }
		 set zOffset(value:Number):void
		{
			this._zOffset=value;
			_updateFunction();
		}
		
					
		 get offsetAngle():Number { return this._angle; }
		 set offsetAngle(value:Number):void
		{
			this._angle=value;
			_updateFunction();
		}
		
				
		 Stack3d(angle:Number=45, 
								offset:Number=5, 
								zOffset:Number=5, 
								x:Number=0, 
								y:Number=0, 
								z:Number=0, 
								order:string=constants.StackOrder.ASCENDING, 
								jitterX:Number=0, 
								jitterY:Number=0, 
								jitterZ:Number=0):void
		{
			this._angle=angle;
			this._offset=offset;
			this._zOffset=zOffset;
			this._x=x;
			this._y=y;
			this._z=z;
			this._jitterX=jitterX;
			this._jitterY=jitterY;
			this._jitterZ=jitterZ;
			this._order=order;
		}
		
		
		  toString():String { return constants.LayoutType.STACK_3D; }
		
			
		  addNode(object:any=null, moveToCoordinates:boolean=true):nodes.INode
		{
			if(object&&!validateObject(object)) throw new Error('Object does not implement at least one of the following properties: "x", "y", "z", "rotationX", "rotationY", "rotationZ"');
			if(object&&linkExists(object)) return null;
			var node:threedee.OrderedNode3d = new threedee.OrderedNode3d(object, this._size);
			this.storeNode(node);
			this.cleanOrder();
			this.update();
			
			if(object&&moveToCoordinates) this.render();
			
			dispatchEvent(new events.CoordyNodeEvent(events.CoordyNodeEvent.ADD, node));
			
			return node;
		}	
			
		
		  addToLayout(object:any, moveToCoordinates:boolean=true):nodes.INode
		{
			if(!validateObject(object)) throw new Error('Object does not implement at least one of the following properties: "x", "y", "z", "rotationX", "rotationY", "rotationZ"');
			if(linkExists(object)) return null;
			var node:threedee.OrderedNode3d = new threedee.OrderedNode3d(object, this._size);
			this.storeNode(node);
			this.cleanOrder();
			this.update();
			
			if(moveToCoordinates) this.render();
			
			dispatchEvent(new events.CoordyNodeEvent(events.CoordyNodeEvent.ADD, node));
			
			return node;
		}
		
			
		 addToLayoutAt(object:any, index:Number, moveToCoordinates:boolean=true):nodes.INode
		{
			if(!validateObject(object)) throw new Error('Object does not implement at least one of the following properties: "x", "y", "z", "rotationX", "rotationY", "rotationZ"');
			if(linkExists(object)) return null;
			var node:threedee.OrderedNode3d = new threedee.OrderedNode3d(object,index,0,0,0);
			
			storeNodeAt(node, index);
			this.cleanOrder();
			this.update();
			
			
			if(moveToCoordinates) this.render();
			dispatchEvent(new events.CoordyNodeEvent(events.CoordyNodeEvent.ADD, node));
			
			return node;
		}
		
		
		  clone():ILayout3d
		{
			return new Stack3d(_angle, _offset, _zOffset, _x, _y, _z, _order, _jitterX, _jitterY, _jitterZ);
		}
		
			
		  update():void
		{
			if(!this._nodes) return;
			
			this.cleanOrder();
			var rad:Number = this._angle*Math.PI/180;
			if(this._order==constants.StackOrder.ASCENDING) this._nodes.sortOn("order", Array.NUMERIC|Array.DESCENDING);
			
			var node:threedee.OrderedNode3d;
			for(var i=0; i<this._size; i++)
			{
				node = this._nodes[i];
				node.x=this._x+(Math.cos(rad)*_offset*i)+(node.jitterX*this._jitterX);
				node.y=this._y+(Math.sin(rad)*_offset*i)+(node.jitterY*this._jitterY);
				node.z=this._z+(_zOffset*i)+(node.jitterZ*this._jitterZ);
			}
		}
		
				
		 cleanOrder():void
		{
			this._nodes.sortOn("order", Array.NUMERIC);
			
			for(var i=0; i<this._size; i++) { this._nodes[i].order=i; }
		}
		
	}
}