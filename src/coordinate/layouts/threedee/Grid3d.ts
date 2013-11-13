 

  
module coordinate.layouts.threedee {
	import ants =  coordinate.ants ;
	import events =  coordinate.events ;
	import nodes =  coordinate.nodes ;
	import threedee =  coordinate.nodes.threedee ;

	export class Grid3d extends Layout3d implements ILayout3d
	{
		
		 _rows:Number;
		 _columns:Number;
		 _layers:Number;
		 _hPadding:Number=0;
		 _yPadding:Number=0;
		 _zPadding:Number=0;
		 _maxNodes:Number;
		
		
		 get columns():uint { return _columns; }
		
		
		 get rows():uint { return _rows; }
		
		
		 get layers():uint { return _layers; }
		
		
		 set paddingX(value:Number):void
		{
			this._hPadding=value;
			this._updateFunction();
		}
		
		
		 set paddingY(value:Number):void
		{
			this._yPadding=value;
			this._updateFunction();
		}
		
		
		 set paddingZ(value:Number):void
		{
			this._zPadding=value;
			this._updateFunction();
		}
		
		
		 get paddingX():Number { return this._hPadding; }
		
		
		 get paddingY():Number { return this._yPadding; }
		
		
		 get paddingZ():Number { return this._zPadding; }
		
		
		 get cellWidth():Number { return this._nodes[0].width; }
		
		
		 get cellHeight():Number { return this._nodes[0].height; }
		
				
		 Grid3d(width:Number, 
								height:Number, 
								depth:Number, 
								columns:Number, 
								rows:Number, 
								layers:Number, 
								paddingX:Number=0, 
								paddingY:Number=0, 
								paddingZ:Number=0, 
								x:Number=0, 
								y:Number=0, 
								z:Number=0, 
								jitterX:Number=0, 
								jitterY:Number=0, 
								jitterZ:Number=0)
		{
			
			this._width=width;
			this._height=height;
			this._depth=depth;
			this._rows=rows;
			this._columns=columns;
			this._layers=layers;
			this._maxNodes=_rows*_columns*_layers;
			this._hPadding=paddingX;
			this._yPadding=paddingY;
			this._zPadding=paddingZ;
			this._x=x;
			this._y=y;
			this._z=z;
			this._jitterX=jitterX;
			this._jitterY=jitterY;
			this._jitterZ=jitterZ;
		}
		
			
		  toString():String { return constants.LayoutType.GRID_3D; }

		
		 getColumn(column:Number):Array
		{
			var c:Array = new Array();
			for(var i=0; i<_rows; i++)
			{
				c.push(_nodes[(i*_columns)+column]);
			}
			return c;
		}
		
		
		 getRow(row:Number):Array
		{
			var c:Array = new Array();
			for(var i=row*_columns; i<(row*_columns)+_columns; i++);
			{
				c.push(_nodes[i]);
			}
			return c;
		}
		
		
		 getLayer(layer:Number):Array
		{
			return new Array();
		}
		
		
		 removeItemAt(column:Number, row:Number):void
		{
			this.getNodeFromCoordinates(column, row).link=null;
		}
		
		
		 getNodeFromCoordinates(column:Number, row:Number):threedee.GridNode3d
		{
			return this._nodes[(row*_columns)+column];
		}
		
		
		  addNode(object:any=null, moveToCoordinates:boolean=true):nodes.INode
		{
			if(object&&!validateObject(object)) throw new Error('Object does not implement at least one of the following properties: "x", "y", "z", "rotationX", "rotationY", "rotationZ"');
			if(object&&linkExists(object)||_size>=_maxNodes) return null;
		
			var w:Number=(_width-((_columns-1)*_hPadding))/_columns;
			var h:Number=(_height-((_rows-1)*_yPadding))/_rows;
			var d:Number=(_depth-((_layers-1)*_zPadding))/_layers;
			
			var c:int = _size%_columns;
			var r:int = Math.floor(_size/(_rows))%_rows;
			var l:int = Math.floor(_size/(_rows*_columns));
				
			var node:threedee.GridNode3d = new threedee.GridNode3d(object,c,r,l,((w*c)+(c*_hPadding)+_x),((h*r)+(r*_yPadding)+_y),((d*l)+(l*_zPadding)+_z));
			storeNode(node);
			
			if(object&&moveToCoordinates) object.x=node.x, object.y=node.y, object.z=node.z;
			
			dispatchEvent(new events.CoordyNodeEvent(events.CoordyNodeEvent.ADD, node));
			
			return node;
		}
		
		
		  addToLayout(object:any, moveToCoordinates:boolean=true):nodes.INode
		{
			if(!validateObject(object)) throw new Error('Object does not implement at least one of the following properties: "x", "y", "z", "rotationX", "rotationY", "rotationZ"');
			if(object&&linkExists(object)||_size>=_maxNodes) return null;
		
			var w:Number=(_width-((_columns-1)*_hPadding))/_columns;
			var h:Number=(_height-((_rows-1)*_yPadding))/_rows;
			var d:Number=(_depth-((_layers-1)*_zPadding))/_layers;
			
			var c:int = _size%_columns;
			var r:int = Math.floor(_size/(_rows))%_rows;
			var l:int = Math.floor(_size/(_rows*_columns));
				
			var node:threedee.GridNode3d = new threedee.GridNode3d(object,c,r,l,((w*c)+(c*_hPadding)+_x),((h*r)+(r*_yPadding)+_y),((d*l)+(l*_zPadding)+_z));
			storeNode(node);
			if(moveToCoordinates) object.x=node.x, object.y=node.y, object.z=node.z;
			
			dispatchEvent(new events.CoordyNodeEvent(events.CoordyNodeEvent.ADD, node));
			
			return node;
		}
		
		
		  clone():ILayout3d
		{
			return new Grid3d(_width, _height, _depth, _columns, _rows, _layers, paddingX, paddingY, paddingZ, _x, _y, _z, _jitterX, _jitterY, _jitterZ);
		}
		
				
		  update():void
		{
			var total:int = _columns*_rows*_layers;
			
			var _w:Number=(_width-((_columns-1)*_hPadding))/_columns;
			var _h:Number=(_height-((_rows-1)*_yPadding))/_rows;
			var _d:Number=(_depth-((_layers-1)*_zPadding))/_layers;
			
			var c:Number;
			var r:Number;
			var l:Number;
			var node:threedee.GridNode3d;
			for(var i=0; i<_size; i++)
			{
				node = this._nodes[i];
				
				c = i%_columns;
				r = ((i/(_rows))>> 0)%_rows;
				l = (i/((_rows*_columns))) >> 0;
								
				node.x = ((_w*c)+(c*_hPadding)+_x)+(node.jitterX*this._jitterX);
				node.y = ((_h*r)+(r*_yPadding)+_y)+(node.jitterY*this._jitterY);
				node.z = ((_d*l)+(l*_zPadding)+_z)+(node.jitterZ*this._jitterZ);
				
			}
		}
	}
}