module coordinate.nodes.twodee {

    import nodes = coordinate.nodes;	

	export interface INode2d extends nodes.INode {
		 x:Number;
		 y:Number;
		 jitterX:Number;
		 jitterY:Number;	
		 rotation:Number;
         
        clone():INode2d;
    }
}