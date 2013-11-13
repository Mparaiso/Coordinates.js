 
  
module coordinate.layouts.twodee {
	import ants =  coordinate.ants ;
	import ants =  coordinate.ants ;
	import events =  coordinate.events ;
	import layouts =  coordinate.layouts ;
	import nodes =  coordinate.nodes ;
	import twodee =  coordinate.nodes.twodee ;

	export class Stack extends Layout2d implements ILayout2d, layouts.IOrderedLayout
	{
		 _offset:Number;
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
		
				
		 get offsetAngle():Number { return this._angle; }
		 set offsetAngle(value:Number):void
		{
			this._angle=value;
			_updateFunction();
		}
		
				
		 Stack(angle:Number=45, 
							offset:Number=5, 
							x:Number=0, 
							y:Number=0, 
							order:string=constants.StackOrder.ASCENDING, 
							jitterX:Number=0, 
							jitterY:Number=0):void
		{
			this._angle=angle;
			this._offset=offset;
			this._x=x;
			this._y=y;
			this._jitterX=jitterX;
			this._jitterY=jitterY;
			this._order=order;
		}
		
		
		  toString():String { return constants.LayoutType.STACK; }
		
		
		  addNode(object:any=null, moveToCoordinates:boolean=true):nodes.INode
		{
			if(object&&!validateObject(object)) throw new Error('Object does not implement at least one of the following properties: "x", "y", "z", "rotationX", "rotationY", "rotationZ"');
			if(object&&linkExists(object)) return null;
			var node:twodee.OrderedNode = new twodee.OrderedNode(object, this._size);
			
			
			this.storeNode(node);
			this.cleanOrder();
			
			this.update();
			
			if(object&&moveToCoordinates) this.render();
			
			dispatchEvent(new events.CoordyNodeEvent(events.CoordyNodeEvent.ADD, node));
			
			return node;
		}
			
		 
		  addToLayout(object:any, moveToCoordinates:boolean=true):nodes.INode
		{
			if(!validateObject(object)) throw new Error('Object does not implement at least one of the following properties: "x", "y", "rotation"');
			if(linkExists(object)) return null;
			var node:twodee.OrderedNode = new twodee.OrderedNode(object, this._size);
			
			
			this.storeNode(node);
			this.cleanOrder();
			
			this.update();
			
			if(moveToCoordinates) this.render();
			
			dispatchEvent(new events.CoordyNodeEvent(events.CoordyNodeEvent.ADD, node));
			
			return node;
		}
		
			
		 addToLayoutAt(object:any, index:Number, moveToCoordinates:boolean=true):nodes.INode
		{
			if(!validateObject(object)) throw new Error('Object does not implement at least one of the following properties: "x", "y", "rotation"');
			if(linkExists(object)) return null;
			if(!_nodes) _nodes = new Array;
			var node:twodee.OrderedNode = new twodee.OrderedNode(object,index,0,0);
			
			storeNodeAt(node, index);
			this.cleanOrder();
			this.update();
			
			if(moveToCoordinates) this.render();
			
			dispatchEvent(new events.CoordyNodeEvent(events.CoordyNodeEvent.ADD, node));
			
			return node;
		}
		
		
		  clone():ILayout2d
		{
			return new Stack(_angle, _offset, _x, _y, _order, _jitterX, _jitterY);
		}
		
			
		  update():void
		{
			if(!this._nodes) return;
			
			this.cleanOrder();
			
			var rad:Number = this._angle*Math.PI/180;
			if(this._order==constants.StackOrder.ASCENDING) this._nodes.sortOn("order", Array.NUMERIC|Array.DESCENDING);
			
			var node:twodee.OrderedNode;
			for(var i=0; i<this._size; i++)
			{
				node=this._nodes[i];
				node.x=this._x+(Math.cos(rad)*_offset*i)+(node.jitterX*this._jitterX);
				node.y=this._y+(Math.sin(rad)*_offset*i)+(node.jitterY*this._jitterY);
			}
		}
		
				
		 cleanOrder():void
		{
			this._nodes.sortOn("order", Array.NUMERIC);
			for(var i=0; i<this._size; i++) this._nodes[i].order=i;
		}
		
	}
}