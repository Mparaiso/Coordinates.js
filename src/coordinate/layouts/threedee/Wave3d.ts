 

  
module coordinate.layouts.threedee {
	import ants =  coordinate.ants ;
	import ants =  coordinate.ants ;
	import ants =  coordinate.ants ;
	import events =  coordinate.events ;
	import nodes =  coordinate.nodes ;
	import threedee =  coordinate.nodes.threedee ;
	import threedee =  coordinate.nodes.threedee ;

	export class Wave3d extends Layout3d implements ILayout3d
	{
		 _frequency:Number;
		 _waveFunctionY:string;
		 _waveFunctionZ:string;
		 _functionY:Function=Math.sin;
		 _functionZ:Function=Math.cos;
		
		 _heightMultiplier:Number=0;
		 _depthMultiplier:Number=0;
		
		private static  PI:Number = Math.PI;
		private static  PI_180:Number = PI/180;
		
		 _alignType:string;
		 _alignAngleOffset:Number;
		
				
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

		
		 get waveFunctionY():String { return _waveFunctionY; }
		 set waveFunctionY(value:string):void
		{
			switch(value)
			{
				case constants.WaveFunction.SINE:
					_waveFunctionY=value;
					_functionY=Math.sin;
					break;
				case constants.WaveFunction.COSINE:
					_waveFunctionY=value;
					_functionY=Math.cos;
					break;
				case constants.WaveFunction.TAN:
					_waveFunctionY=value;
					_functionY=Math.tan;
					break;
				case constants.WaveFunction.ARCSINE:
					_waveFunctionY=value;
					_functionY=Math.asin;
					break;
				case constants.WaveFunction.ARCCOSINE:
					_waveFunctionY=value;
					_functionY=Math.acos;
					break;
				case constants.WaveFunction.ARCTAN:
					_waveFunctionY=value;
					_functionY=Math.atan;
					break;
				default:
					_waveFunctionY=constants.WaveFunction.SINE;
					_functionY=Math.sin;
			}
			this._updateFunction();
		}
		
		
		 get waveFunctionZ():String { return _waveFunctionZ; }
		 set waveFunctionZ(value:string):void
		{
			switch(value)
			{
				case constants.WaveFunction.SINE:
					_waveFunctionZ=value;
					_functionZ=Math.sin;
					break;
				case constants.WaveFunction.COSINE:
					_waveFunctionZ=value;
					_functionZ=Math.cos;
					break;
				case constants.WaveFunction.TAN:
					_waveFunctionZ=value;
					_functionZ=Math.tan;
					break;
				case constants.WaveFunction.ARCSINE:
					_waveFunctionZ=value;
					_functionZ=Math.asin;
					break;
				case constants.WaveFunction.ARCCOSINE:
					_waveFunctionZ=value;
					_functionZ=Math.acos;
					break;
				case constants.WaveFunction.ARCTAN:
					_waveFunctionZ=value;
					_functionZ=Math.atan;
					break;
				default:
					_waveFunctionZ=constants.WaveFunction.SINE;
					_functionZ=Math.sin;
			}
			this._updateFunction();
		}

		
		 get frequency():Number { return _frequency; }
		 set frequency(value:Number):void
		{
			this._frequency=value;
			this._updateFunction();
		}
		
		
		 get heightMultiplier():Number { return _heightMultiplier; }
		 set heightMultiplier(value:Number):void
		{
			this._heightMultiplier=value;
			this._updateFunction();
		}
		
		
		 get depthMultiplier():Number { return _depthMultiplier; }
		 set depthMultiplier(value:Number):void
		{
			this._depthMultiplier=value;
			this._updateFunction();
		}
		
				
		 Wave3d(width:Number, 
							height:Number, 
							depth:Number, 
							x:Number=0, 
							y:Number=0, 
							z:Number=0, 
							frequency:Number=1, 
							waveFunctionY:string=constants.WaveFunction.SINE,  
							waveFunctionZ:string=constants.WaveFunction.COSINE,
							jitterX:Number=0, 
							jitterY:Number=0, 
							jitterZ:Number=0,
							alignType:string=constants.PathAlignType.ALIGN_PERPENDICULAR, 
							alignOffset:Number=0):void
		{

			this._width=width;
			this._height=height;
			this._depth=depth;
			this._x=x;
			this._y=y;
			this._z=z;
			this._jitterX=jitterX;
			this._jitterY=jitterY;
			this._jitterZ=jitterZ;
			this._frequency=frequency;
			this.waveFunctionY=waveFunctionY;
			this.waveFunctionZ=waveFunctionZ;
			this._alignType=alignType;
			this.alignAngleOffset=alignOffset;
		}
		
		
		  toString():String { return constants.LayoutType.WAVE_3D; }
		
		
		  addNode(object:any=null, moveToCoordinates:boolean=true):nodes.INode
		{
			if(object&&!validateObject(object)) throw new Error('Object does not implement at least one of the following properties: "x", "y", "z", "rotationX", "rotationY", "rotationZ"');
			if(object&&linkExists(object)) return null;
			var node:threedee.Node3d = new threedee.Node3d(object,0,0,0,((Math.random()>.5)?-1:1)*Math.random(),((Math.random()>.5)?-1:1)*Math.random(),((Math.random()>.5)?-1:1)*Math.random());
			this.storeNode(<nodes.threedee.INode3d>node);
			this.update();
			
			if(object&&moveToCoordinates) this.render();
			
			dispatchEvent(new events.CoordyNodeEvent(events.CoordyNodeEvent.ADD, node));
			
			return node;
		}
		
		
		
