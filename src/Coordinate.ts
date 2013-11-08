///<reference path="coordinate/events/IEventDispatcher.ts"/>
///<reference path="coordinate/events/Event.ts"/>
///<reference path="coordinate/events/EventDispatcher.ts"/>
///<reference path="coordinate/events/EventPhase.ts"/>

///<reference path="coordinate/constants.ts"/>

///<reference path="coordinate/nodes/Node.ts"/>
///<reference path="coordinate/nodes/twodee/INode2d.ts"/>
///<reference path="coordinate/nodes/twodee/Node2d.ts"/>
///<reference path="coordinate/nodes/twodee/OrderedNode.ts"/>
///<reference path="coordinate/nodes/twodee/FlowNode.ts"/>
///<reference path="coordinate/nodes/twodee/GridNode.ts"/>

///<reference path="coordinate/layouts/ILayout.ts"/>
///<reference path="coordinate/layouts/ICoreLayout.ts"/>
///<reference path="coordinate/layouts/Layout.ts"/>


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