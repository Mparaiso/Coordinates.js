
module coordinate.layouts
{
    //import com.somerandomdude.coordy.nodes.INode;
    //import com.somerandomdude.coordy.proxyupdaters.IProxyUpdater;
    
    //import flash.display.DisplayObject;
    
    export interface ILayout extends ICoreLayout
    {
        updateMethod:String;
        
        proxyUpdater:Object;
        //function set proxyUpdater(value:IProxyUpdater):void;
        
        executeUpdateMethod():void;
        
    }
}