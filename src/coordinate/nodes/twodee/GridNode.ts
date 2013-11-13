 

  
module coordinate.nodes.twodee
{
	import display =  flash.display ;
	
	export class GridNode extends Node2d implements INode2d
	{
		
		 _row:Number;
		 _column:Number;
		
				
		 GridNode(link:any=null, column:Number=-1, row:Number=-1, x:Number=0, y:Number=0, jitterX:Number=0, jitterY:Number=0)
		{
			super(link, x, y, jitterX, jitterY);
			this._row=row;
			this._column=column;
		}
		
				
		 get row():int { return _row; }
		 set row(value:Number):void { this._row=value; }
		
				
		 get column():int { return _column; }
		 set column(value:Number):void { this._column=value; }
		
			
		  clone():INode2d { return new GridNode(_link, _column, _row, _x, _y, _jitterX, _jitterY); }
		
		
		  toObject():any
		{
			return {row:_row, column:_column, x:_x, y:_y, rotation:_rotation};
		}
	}
}