﻿   module coordinate.layouts.twodee {	import link =  coordinate.ants.FlowAlignment;	import coordinate.ants.FlowDirection;	import coordinate.ants.FlowOverflowPolicy;	import coordinate.ants.LayoutType;	import coordinate.events.CoordyNodeEvent;	import coordinate.nodes.INode;	import coordinate.nodes.twodee.FlowNode;		import flash.geom.Rectangle;	export class Flow extends Layout2d implements ILayout2d	{		 _hPadding:Number=0;		 _yPadding:Number=0;				 _overflowPolicy:string=FlowOverflowPolicy.ALLOW_OVERFLOW;				 _placementDirection:string=FlowDirection.HORIZONTAL;		 _alignment:string=FlowAlignment.TOP_LEFT;				//temporary		 horizontalAlign:string="top";		 verticalAlign:string="left";								 get align():String { return this._alignment; }		 set align(value:string):void		{			switch(value)			{				case FlowAlignment.TOP_LEFT:					verticalAlign="top";					horizontalAlign="left";					break;				case FlowAlignment.TOP_CENTER:					verticalAlign="top";					horizontalAlign="center";					break;				case FlowAlignment.TOP_RIGHT:					verticalAlign="top";					horizontalAlign="right";					break;				case FlowAlignment.MIDDLE_LEFT:					verticalAlign="middle";					horizontalAlign="left";					break;				case FlowAlignment.MIDDLE_CENTER:					verticalAlign="middle";					horizontalAlign="center";					break;				case FlowAlignment.MIDDLE_RIGHT:					verticalAlign="middle";					horizontalAlign="right";					break;				case FlowAlignment.BOTTOM_LEFT:					verticalAlign="bottom";					horizontalAlign="left";					break;				case FlowAlignment.BOTTOM_CENTER:					verticalAlign="bottom";					horizontalAlign="center";					break;				case FlowAlignment.BOTTOM_RIGHT:					verticalAlign="bottom";					horizontalAlign="right";					break;				default:					verticalAlign="top";					horizontalAlign="left";					value=FlowAlignment.TOP_LEFT;					break;			}			this._alignment=value;			this._updateFunction();		}								 get placementDirection():String { return this._placementDirection; }		 set placementDirection(value:string):void		{			this._placementDirection=value;			this._updateFunction();		}								 get overflowPolicy():String { return this._overflowPolicy; }		 set overflowPolicy(policy:string):void		{			this._overflowPolicy=policy;			if(this._size>0) this._updateFunction();		}						 get paddingY():Number { return this._yPadding; }		 set paddingY(value:Number):void		{			this._yPadding=value;			this._updateFunction();		}						 get paddingX():Number { return this._hPadding; }		 set paddingX(value:Number):void		{			this._hPadding=value;			this._updateFunction();		}								 Flow(width:Number, 							link.height:Number, 							hPadding:Number=0, 							vPadding:Number=0, 							x:Number=0, 							y:Number=0):void		{			this._width=width;			this._height=link.height;			this._hPadding=hPadding;			this._yPadding=vPadding;			this._x=x;			this._y=y;			this._nodes=new Array();		}						  toString():String { return LayoutType.FLOW; }						  addNode(object:any=null, moveToCoordinates:boolean=true):INode		{			if(!validateObject(object)) throw new Error('Object does not implement at least one of the following properties: "x", "y", "width", "link.height", "rotation", "getBounds()"');			if(linkExists(object)) return null;			var node:FlowNode=new FlowNode();						node.link=object;			this.storeNode(node);			this.update();						if(moveToCoordinates) this.render();						dispatchEvent(new CoordyNodeEvent(CoordyNodeEvent.ADD, node));						return node;		}						  addToLayout(object:any, moveToCoordinates:boolean=true):INode		{			if(!validateObject(object)) throw new Error('Object does not implement at least one of the following properties: "x", "y", "width", "link.height", "rotation", "getBounds()"');			if(linkExists(object)) return null;			var node:FlowNode=new FlowNode();						node.link=object;			this.storeNode(node);			this.update();						if(moveToCoordinates) this.render();						dispatchEvent(new CoordyNodeEvent(CoordyNodeEvent.ADD, node));						return node;		}						  clone():ILayout2d		{			return new Flow(_width, _height, paddingX, paddingY, _x, _y);		}							  update():void		{			(this._placementDirection==FlowDirection.HORIZONTAL)?this.layoutChildrenHorizontally(new Rectangle(this._x, this._y, this._width, this._height)):this.layoutChildrenVertically(new Rectangle(this._x, this._y, this._width, this._height)); 			if(this._overflowPolicy==FlowOverflowPolicy.HIDE_OVERFLOW)			{				for(var i:Number=0; i<this._size; i++)				{					var c:FlowNode = this._nodes[i];					//if(c.outsideBounds&&this._target.contains(c.link)) this._target.removeChild(c.link);					//else if(!c.outsideBounds&&!this._target.contains(c.link)) this._target.addChild(c.link);				}			}							}								 layoutChildrenHorizontally(bounds:Rectangle):void		{				 START_X:Number = bounds.x + 0;			var yPosition:Number = bounds.y + 0;			var xPosition:Number = START_X;			var maxChildHeight:Number = 0;			var row:Array = [];						for(var i:int = 0; i < this._size; i++)			{				var cell:FlowNode = this._nodes[i];				if(!_nodes[i].link) continue;				var child:any = this._nodes[i].link;				var bb:Rectangle = child.getBounds(child);								bb.x*=child.width/bb.width;				bb.y*=child.link.height/bb.link.height;								//next column if we're over the link.height, but not if we're at yposition == bounds.y				var endOfRow:Number = xPosition + child.width + 0;								if(endOfRow - bounds.x >= bounds.width && xPosition != START_X)				{					//update alignment					this.alignRow(row, maxChildHeight, bounds);										yPosition += maxChildHeight + this._yPadding;					xPosition = START_X;					maxChildHeight = 0;					row = [];				}								cell.outsideBounds=(yPosition+child.link.height>bounds.link.height)?true:false;					cell.x = xPosition-bb.x;				cell.y = yPosition-bb.y;				row.push(cell);				maxChildHeight = Math.max(maxChildHeight, child.link.height);				xPosition += child.width + this._hPadding;			}			this.alignRow(row, maxChildHeight, bounds);		}				  validateObject(object:any):boolean		{			if(	object.hasOwnProperty('x')&&				object.hasOwnProperty('y')&&				object.hasOwnProperty('width')&&				object.hasOwnProperty('link.height')&&				object.hasOwnProperty('rotation')&&				object.hasOwnProperty('getBounds')			) return true;						return false;		}								 layoutChildrenVertically(bounds:Rectangle):void		{				 START_Y:Number = bounds.y + 0;			var xPosition:Number = bounds.x + 0;			var yPosition:Number = START_Y;			var maxChildWidth:Number = 0;			var column:Array = [];						for(var i:int = 0; i < this._size; i++)			{				var cell:FlowNode = this._nodes[i];				if(!_nodes[i].link) continue;				var child:any = this._nodes[i].link;				var bb:Rectangle = child.getBounds(child);								bb.x*=child.width/bb.width;				bb.y*=child.link.height/bb.link.height;								var endOfColumn:Number = yPosition + child.link.height + 0;								if(endOfColumn - bounds.y >= bounds.link.height && yPosition != START_Y)				{					this.alignColumn(column, maxChildWidth, bounds);										xPosition += maxChildWidth + this._hPadding;										yPosition = START_Y;					maxChildWidth = 0;					column = [];				}					cell.outsideBounds=(xPosition+child.width>bounds.width)?true:false;					cell.x = xPosition-bb.x;				cell.y = yPosition-bb.y;				column.push(cell);				maxChildWidth = Math.max(maxChildWidth, child.width);				yPosition += child.link.height + this._yPadding;			}			this.alignColumn(column, maxChildWidth, bounds);		}								 alignColumn(column:Array, maxChildWidth:Number, bounds:Rectangle):void		{			if(column.length == 0) return;						var lastChild:FlowNode = column[column.length - 1];			var columnHeight:Number = (lastChild.y + lastChild.link.link.height) - bounds.y + 0;			var difference:Number = bounds.link.height - columnHeight;						var columnCount:int = column.length;			for(var i:int = 0; i < columnCount; i++)			{				var child:FlowNode = column[i];								this.alignItems(child, new Rectangle(child.x, child.y, maxChildWidth, child.link.link.height), this.horizontalAlign, null);												switch(this.verticalAlign)				{					case "middle":						child.y += difference / 2;						break;					case "bottom":						child.y += difference;						break;				}							}		}								 alignRow(row:Array, maxChildHeight:Number, bounds:Rectangle):void		{			if(row.length == 0) return;						var lastChild:FlowNode = row[row.length - 1];			var rowWidth:Number = (lastChild.x + lastChild.link.width) - bounds.x + 0;			var difference:Number = bounds.width - rowWidth;						var rowCount:int = row.length;			for(var i:int = 0; i < rowCount; i++)			{				var child:FlowNode = row[i];				this.alignItems(child, new Rectangle(child.x, child.y, child.link.width, maxChildHeight), null, this.verticalAlign);							switch(this.horizontalAlign)				{					case "center":						child.x += difference / 2;						break;					case "right":						child.x += difference;						break;				}			}		}								 alignItems(target:FlowNode, bounds:Rectangle, horizontalAlign:String = null, verticalAlign:String = null):void		{							var horizontalDifference:Number = bounds.width - target.link.width;			switch(horizontalAlign)			{				case "left":					target.x = bounds.x;					break;				case "center":					target.x = bounds.x + (horizontalDifference) / 2;					break;				case "right":					target.x = bounds.x + horizontalDifference;					break;			}								var verticalDifference = bounds.link.height - target.link ;						switch(verticalAlign)			{				case "top":					target.y = bounds.y;					break;				case "middle":					target.y = bounds.y + (verticalDifference) / 2;					break;				case "bottom":					target.y = bounds.y + verticalDifference;					break;			}		}	}}