 

  
module coordinate.layouts.twodee {
	import ants =  coordinate.ants ;
	import ants =  coordinate.ants ;
	import events =  coordinate.events ;
	import nodes =  coordinate.nodes ;
	import twodee =  coordinate.nodes.twodee ;
	import twodee =  coordinate.nodes.twodee ;
	
	import flash.display.*;

	export class Spiral extends Layout2d implements ILayout2d
	{		
		private static  PI:Number=Math.PI;
		 _alignType:string;
		 _alignAngleOffset:Number;
		 _circumference:Number;
		 _angleDelta:Number;
		 _spiralConstant:Number;
		
		 get angleDelta():Number { return this._angleDelta; }
		 set angleDelta(value:Number):void
		{
			this._angleDelta=value;
			this._updateFunction();
		}
		
		 get spiralConstant():Number { return this._spiralConstant; }
		 set spiralConstant(value:Number):void
		{
			this._spiralConstant=value;
			this._updateFunction();
		}
		
		 get circumference():Number { return this._circumference; }
		 set circumference(value:Number):void
		{
			this._circumference=value;
			this._updateFunction();
		}
		
		  set height(value:Number):void 
		{
			_height=value;
			_circumference=value;
			_updateFunction();
		}
		
		  set width(value:Number):void 
		{
			_width=value;
			_circumference=value;
			_updateFunction();
		}
		
				
		 get alignAngleOffset():Number { return this._alignAngleOffset; }
		 set alignAngleOffset(value:Number):void
		{
			this._alignAngleOffset=value;
			this._updateFunction();
		}
		
				
		 get alignType():String { return this._alignType; }
		 set alignType(value:string):void
		{
			this._alignType=value;
			this._updateFunction();
		}
		
				
		 Spiral(circumference:Number,
								spiralConstant:Number=.15,
								x:Number=0, 
								y:Number=0, 
								angleDelta:Number=30,
								rotation:Number=0, 
								jitterX:Number=0, 
								jitterY:Number=0, 
								alignType:string=constants.PathAlignType.NONE, 
								alignOffset:Number=0):void
		{
			this._circumference=circumference;
			this._x=x;
			this._y=y;
			this._jitterX=jitterX;
			this._jitterY=jitterY;
			this._rotation=rotation;
			this._angleDelta=angleDelta;
			this._spiralConstant=spiralConstant;
			this._alignType=alignType;
			this._alignAngleOffset=alignOffset;
		}
		
		
		  toString():String { return constants.LayoutType.ELLIPSE; }
		
		
		  addNode(object:any=null, moveToCoordinates:boolean=true):nodes.INode
		{
			if(object&&!validateObject(object)) throw new Error('Object does not implement at least one of the following properties: "x", "y", "z", "rotationX", "rotationY", "rotationZ"');
			if(object&&linkExists(object)) return null;
			var node:twodee.Node2d = new twodee.Node2d(object,0,0,((Math.random()>.5)?-1:1)*Math.random(),((Math.random()>.5)?-1:1)*Math.random());
			this.storeNode(node);
			
			this.update();
			
			if(object&&moveToCoordinates) this.render();
			
			dispatchEvent(new events.CoordyNodeEvent(events.CoordyNodeEvent.ADD, node));
			
			return node;
		}
		
		
		  addToLayout(object:any, moveToCoordinates:boolean=true):nodes.INode
		{
			if(!validateObject(object)) throw new Error('Object does not implement at least one of the following properties: "x", "y", "rotation"');
			if(linkExists(object)) return null;
			var node:twodee.Node2d = new twodee.Node2d(object,0,0,((Math.random()>.5)?-1:1)*Math.random(),((Math.random()>.5)?-1:1)*Math.random());
			this.storeNode(node);
			
			this.update();
			
			if(moveToCoordinates) this.render();
			
			dispatchEvent(new events.CoordyNodeEvent(events.CoordyNodeEvent.ADD, node));
			
			return node;
		}
		
			
		  renderNode(node:nodes.twodee.INode2d):void
		{
			super.renderNode(node);
			node.link.rotation=node.rotation;
		}
		
		
		  render():void
		{
			var c:twodee.Node2d;
			for(var i=0; i<this._size; i++)
			{
				c=this._nodes[i];
				c.link.x=c.x;
				c.link.y=c.y;
				c.link.rotation=(_alignType==constants.PathAlignType.NONE)?0:c.rotation;
			}
		}
		
		
		  clone():ILayout2d
		{
			return new Ellipse(_width, _height, _x, _y, _rotation, _jitterX, _jitterY, _alignType, _alignAngleOffset);
		}
		
			
		  update():void
		{
			var w:Number = this._width/2;
			var h:Number = this._height/2;
			var rOffset:Number = _rotation*(PI/180);
			var rad:Number;
			var c:twodee.Node2d;
			
			var phi:Number;
			
			for(var i=0; i<this._size; i++)
			{	
				c = this._nodes[i];
				
				phi = _angleDelta*i*PI/180;
				
				c.x = _x +  _circumference * Math.exp(_spiralConstant*phi) * Math.cos(phi)
				c.y = _y + _circumference * Math.exp(_spiralConstant*phi) * Math.sin(phi)
				
				c.rotation = Math.atan2((_y)-c.y, (_x)-c.x)*(180/PI);
				if(this._alignType==constants.PathAlignType.ALIGN_PERPENDICULAR) c.rotation+=90; 
				c.rotation+=this._alignAngleOffset;
				
			}
		}
		
		
		 rotateCellToTop(cell:nodes.twodee.INode2d):Number
		{
			var xR:Number = cell.link.x-(_x+_width/2);
			var yR:Number = cell.link.y-(_y+_height/2);
			
			var rads:Number = Math.atan2(yR*(_width/_height), xR);
			//rotation of individual object
			var a:Number = rads*(180/PI)+90;
			
			this.rotation=rotation-a;
			return a;
		}
	}

}