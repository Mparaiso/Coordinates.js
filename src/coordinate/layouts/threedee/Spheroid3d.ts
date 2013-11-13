 

//TODO - Credit sphere rotation code


  
module coordinate.layouts.threedee {
	import ants =  coordinate.ants ;
	import events =  coordinate.events ;
	import helpers =  coordinate.helpers ;
	import helpers =  coordinate.helpers ;
	import nodes =  coordinate.nodes ;
	import threedee =  coordinate.nodes.threedee ;

	export class Spheroid3d extends Layout3d implements ILayout3d
	{
		
		private static  PI:Number=Math.PI;
		private static  PI_180:Number=PI/180;
		
		 _rotationY:Number=90;
		 _rotationZ:Number=90;
		
		 _verts:Array;
		 _radius:Number;
		
				
		 get radius():Number { return this._radius; }	
		 set radius(value:Number):void
		{
			this._radius=value;
			this._width=_radius*2;
			this._height=_radius*2;
			this._depth=_radius*2;
			this._updateFunction();
		}
		
		
		 get rotationX():Number { return this._rotation; }
		 set rotationX(value:Number):void
		{
			this._rotation=value;
			this._updateFunction();
		}
		
			
		 get rotationY():Number { return this._rotationY; }
		 set rotationY(value:Number):void
		{
			this._rotationY=value;
			this._updateFunction();
		}
		
				
		 get rotationZ():Number { return this._rotationZ; }
		 set rotationZ(value:Number):void
		{
			this._rotationZ=value;
			this._updateFunction();
		}
		
				
		 Spheroid3d(width:Number, 
								height:Number, 
								depth:Number, 
								x:Number=0, 
								y:Number=0, 
								z:Number=0, 
								rotation:Number=0, 
								rotationY:Number=0, 
								rotationZ:Number=0, 
								jitterX:Number=0, 
								jitterY:Number=0, 
								jitterZ:Number=0):void
		{
			
			this._nodes = new Array();
			this._width=width;
			this._height=height;
			this._depth=depth;
			this._x=x;
			this._y=y;
			this._z=z;
			this._jitterX=jitterX;
			this._jitterY=jitterY;
			this._jitterZ=jitterZ;
			this._rotation=rotation;
			this._rotationY=rotationY;
			this._rotationZ=rotationZ;
			this._radius=Math.max(this._width, this._height, this._depth);
		}
		
		
		  toString():String { return constants.LayoutType.SPHEROID_3D; }
		
		
		  addNode(object:any=null, moveToCoordinates:boolean=true):nodes.INode
		{
			if(object&&!validateObject(object)) throw new Error('Object does not implement at least one of the following properties: "x", "y", "z", "rotationX", "rotationY", "rotationZ"');
			if(object&&linkExists(object)) return null;
			var node:threedee.Node3d = new threedee.Node3d(object,0,0,0,Math.random()*((Math.random()>.5?1:-1)), Math.random()*((Math.random()>.5?1:-1)), Math.random()*((Math.random()>.5?1:-1)));
			this.storeNode(node);
			
			if(object&&moveToCoordinates) this.render();
			
			dispatchEvent(new events.CoordyNodeEvent(events.CoordyNodeEvent.ADD, node));
			
			return node;
		}
		
		
		
		  addToLayout(object:any,  moveToCoordinates:boolean=true):nodes.INode
		{
			if(!validateObject(object)) throw new Error('Object does not implement at least one of the following properties: "x", "y", "z", "rotationX", "rotationY", "rotationZ"');
			if(linkExists(object)) return null;
			var node:threedee.Node3d = new threedee.Node3d(object,0,0,0,Math.random()*((Math.random()>.5?1:-1)), Math.random()*((Math.random()>.5?1:-1)), Math.random()*((Math.random()>.5?1:-1)));
			this.storeNode(node);
			
			if(moveToCoordinates) this.render();
			
			dispatchEvent(new events.CoordyNodeEvent(events.CoordyNodeEvent.ADD, node));
			
			return node;
		}
		
				
		 distributeNodes(iterations:Number=25):void
		{
			this._verts = new Array();
			for(var i =0; i<this._size; i++)
			{
				var v:helpers.Vertex = new helpers.Vertex( Math.random()-.5, Math.random()-.5,Math.random()-.5 );
				this._verts.push(v);
			}
			
			this._verts = helpers.Distribute.distribute(this._verts, iterations);
		}
		
					
		  update():void
		{
			this._radius=Math.max(this._width, this._height, this._depth)/2;
			
			var rX:Number	= this._rotation*3.6 * PI_180;		
			var rY:Number	= this._rotationY*3.6 * PI_180;
			var rZ:Number	= this._rotationZ*3.6 * PI_180;
		
		
			for(var i =0; i<this._size; i++)
			{
				
				var c:threedee.Node3d = this._nodes[i];
				if(!_verts||!_verts[i]) continue;
				c.x=(this._verts[i].x*this._width/2);
				c.y=(this._verts[i].y*this._height/2);
				c.z=(this._verts[i].z*this._depth/2);
						
				var tempX:Number = (c.x * Math.cos(rY)) - (c.z * Math.sin(rY));
				var tempZ:Number = (c.x * Math.sin(rY)) + (c.z * Math.cos(rY));
			
				var dz:Number	 =  (tempZ * Math.cos(rX)) - (c.y * Math.sin(rX));
				var tempY:Number =  (tempZ * Math.sin(rX)) + (c.y * Math.cos(rX));
		
				var dx:Number	=  (tempX * Math.cos(rZ)) + (tempY * Math.sin(rZ));
				var dy:Number	=  (tempY * Math.cos(rZ)) - (tempX * Math.sin(rZ));
				
				c.x=(_x)+dx+(c.jitterX*this._jitterX);
				c.y=(_y)+dy+(c.jitterY*this._jitterY);
				c.z=(_z)+dz+(c.jitterZ*this._jitterZ);

			}
		}
		
			
		  clone():ILayout3d
		{
			return new Spheroid3d(this._width, this._height, this._depth, this._x, this._y, this._z, this._rotation, this._rotationY, this._rotationZ, this._jitterX, this._jitterY, this._jitterZ);
		}

	}
}