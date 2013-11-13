

  
module coordinate.layouts
{
	import json =  com.serialization.json ;
	import nodes =  coordinate.nodes ;
	
	import display =  flash.display ;
	import events =  flash.events ;
	
	export class Layout extends events.EventDispatcher
	{
		
		 _nodes:Array;
		 _size:Number;		
		
		
		 get size():int { return this._size; }
		
		
		 get nodes():Array { return this._nodes; }
		
				
		 Layout()
		{
			this._size=0;
		}
		
		  toString():String { return ""; }
		
		
		 toJSON():string
		{
			var nodes:Array = new Array();
			var layout:any = new Object();
			
			for(var i=0; i<_size; i++)
			{
				nodes.push(_nodes[i].toObject());
			}
			
			layout.type=toString();
			layout.size=_size;
			layout.nodes=nodes;
			
			return json.JSON.serialize(layout);
		}
		
		 addToLayout(object:any, moveToCoordinates:boolean=true):nodes.INode
		{
			throw(new Error('Method must be n by child class'));
			return null;
		}
		
		 addNode(object:any=null, moveToCoordinates:boolean=true):nodes.INode
		{
			throw(new Error('Method must be n by child class'));
			return null;
		}
		
		
		 addNodes(count:Number):void
		{
			for(var i=0; i<count; i++) addNode();
		}
		
		
		 toXML():XML
		{			
			var xml:XML = <layout></layout>;
			xml.@type = toString();
			xml.@size = _size;
			for(var i=0; i<_size; i++)
			{
				var node:XML = <node />
				var obj:any=_nodes[i].toObject();
				for(var j in obj)
				{
					node[String('@'+j)] = obj[j];
				}
    
    			xml.appendChild(node);
			}
			
			return xml;
		}
		
		
		 getNodeByLink(link:any):nodes.INode
		{
			for(var i;i<this._nodes.length;i++)
			{
				if(this._nodes[i].link==link) return this._nodes[i];
			}
			return null;
		}
		
		
		 getNodeIndex(node:nodes.INode):Number
		{
			for(var i=0; i<this._nodes.length; i++)
			{
				if(this._nodes[i]==node) return i;
			}
			return null;
		}
		
		
		 getNodeAt(index:Number):nodes.INode
		{
			return this._nodes[index];
		}
		
		
		 linkExists(link:any):boolean
		{
			for(var i=0; i<size; i++) if(link==_nodes[i].link) return true;
			return false;
		}
		
		
		 swapNodeLinks(nodeTo:nodes.INode, nodeFrom:nodes.INode):void
		{
			var tmpLink:any = nodeTo.link;
			nodeTo.link = nodeFrom.link;
			nodeFrom.link = tmpLink;
		}
		
		
		 removeLinks():void
		{
			for(var i=0; i<_nodes.length; i++) _nodes[i].link=null;
		}
		
		
		 removeLinkAt(index:Number):void
		{
			_nodes[index].link=null;
		}
		
		
		 removeNode(node:nodes.INode):void
		{
			_nodes.splice(getNodeIndex(node), 1);
			this._size--;
		}
		
		
		 removeAllNodes():void
		{
			this.clearNodes();
			this._size=0;
		}
		
		
		 removeNodeByLink(link:any):void
		{
			for(var i=0; i<_size; i++)
			{
				if(_nodes[i].link==link) removeNode(_nodes[i]);
			}
		}
		
		
		 addLinkAt(object:any, index:Number):void
		{
			_nodes[index].link=object;
		}
		
				
		 storeNode(node:nodes.INode):Number
		{
			if(!this._nodes) this._nodes=new Array();
			this._nodes.push(node);
			this._size++;
			
			return size;
		}
		
				
		 storeNodeAt(node:nodes.INode, index:Number):Number
		{
			if(!this._nodes) this._nodes=new Array();
			if(index>=0&&index<this._size) this._nodes.splice(index, 0, node);
			else this._nodes.push(node);
			this._size++;
			
			return size;
		}
		
					
		 getNextAvailableNode():nodes.INode
		{
			for(var i=0; i<this._nodes.length; i++)
			{
				if(!this._nodes[i].link) 
				{
					return this._nodes[i];
				}
			}
			return null;
		}
		
			
		 clearNodes():void
		{
			if(this._nodes)
			{
				for(var i in this._nodes)
				{
					delete this._nodes[i];
					this._nodes[i]=null;
				}
			}
			this._nodes=new Array();
		}

	}
}