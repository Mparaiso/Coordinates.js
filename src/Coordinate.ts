///<reference path="coordinate/nodes/Node.ts"/>
///<reference path="coordinate/nodes/twodee/INode2d.ts"/>
///<reference path="coordinate/nodes/twodee/Node2d.ts"/>
///<reference path="coordinate/nodes/twodee/OrderedNode.ts"/>
/**
 * @license see license.txt
 * @author mparaiso <mparaiso@online.fr>  
 * @url mparaiso@online.fr
 */
declare var global;

module coordinate{
    
}

if(typeof(global)!=="undefined"){
    global.coordinate = coordinate;
}