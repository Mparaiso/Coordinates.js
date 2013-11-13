 

  
module coordinate.nodes.threedee
{
	import display =  flash.display ;
	
	export class GridNode3d extends Node3d implements INode3d
	{
		
		 _row:Number;
		 _column:Number;
		 _layer:Number;
		
		
		 get column():int { return _column; }
		 set column(value:Number):void { this._column=value; } 
		 
		 
		 get row():int { return _row; }
		 set row(value:Number):void { this._row=value; }
		
		
		 get layer():int { return _layer; }
		 set layer(value:Number):void { this._layer=value; }
		
			
		 GridNode3d(link:any=null, column:Number=-1, row:Number=-1, layer:Number=-1, x:Number=0, y:Number=0, z:Number=0, jitterX:Number=0, jitterY:Number=0, jitterZ:Number=0)
		{
			super(link, x, y, z, jitterX, jitterY, jitterZ);
			this._row=row;
			this._column=column;
			this._layer=layer;
		}
		
		
		  clone():INode3d 
		{ 
			var n:GridNode3d = new GridNode3d(link, column, row, layer, x, y, z, jitterX, jitterY, jitterZ);
			return n; 
		}
		
		
		  toObject():any
		{
			return {row:_row, column:_column, layer:_layer, x:_x, y:_y, z:_z};
		}
		
	}
}