		  addToLayout(object:any,  moveToCoordinates:boolean=true):nodes.INode
		{
			if(!validateObject(object)) throw new Error('Object does not implement at least one of the following properties: "x", "y", "z", "rotationX", "rotationY", "rotationZ"');
			if(linkExists(object)) return null;
			
			var node:threedee.Node3d = new threedee.Node3d(object,0,0,0,((Math.random()>.5)?-1:1)*Math.random(),((Math.random()>.5)?-1:1)*Math.random(),((Math.random()>.5)?-1:1)*Math.random());
			this.storeNode(<nodes.threedee.INode3d>node);
			this.update();
			
			if(moveToCoordinates) this.render();
			
			dispatchEvent(new events.CoordyNodeEvent(events.CoordyNodeEvent.ADD, node));
			
			return node;
		}
		
		
		  clone():ILayout3d
		{
			return new Wave3d(_width, _height, _depth, _x, _y, _z, _frequency, _waveFunctionY, _waveFunctionZ, _jitterX, _jitterY, _jitterZ);
		}
		
			
		  update():void
		{
			var c:threedee.Node3d;
			var r:Number = this._rotation*PI_180;
			
			for(var i=0; i<this._size; i++)
			{
				c = this._nodes[i];
				c.x = (i*(this._width/this._size))+_x+(c.jitterX*this._jitterX);
				c.y = ((_functionY((Math.PI*(i+1)/(this._size/2)+r)*_frequency)*((this._height+(_heightMultiplier*i))/2)))+_y+(c.jitterY*this._jitterY);
				
				//in future, add option to align wave to center or top by adding height/2 to all nodes' y property
				
				c.z = ((_functionZ((Math.PI*(i+1)/(this._size/2)+r)*_frequency)*((this._depth+(_depthMultiplier*i))/2)))+_z+(c.jitterZ*this._jitterZ);
				
				if(_functionY==Math.sin) c.rotationZ = Math.cos(PI*(i+1)/(_size/2)*_frequency)*180/PI;
				else if(_functionY==Math.cos) c.rotationZ = Math.sin(PI*(i+1)/(_size/2)*_frequency)*180/PI;
				else c.rotationZ = 0;
				
				if(this._alignType==constants.PathAlignType.ALIGN_PERPENDICULAR) c.rotationZ+=90; 
				c.rotationZ+=this._alignAngleOffset;
			}
		}
		
		
		  render():void
		{
			var c:threedee.Node3d;
			for(var i=0; i<this._size; i++)
			{
				c=this._nodes[i];
				if(!c.link) continue;
				c.link.x=c.x;
				c.link.y=c.y;
				c.link.z=c.z;
				
				if(this._alignType==constants.PathAlignType.NONE) continue;
				
				c.link.rotationZ=c.rotationZ;
			}
		}

	}
}