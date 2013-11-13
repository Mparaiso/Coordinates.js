 
  
module coordinate.layouts.twodee {
	import ants =  coordinate.ants ;
	import ants =  coordinate.ants ;
	import ants =  coordinate.ants ;
	import ants =  coordinate.ants ;
	import events =  coordinate.events ;
	import nodes =  coordinate.nodes ;
	import twodee =  coordinate.nodes.twodee ;

	export class Lattice extends Layout2d implements ILayout2d
	{
		
		 _order:string;
		 _rows:Number;
		 _columns:Number;
		 _paddingX:Number=0;
		 _paddingY:Number=0;
		 _columnWidth:Number;
		 _rowHeight:Number;
		 _latticeType:string=constants.LatticeType.SQUARE;
		 _alternate:string=constants.LatticeAlternationPattern.ALTERNATE_HORIZONTALLY;
		 _allowOverflow:boolean;
		 _maxCells:Number;
		
				
		 get latticeType():String { return _latticeType; }
		 set latticeType(value:string):void
		{
			_latticeType=value;
			_updateFunction();
		}
		
		
		 get alternate():String { return this._alternate; }
		 set alternate(value:string):void
		{
			this._alternate=value;
			this._updateFunction();
		}
		
		
		 get order():String { return _order; }
		 set order(value:string):void
		{
			this._order=value;
			this.adjustLattice();
			this._updateFunction();
		}
		
		
		 get allowOverflow():Boolean { return this._allowOverflow; }
		 set allowOverflow(value:boolean):void
		{
			this._allowOverflow=value;
		}
		
		
		  get width():Number { return _columnWidth*_columns; }
		  set width(value:Number):void
		{
			this._width=value;
			this._columnWidth = value/_columns;
			this._updateFunction();
		}

		
		  get height():Number { return _rowHeight*_rows; }
		  set height(value:Number):void
		{
			
			this._height=value;
			this._rowHeight = value/_rows;
			this._updateFunction();
		}
		
		
		 get paddingX():Number { return _paddingX; }
		 set paddingX(value:Number):void
		{
			this._paddingX=value;
			this._updateFunction();
		}

		
		 get paddingY():Number { return _paddingY; }
		 set paddingY(value:Number):void
		{
			this._paddingY=value;
			this._updateFunction();
		}
		
		
		 get columnWidth():Number { return this._columnWidth; }
		 set columnWidth(value:Number):void
		{
			this._columnWidth=value;
			this._updateFunction();
		}
		
		
		 get rowHeight():Number { return this._rowHeight; }
		 set rowHeight(value:Number):void
		{
			this._rowHeight=value;
			this._updateFunction();
		}
		
		
		 get rows():uint { return _rows; }
		 set rows(value:Number):void
		{
			this._rows=value;
			this._order=constants.LatticeOrder.ORDER_VERTICALLY;
			this.adjustLattice();
			this._updateFunction();
			this._maxCells=_rows*_columns;
		}
		
		
		 get columns():uint { return _columns; }
		 set columns(value:Number):void
		{
			this._columns=value;
			this._order=constants.LatticeOrder.ORDER_HORIZONTALLY;
			this.adjustLattice();
			this._updateFunction();
			this._maxCells=_rows*_columns;
		}
		
				
		 Lattice(width:Number, 
								height:Number, 
								columns:Number=1, 
								rows:Number=1, 
								allowOverflow:boolean=true, 
								order:string=constants.LatticeOrder.ORDER_HORIZONTALLY, 
								hPadding:Number=0, 
								vPadding:Number=0, 
								x:Number=0, 
								y:Number=0, 
								jitterX:Number=0, 
								jitterY:Number=0):void
		{
			
			this._paddingX=hPadding;
			this._paddingY=vPadding;
			this._x=x;
			this._y=y;
			this._columns=columns;
			this._rows=rows;
			this._columnWidth=width/columns;
			this._rowHeight=height/rows;
			this._width=width;
			this._height=height;
			this._maxCells=_rows*_columns;
			this._allowOverflow=allowOverflow;
			this._jitterX=jitterX;
			this._jitterY=jitterY;
			
		}
		
		
		  toString():String { return constants.LayoutType.LATTICE; }
		
		
		  addNode(object:any=null, moveToCoordinates:boolean=true):nodes.INode
		{
			if(object&&!validateObject(object)) throw new Error('Object does not implement at least one of the following properties: "x", "y", "z", "rotationX", "rotationY", "rotationZ"');
			if(object&&linkExists(object)) return null;
			if(!_allowOverflow&&size>=_maxCells) return null;
			
			var c:uint = (_order==constants.LatticeOrder.ORDER_VERTICALLY) ? (size)%_columns:(size)%Math.floor(((size)/_rows));
			var r:uint = (_order==constants.LatticeOrder.ORDER_VERTICALLY) ? Math.floor((size)/_columns):(size)%_rows;
			var node:twodee.GridNode = new twodee.GridNode(object, c,r);
			
			this.storeNode(node);
			this.adjustLattice();
			this.update();
			
			if(object&&moveToCoordinates) this.render();
			
			if(_order==constants.LatticeOrder.ORDER_VERTICALLY) this._columns = Math.ceil(this._size/_rows);
			else if(_order==constants.LatticeOrder.ORDER_HORIZONTALLY) this._rows = Math.ceil(this._size/_columns);
			
			dispatchEvent(new events.CoordyNodeEvent(events.CoordyNodeEvent.ADD, node));
			
			return node;
		}	
		
		
		  addToLayout(object:any, moveToCoordinates:boolean=true):nodes.INode
		{
			if(!validateObject(object)) throw new Error('Object does not implement at least one of the following properties: "x", "y", "rotation"');
			if(linkExists(object)) return null;
			if(!_allowOverflow&&size>=_maxCells) return null;
			
			var c:uint = (_order==constants.LatticeOrder.ORDER_VERTICALLY) ? (size)%_columns:(size)%Math.floor(((size)/_rows));
			var r:uint = (_order==constants.LatticeOrder.ORDER_VERTICALLY) ? Math.floor((size)/_columns):(size)%_rows;
			var node:twodee.GridNode = new twodee.GridNode(object, c,r);
			node.link=object;

			this.storeNode(node);
			this.adjustLattice();
			this.update();
			
			if(moveToCoordinates) this.render();
			
			if(_order==constants.LatticeOrder.ORDER_VERTICALLY) this._columns = Math.ceil(this._size/_rows);
			else if(_order==constants.LatticeOrder.ORDER_HORIZONTALLY) this._rows = Math.ceil(this._size/_columns);
			
			dispatchEvent(new events.CoordyNodeEvent(events.CoordyNodeEvent.ADD, node));
			
			return node;
			
		}
		
		
		  removeNode(node:nodes.INode):void
		{
			super.removeNode(node);
			this.adjustLattice();
			this._updateFunction();
		}
		
					
		  update():void
		{
			var node:twodee.GridNode;
			for(var i=0; i<this._size; i++)
			{
				node = this._nodes[i];
				if(!node) break;
							
				node.x = (node.column*(_columnWidth+_paddingX))+_x+(node.jitterX*this._jitterX);
				node.y = (node.row*(_rowHeight+_paddingY))+_y+(node.jitterY*this._jitterY);
				
				if(_latticeType == constants.LatticeType.DIAGONAL&&_alternate == constants.LatticeAlternationPattern.ALTERNATE_VERTICALLY&&node.row%2) node.x+=_columnWidth/2;
				else if(_latticeType == constants.LatticeType.DIAGONAL&&_alternate == constants.LatticeAlternationPattern.ALTERNATE_HORIZONTALLY&&node.column%2) node.y+=_rowHeight/2;	
			}
			
		}
		
		
		  clone():ILayout2d
		{
			return new Lattice(_width, _height, _columns, _rows, _allowOverflow, _order, _paddingX, _paddingY, _x, _y, _jitterX, _jitterY);
		}
		
				
		 adjustLattice():void
		{
			var c:Number;
			var r:Number;
			var node:twodee.GridNode;
			var i:Number; 
			
			if(_order==constants.LatticeOrder.ORDER_HORIZONTALLY)
			{
				for(i=0; i<this._size; i++)
				{
					node = this._nodes[i];
					if(!node) break;
					
					c = i%_columns;
					r = Math.floor(i/_columns);
									
					node.column=c;
					node.row=r;
				}
			} else
			{
				for(i=0; i<this._size; i++)
				{
					node = this._nodes[i];
					if(!node) break;
					
					c = Math.floor(i/_rows);
					r = i%_rows;
									
					node.column=c;
					node.row=r;
				}
			}
			
			if(_order==constants.LatticeOrder.ORDER_VERTICALLY) this._columns = Math.ceil(size/_rows);
			else if(_order==constants.LatticeOrder.ORDER_HORIZONTALLY) this._rows = Math.ceil(size/_columns);
		}				
	}
}