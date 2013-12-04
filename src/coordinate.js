/* jslint browser:true */

/**
 * @copyright 2011 mparaiso <mparaiso@online.fr>
 */

(function(global){
    "use strict";

    /**************
     *  UTILITIES *
     **************/

    /**
     * extends a object with multiple other objects
     * @param {Object} [sources...] mutliple objects
     * @return {Object} the extended object
     */
    var _extend = function(){
        var destination={};
        var sources = [].slice.call(arguments);
        for(var i=0;i<sources.length;i++){
            for(var key in sources[i]){
                if(sources[i].hasOwnProperty(key)){
                    destination[key]=sources[i][key];
                }
            }
        }
        return destination;
    };
    var _defined=function(val){return typeof val !== "undefined";};
    var _undefined = function(val){ return ! _defined(val);};
    var assert = function(predicate,message){
        message = message || predicate;
        if(!predicate)
            throw "assertion error : "+message;
    };
    var coordinate = {
        nodes:{
            twodee:{},
            threedee:{}
        },
        layout:{
            twodee:{},
            threedee:{}
        },
        utils : {
            extend :_extend,
            defined:_defined,
            'undefined':_undefined
        },
        constants:{
            LayoutUpdateMethod:{
                NONE:"none",
                UPDATE_ONLY:"updateOnly",
                UPDATE_AND_RENDER:"updateAndRender"
            },
            GridLayoutDirection:{
                LEFT_TO_RIGHT:"leftToRight",
                RIGHT_TO_LEFT:"rightToLeft",
                TOP_TO_BOTTOM:"upToDown",
                BOTTOM_TO_TOP:"downToUp"
            },
            LayoutType:{
                ELLIPSE_3D:'Ellipse3d',
                GRID_3D:'Grid3d',
                SCATTER_3D:'Scatter3d',
                SNAPSHOT_3D:'Snapshot3d',
                SPHEROID_3D:'Sphere3d',
                STACK_3D:'Stack3d',
                WAVE_3D:'Wave3d',
                WAVE_ELLIPSE_3D:'WaveEllipse3d',
                ELLIPSE:'Ellipse',
                FLOW:'Flow',
                GRID:'Grid',
                HORIZONTAL_LINE:'HorizontalLine',
                LATTICE:'Lattice',
                SCATTER:'Scatter',
                SNAPSHOT:'Snapshot',
                STACK:'Stack',
                VERTICAL_LINE:'VerticalLine',
                WAVE:'Wave'
            }
        }
    };

    Object.freeze(coordinate.constants);

    /**************
     * RECTANGLE  *
     *************/

    var Rectangle = function(x,y,width,height){
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;
    };

    /**************
     *    NODES   *
     **************/

    /**
     * @constructor
     * @param {Object} link
     */
    coordinate.nodes.Node= function(link){
        this.link=link;
    };
    /**
     * @constructor
     * @param {Object} link
     * @param {Number} x
     * @param {Number} y
     * @param {Number} jitterX
     * @param {Number} jitterY
     */
    coordinate.nodes.twodee.Node2d=function(link,x,y,jitterX,jitterY){
        coordinate.nodes.Node.call(this,link);
        Object.defineProperty(this,"jitterX",{
            get:function(){return this._jitterX;},
            set:function(value){this._jitterX=Math.random()*value*((Math.random()>0.5)?-1:1);}
        });
        Object.defineProperty(this,"jitterY",{
            get:function(){return this._jitterY;},
            set:function(value){this._jitterY=Math.random()*value*((Math.random()>0.5)?-1:1);}
        });
        this.x=x;
        this.y=y;
        this.jitterX=jitterX;
        this.jitterY=jitterY;
    };
    coordinate.nodes.twodee.Node2d.prototype=Object.create(coordinate.nodes.Node);
    coordinate.nodes.twodee.Node2d.prototype.constructor=coordinate.nodes.Node;
    


    /**************
     * LAYOUTS 2D *
     **************/

    /**
     * @constructor
     */
    coordinate.layouts.Layout = function(){
        this._nodes=[];
    };
    coordinate.layouts.Layout.prototype = {
        /**
         * @return {Number}
         */
        get size(){return this._nodes.length;},
        /**
         * @return {Array}
         */
        get nodes(){return this._nodes;},
        addNode:function(object,moveToCoordinates){
            var node={link:object};
            this._nodes.push(node);
            return node;
        },
        /**
         * [addNodes description]
         * @param {Number} count
         */
        addNodes:function(count){
            assert(count>0 ,"count is positive");
            for(var i=0;i<count;i++){
                this.addNode();
            }
        },
        getNodeByLink:function(link){
            return this._nodes.filter(function(n){return n.link===link;})[0];
        },
        getNodeIndex:function(node){
            return this._nodes.indexOf(node);
        },
        getNodeByIndex:function(node){
            return this._nodes.filter(function(n){return n===node;})[0];
        },
        getNodeAt:function(index){
            return this._nodes[index];
        },
        /**
         * @return {Boolean}
         */
        linkExists:function(link){
            return this._nodes.some(function(n){return n.link === link;});
        },
        swapNodeLinks:function(nodeTo,nodeFrom){
            var tmpLink = nodeTo.link;
            nodeTo.link=nodeForm.link;
            nodeFrom.link = tmpLink;
        },
        removeLinks:function(){
            this._nodes.forEach(function(node){node.link=null;});
        },
        removeLinkAt:function(index){
            if(this._nodes[index])
                this._nodes[index].link=null;
        },
        removeNode:function(node){
            return this._nodes.splice(_this.getNodeIndex(node),1);
        },
        removeAllNodes:function(){
            return this._nodes.splice(0,this._nodes.length);
        },
        removeNodeByLink:function(link){
            return this._nodes.splice(this.getNodeIndex(this.getNodeByLink(link)),1);
        },
        addLinkAt:function(link,index){
            this._nodes[index].link = link;
        },
        storeNode:function(node){
            this._nodes.push(node);
        },
        storeNodeAt:function(node,index){
            assert((index % 1)===0,"index is a Integer");
            this._nodes[index]= node;
        },
        getNextAvailableNode:function(){
            return this._nodes.filter(function(node){return !(node.link);})[0];
        },
        clearNodes:function(){
            this._nodes=[];
        }

    };

    // Layout2d
    /**
     * @constructor
     */
    coordinate.layouts.twodee.Layout2d = function(){
        coordinate.layouts.Layout.apply(this,[].slice.call(arguments));
        this._rotation=0;
        this._updateMethod=coordinate.constants.LayoutUpdateMethod.UPDATE_AND_RENDER;
        this._updateFunction = this.updateAndRender;
    };
    coordinate.layouts.twodee.Layout2d.prototype=_extend(Object.create(coordinate.layouts.Layout),{
        constructor:coordinate.layouts.Layout,
        get proxyUpdater(){return this._proxyUpdater;},
        set proxyUpdater(value){this._updateMethod=value.name;this._updateFunction=value.update;},
        get updateMethod(){return this._updateMethod;},
        set updateMethod(value){
            this._updateMethod=value;
            switch(value){
                case coordinate.constants.LayoutUpdateMethod.NONE:
                    this._updateFunction=function(){};
                    break;
                case coordinate.constants.LayoutUpdateMethod.UPDATE_ONLY:
                    this._updateFunction=this.update;
                    break;
                default:
                    this._updateFunction=this.updateAndRender;
            }
        },
        get rotation() { return this._rotation; },
        set rotation(value){this._rotation=value;  this._updateFunction();},
        get y(){return this._y;},
        set y(value){this._y=value;this._updateFunction();},
        get x(){return this._x;},
        set x(value){this._x=value;this._updateFunction();},
        get width(){return this._width;},
        set width(value){this._width=value;this._updateFunction();},
        get height(){return this._height;},
        set height(value){this._height=value;this._updateFunction();},
        get jitterX(){return this._jitterY;},
        set jitterX(value){this._jitterX=value;this._updateFunction();},
        get jitterY(){return this._jitterY;},
        set jitterY(value){this._jitterY=value;this._updateFunction();},
        removeNode:function  (node) {
            coordinate.layout.Layout.removeNode(node);
            //@TODO completer
            this._updateFunction();
            //this.dispatchEvent(new NodeEvent(NodeEvent.REMOVE,node));
        },
        /**
         * Performs the update method defined by the <em>updateMethod</em> property. Is helpful for 
         * for behaviors and proxy updaters to work within the defined functiality set at runtime.
         */
        executeUpdateMethod:function(){
            this._updateFunction();
        },
        /**
         * Performs an update on all the nodes' positions and renders each node's corresponding link
         */
        updateAndRender:function(){
            this.update();
            this.render();
        },
        /**
         * Renders all layout property values to all objects in the collection
         */
        render:function  () {
            this._nodes.forEach((function(node){
                if(node.link)
                    this.renderNode(node);
            }).bind(this));
        },
        /**
         * Renders all layout property values of a specified node
         * @param  {coordinate.nodes.twodee.Node2d} node
         */
        renderNode:function(node){
            node.link.x=node.x;
            node.link.y=node.y;
        }
    });

    // Grid2d

    /**
     * @constructor
     * @param {Number} width
     * @param {Number} height
     * @param {Number} columns
     * @param {Number} rows
     * @param {Number} hPadding
     * @param {Number} vPadding
     * @param {Number} x
     * @param {Number} y
     * @param {Number} jitterX
     * @param {Number} jitterY
     */
    coordinate.layouts.twodee.Grid = function(width,height,columns,rows,hPadding,vPadding,x,y,jitterX,jitterY){
        coordinate.layouts.twodee.Layout2d.apply(this,[].slice.call(arguments));
        this._width=width;
        this._height=height;
        this._rows=rows;
        this._columns=columns;
        this._maxNodes=_rows*_columns;
        this._hPadding=hPadding||0;
        this._yPadding=vPadding||0;
        this._x=x||0;
        this._y=y||0;
        this._jitterX=jitterX||0;
        this._jitterY=jitterY||0;
    };
    coordinate.layouts.twodee.Grid.prototype= _extend(Object.create(coordinate.layouts.twodee.Layout2d),{
        constructor:coordinate.layouts.twodee.Layout2d,
        toString:function(){return coordinate.constants.LayoutType.GRID;},
        get columns(){return this._columns;},
        get rows(){return this._rows;},
        get horizontalDirection(){return this._hDirection;},
        set horizontalDirection(value){this._hDirection=value;this._updateFunction();},
        get verticalDirection(){return this._vDirection;},
        set verticalDirection(value){ this._vDirection=value;},
        get paddingX(){return this._hPadding;},
        set paddingX(value){
            this._hPadding=value;
            this._updateFunction();
        },
        get paddingY(){return this._yPadding;},
        set paddingY(value){this._yPadding=value;this._updateFunction();},
        get nodeWidth(){return this._width/this._columns;},
        get nodeHeight(){return this._height/this._rows;},
        getColumn:function(columnIndex){
            var c=[];
            for(var i=0;i<this._rows;i++){
                c.push(this._nodes[(i*this._columns)+columnIndex]);
            }
            return c;
        },
        /**
         * Get cell objects by row index
         * @param  {Integer} rowIndex
         * @return {Array}
         */
        getRow:function(rowIndex) {
            var r=[];
            for(var i=0;i<this._columns;i++){
                r.push(this._nodes[(i*this._columns)+rowIndex]);
            }
            return r;
        },
        /**
         * Removes cell link of DisplayObject at specified grid coordinates
         */
        removeItemAt:function(columnIndex,rowIndex){
            ths.getNodeFromCoordinates(columnIndex,rowIndex).link=null;
        },
        addItemAt:function(link,columnIndex,rowIndex,moveToCoordinates){
            moveToCoordinates = _undefined(moveToCoordinates) ? true : moveToCoordinates ;
            if(this.linkExists(link))return null;
            var node = this.getNodeFromCoordinates(columnIndex,rowIndex);
            node.link=link;
            if(moveToCoordinates){
                this.renderNode(node);
            }
            return node;
        },
        getNodeFromCoordinates:function(columnIndex,rowIndex){
            return this._nodes[(rowIndex*this._columns)+columnIndex];
        },
        addNode:function(link,moveToCoordinates){
            moveToCoordinates=_undefined(moveToCoordinates)?true:moveToCoordinates;
            if(this.linkExists(link))return null;
            var d=this.calculateCellSize();
            var c = this.size % this.columns;
            var r = Math.floor(this.size/(this._maxNodes/this.rows));
        },
        update:function(){
            var total=this._columns*this._rows;
            var d=this.calculateCellSize();
            var c,r,node;
            for(var i=0;i<this._size;i++){
                node=this._nodes[i];
                if(!node)break;
                c=i%this._columns;
                r=Math.floor(i/(total/this._rows));
                if(this._hDirection==coordinate.constants.GridLayoutDirection.RIGHT_TO_LEFT)
                    c=(this._columns-1)-c;
                if(this._vDirection==coordinate.constants.GridLayoutDirection.BOTTOM_TO_TOP)
                    r=(this._rows-1)-r;
                node.x=((d.width*c)+(c*this._hPadding)+this._x);
                node.y=((d.height*r)+(r*this._yPadding)+this._y);
            }
        },
        /**
         * @private
         * @return {Rectangle}
         */
        calculateCellSize:function(){
            return new Rectangle(0,0,(this._width-((this._columns-1)*this._hPadding))/this._columns,(this._height-((this._rows-1)*this._yPadding))/this._rows);
        }

    });
    


    global.coordinate = coordinate;

    if(module.exports){
        module.exports = coordinate;
    }

})((this));