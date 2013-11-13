 

  
module coordinate.layouts.twodee {
	import ants =  coordinate.ants ;
	import events =  coordinate.events ;
	import layouts =  coordinate.layouts ;
	import nodes =  coordinate.nodes ;
	import twodee =  coordinate.nodes.twodee ;
	import twodee =  coordinate.nodes.twodee ;

	export class HorizontalLine extends Layout2d implements ILayout2d, layouts.IOrderedLayout
	{
		
		 _hPadding:Number;
		 _order:string;
		
				
		 get order():String { return this._order; }
		 set order(value:string):void
		{
			this._order=value;
			_updateFunction();
		}
		
				
		 get hPadding():Number { return this._hPadding; };
		 set hPadding(value:Number):void
		{
			this._hPadding=value;
			this._updateFunction();
		}
		
				
		 HorizontalLine(hPadding:Number=0, 
									x:Number=0, 
									y:Number=0, 
									jitterX:Number=0, 
									jitterY:Number=0):void
		{
			this._hPadding=hPadding;
			this._x=x;
			this._y=y;
			this._jitterX=jitterX;
			this._jitterY=jitterY;
		}
		
		
		  toString():String { return constants.LayoutType.HORIZONTAL_LINE; }
		
			
		  addNode(object:any=null, moveToCoordinates:boolean=true):nodes.INode
		{
			if(object&&!validateObject(object)) throw new Error('Object does not implement at least one of the following properties: "x", "y", "width", "rotation"');
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
			if(!validateObject(object)) throw new Error('Object does not implement at least one of the following properties: "x", "y", "width", "rotation"');
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
			if(!validateObject(object)) throw new Error('Object does not implement at least one of the following properties: "x", "y", "width", "rotation"');
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
			return new HorizontalLine(_hPadding, _x, _y, _jitterX, _jitterY);
		}
		
			
		  update():void
		{
			if(_size==0) return;
			var node:twodee.OrderedNode;
			
			this._nodes.sortOn("order", Array.NUMERIC);
			
			var xPos:Number=0;
			for(var i=0; i<this._size; i++)
			{	
				node = this._nodes[i];
				node.x=xPos+_x+(node.jitterX*this._jitterX);
				node.y = this._y;
				if(!node.link) continue;
				xPos+=node.link.width+_hPadding;
				
			}
		}
		
				
		 cleanOrder():void
		{
			
			this._nodes.sortOn("order", Array.NUMERIC);
			for(var i=0; i<this._size; i++)
			{
				
				this._nodes[i].order=i;
			}
		}
		
		  validateObject(object:any):boolean
		{
			if(super.validateObject(object)&&object.hasOwnProperty('width')) return true;
			
			return false;
		}
		
	}
}