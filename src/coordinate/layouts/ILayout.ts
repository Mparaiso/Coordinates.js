 

  

module coordinate.layouts
{
	import nodes =  coordinate.nodes ;
	import proxyupdaters =  coordinate.proxyupdaters ;
	
	import display =  flash.display ;
	
	public Numbererface ILayout extends ICoreLayout
	{
		function get updateMethod():string;
		function set updateMethod(value:string):void;
		
		function get proxyUpdater():proxyupdaters.IProxyUpdater;
		function set proxyUpdater(value:proxyupdaters.IProxyUpdater):void;
		
		function executeUpdateMethod():void;
		
	}
}