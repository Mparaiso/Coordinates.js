 

  
module coordinate.layouts.twodee {
	import ants =  coordinate.ants ;
	import events =  coordinate.events ;
	import layouts =  coordinate.layouts ;
	import nodes =  coordinate.nodes ;
	import twodee =  coordinate.nodes.twodee ;
	import twodee =  coordinate.nodes.twodee ;

	export class VerticalLine extends Layout2d implements ILayout2d, layouts.IOrderedLayout
	{
		
		 _vPadding:Number;
		 _order:string;
		
				
		 get order():String { return this._order; }
		 set order(value:string):void
		{
			this._order=value;
			_updateFunction();
		}
		
		
		 get vPadding():Number { return this._vPadding; };
		 set vPadding(value:Number):void
		{
			this._vPadding=value;
			this._updateFunction();
		}
		
			
		 VerticalLine(vPadding:Number=0, 
									x:Number=0, 
									y:Number=0, 
									jitterX:Number=0, 
									jitterY:Number=0):void
		{
			this._vPadding=vPadding;
			this._x=x;
			this._y=y;
			this._jitterX=jitterX;
			this._jitterY=jitterY;
		}
		
		
		  toString():String { return constants.LayoutType.VERTICAL_LINE; }
		
			
		  addNode(object:any=null, moveToCoordinates:boolean=true):nodes.INode
		{
			if(object&&!validateObject(object)) throw new Error('Object does not implement at least one of the following properties: "x", "y", "height", "rotation"');
			if(object&&linkExists(object)) return null;
			var node:twodee.OrderedNode = new twodee.OrderedNode(object, this._size);
			
			this.storeNode(node);
			this.cleanOrder();
			
			this.update();
			
			if(object&&moveToCoordinates) this.render();
			
			dispatchEvent(new events.CoordyNodeEvent(events.CoordyNodeEvent.ADD, node));
			
			return node;
		}	
			
		 
		  addToLayout(object:any,  moveToCoordinates:boolean=true):nodes.INode
		{
			if(!validateObject(object)) throw new Error('Object does not implement at least one of the following properties: "x", "y", "height", "rotation"');
			if(linkExists(object)) return null;
			var node:twodee.OrderedNode = new twodee.OrderedNode(object, this._size);
			
			this.storeNode(node);
			this.cleanOrder();
			
			this.update();
			
			if(moveToCoordinates) this.render();
			
			dispatchEvent(new events.CoordyNodeEvent(events.CoordyNodeEvent.ADD, node));
			
			return node;
		}
		
			
		 addToLayoutAt(object:any, index:Number, moveToCoordinates:boolean=true):nodes.twodee.INode2d
		{
			if(!validateObject(object)) throw new Error('Object does not implement at least one of the following properties: "x", "y", "height", "rotation"');
			if(linkExists(object)) return null;
			if(!_nodes) _nodes = new Array;
			var node:twodee.OrderedNode = new twodee.OrderedNode(object,index,0,0);
			
			this.storeNodeAt(node, index);
			this.cleanOrder();
			this.update();
			
			if(moveToCoordinates) this.render();
			
			dispatchEvent(new events.CoordyNodeEvent(events.CoordyNodeEvent.ADD, node));
			
			return node;
		}
		
		
		  clone():ILayout2d
		{
			return new VerticalLine(_vPadding, _x, _y, _jitterX, this._jitterY);
		}
		
			
		  update():void
		{
			if(_size==0) return;
			var node:twodee.OrderedNode;
			
			this._nodes.sortOn("order", Array.NUMERIC);
			
			var yPos:Number=0;
			
			for(var i=0; i<this._size; i++)
			{	
				node = this._nodes[i];
				node.y=yPos+_y+(node.jitterY*this._jitterY);
				node.x = this._x+(node.jitterX*this._jitterX);
				if(!node.link) continue;
				yPos+=node.link.height+_vPadding;
			}
		}
		
				
		 cleanOrder():void
		{
			if(!this._nodes) return;
			this._nodes.sortOn("order", Array.NUMERIC);
			for(var i=0; i<this._size; i++)
			{
				this._nodes[i].order=i;
			}
		}
		
		  validateObject(object:any):boolean
		{
			if(super.validateObject(object)&&object.hasOwnProperty('height')) return true;
			
			return false;
		}
		
	}
}