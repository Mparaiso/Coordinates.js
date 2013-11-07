///<reference path="../nodes/Node.ts"/>


module coordinate.layouts
{
    
    export interface ICoreLayout
    {
        nodes:Array;
        size:number;
        
         addNodes(count:number):void;
         addNode(object:Object, moveToCoordinates:Boolean):nodes.INode;
         addToLayout(object:Object, moveToCoordinates:Boolean):nodes.INode;
         getNodeByLink(link:Object):nodes.INode;
         getNodeIndex(node:nodes.INode):number;
         getNodeAt(index:number):nodes.INode;
         addLinkAt(object:Object, index:number):void;
         removeLinks():void;
         removeLinkAt(index:number):void;
         removeNode(node:nodes.INode):void;
         removeNodeByLink(object:Object):void;
         swapNodeLinks(nodeTo:nodes.INode, nodeFrom:nodes.INode):void;
        
         updateAndRender():void;
         update():void;
         render():void;
        
         toString():String;
         toJSON():String;
         toXML():String;
        
    }
}