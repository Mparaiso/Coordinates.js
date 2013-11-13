 

module coordinate.layouts
{
	public Numbererface IOrderedLayout extends ILayout
	{
		function set order(value:string):void;
		function get order():string;
	}
}