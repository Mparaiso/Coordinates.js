 

  
module coordinate.layouts.threedee {
	import ants =  coordinate.ants ;
	import events =  coordinate.events ;
	import nodes =  coordinate.nodes ;
	import threedee =  coordinate.nodes.threedee ;

	export class Scatter3d extends Layout3d implements ILayout3d
	{
		
		 _jitter:Number;
		 _jitterRotation:boolean;
		
		
		 get jitter():Number { return this._jitter; } 
		 set jitter(value:Number):void
		{
			this._jitter=value;
			this._updateFunction();
		}
		
		
		 get jitterRotation():Boolean { return this._jitterRotation; } 
		 set jitterRotation(value:boolean):void
		{
			this._jitterRotation=value;
			this._updateFunction();
		}
		
				
		 Scatter3d(width:Number, 
								height:Number, 
								depth:Number, 
								jitter:Number=1, 
								x:Number=0, 
								y:Number=0, 
								z:Number=0, 
								jitterRotation:boolean=false):void
		{
			this._width = width;
			this._height = height;
			this._depth=depth;
			this._x = x;
			this._y = y;
			this._z = z;
			this._jitter=jitter;
			this._jitterRotation=jitterRotation;
			this._nodes = new Array();
		}
		
		
		  toString():String { return constants.LayoutType.SCATTER_3D; }
		
		
		  addNode(object:any=null, moveToCoordinates:boolean=true):nodes.INode
		{
			if(object&&!validateObject(object)) throw new Error('Object does not implement at least one of the following properties: "x", "y", "z", "rotationX", "rotationY", "rotationZ"');
			if(object&&linkExists(object)) return null;
			var p:int = (Math.round(Math.random())) ? -1:1;
			var xPos:Number = (((Math.random()*_width*_jitter))*p)+_x;
			p = (Math.round(Math.random())) ? -1:1;
			var yPos:Number = (((Math.random()*_height*_jitter))*p)+_y;
			p = (Math.round(Math.random())) ? -1:1;
			var zPos:Number = (((Math.random()*_depth*_jitter))*p)+_z;
			var node:threedee.ScatterNode3d = new threedee.ScatterNode3d(object,xPos,yPos,zPos,(_jitterRotation)?(Math.random()*p*360):0, (_jitterRotation)?(Math.random()*p*360):0, (_jitterRotation)?(Math.random()*p*360):0);
			node.xRelation=(node.x-this._width/2)/this._width/2;
			node.yRelation=(node.y-this._height/2)/this._height/2;
			node.zRelation=(node.z-this._depth/2)/this._depth/2;
			
			this.storeNode(node);
			
			if(object&&moveToCoordinates) object.x=node.x,object.y=node.y, object.z=node.z;
			
			dispatchEvent(new events.CoordyNodeEvent(events.CoordyNodeEvent.ADD, node));
			
			return node;
		}
			
			
		  addToLayout(object:any, moveToCoordinates:boolean=true):nodes.INode
		{
			if(!validateObject(object)) throw new Error('Object does not implement at least one of the following properties: "x", "y", "z", "rotationX", "rotationY", "rotationZ"');
			if(linkExists(object)) return null;
			var p:int = (Math.round(Math.random())) ? -1:1;
			var xPos:Number = (((Math.random()*_width*_jitter))*p)+_x;
			p = (Math.round(Math.random())) ? -1:1;
			var yPos:Number = (((Math.random()*_height*_jitter))*p)+_y;
			p = (Math.round(Math.random())) ? -1:1;
			var zPos:Number = (((Math.random()*_depth*_jitter))*p)+_z;
			var node:threedee.ScatterNode3d = new threedee.ScatterNode3d(object,xPos,yPos,zPos,(_jitterRotation)?(Math.random()*p*360):0, (_jitterRotation)?(Math.random()*p*360):0, (_jitterRotation)?(Math.random()*p*360):0);
			node.xRelation=(node.x-this._width/2)/this._width/2;
			node.yRelation=(node.y-this._height/2)/this._height/2;
			node.zRelation=(node.z-this._depth/2)/this._depth/2;
			
			this.storeNode(node);
			
			if(moveToCoordinates) node.link.x=node.x,node.link.y=node.y, node.link.z=node.z;
			
			dispatchEvent(new events.CoordyNodeEvent(events.CoordyNodeEvent.ADD, node));
			
			return node;
		}
		
		
		  render():void
		{
			for(var i=0; i<this._size; i++)
			{
				if(!_nodes[i].link) continue;
				this._nodes[i].link.x=this._nodes[i].x;
				this._nodes[i].link.y=this._nodes[i].y;
				this._nodes[i].link.z=this._nodes[i].z;
				this._nodes[i].link.rotationX=this._nodes[i].rotationX;
				this._nodes[i].link.rotationY=this._nodes[i].rotationY;
				this._nodes[i].link.rotationZ=this._nodes[i].rotationZ;
			}
		}
		
			
		  update():void
		{
			for(var i=0; i<this._size; i++)
			{
				_nodes[i].x=(_nodes[i].xRelation*this._width)+this._x;
				_nodes[i].y=(_nodes[i].yRelation*this._height)+this._y;
				_nodes[i].z=(_nodes[i].zRelation*this._depth)+this._z;
			}
		}
		
		
		 scatter():void
		{
			var p:Number;
			var xPos:Number;
			var yPos:Number;
			var zPos:Number;
			for(var i=0; i<this._size; i++)
			{
				p = (Math.round(Math.random())) ? -1:1;
				xPos = (((Math.random()*_width*_jitter))*p)+_x;
				p = (Math.round(Math.random())) ? -1:1;
				yPos = (((Math.random()*_height*_jitter))*p)+_y;
				p = (Math.round(Math.random())) ? -1:1;
				zPos = (((Math.random()*_depth*_jitter))*p)+_z;
				
				this._nodes[i].x=xPos;
				this._nodes[i].y=yPos;
				this._nodes[i].z=zPos;
			}
			this._updateFunction();
		}
		
		
		  clone():ILayout3d
		{
			return new Scatter3d(_width, _height, _depth, _jitter, _x, _y, _z, _jitterRotation);
		}
		
	}
}