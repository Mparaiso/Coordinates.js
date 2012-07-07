package com.somerandomdude.coordy.layouts.twodee;
import com.somerandomdude.coordy.constants.FlowAlignment;
import com.somerandomdude.coordy.constants.FlowDirection;
import com.somerandomdude.coordy.constants.FlowOverflowPolicy;
import com.somerandomdude.coordy.layouts.twodee.ILayout2d;
import com.somerandomdude.coordy.layouts.twodee.Layout2d;
import nme.geom.Rectangle;

/**
 * @author P.J. Onori ported for Haxe by M.Paraiso mparaiso@online.fr
 * @version 0.1
 * @url http://somerandomdude.com/
 */

class Flow extends Layout2d implements ILayout2d
{

  private var _hPadding;
	public var paddingX(get_paddingX, set_paddingX):Int;
	
  private var _yPadding;
	public var paddingY(get_paddingY, set_paddingY):Int;
	
  private var _overflowPolicy:String=FlowOverflowPolicy.ALLOW_OVERFLOW;

  private var _placementDirection:String = FlowDirection.HORIZONTAL;
	public var placementDirection(get_placementDirection, set_placementDirection):String;
	
  private var _alignment:String = FlowAlignment.TOP_LEFT;
	public var align(get_align, set_align):String;

  //temporary
  private var horizontalAlign:String="top";
  private var verticalAlign:String="left";

  /**
   * Method in which layout aligns nodes withing the layout's bounds
   *
   * @see com.somerandomdude.coordy.layouts.FlowAlignment
   *
   * @return Align value in string format
   *
   */
  public function get_align():String { return this._alignment; }
  public function set_align(value:String):String
  {
    switch(value)
    {
      case FlowAlignment.TOP_LEFT:
        verticalAlign="top";
        horizontalAlign="left";
      case FlowAlignment.TOP_CENTER:
        verticalAlign="top";
        horizontalAlign="center";
      case FlowAlignment.TOP_RIGHT:
        verticalAlign="top";
        horizontalAlign="right";
      case FlowAlignment.MIDDLE_LEFT:
        verticalAlign="middle";
        horizontalAlign="left";
      case FlowAlignment.MIDDLE_CENTER:
        verticalAlign="middle";
        horizontalAlign="center";
      case FlowAlignment.MIDDLE_RIGHT:
        verticalAlign="middle";
        horizontalAlign="right";
      case FlowAlignment.BOTTOM_LEFT:
        verticalAlign="bottom";
        horizontalAlign="left";
      case FlowAlignment.BOTTOM_CENTER:
        verticalAlign="bottom";
        horizontalAlign="center";
      case FlowAlignment.BOTTOM_RIGHT:
        verticalAlign="bottom";
        horizontalAlign="right";
      default:
        verticalAlign="top";
        horizontalAlign="left";
        value=FlowAlignment.TOP_LEFT;
    }
    this._alignment=value;
    this._updateFunction();
		return this._alignment;
  }

  /**
   * Direction in which the layout places nodes (horizontal or vertical)
   *
   * @see com.somerandomdude.coordy.layouts.FlowDirection
   *
   * @return String describing layout's placement direction
   *
   */
  public function get_placementDirection():String { return this._placementDirection; }
  public function set_placementDirection(value:String):String
  {
    this._placementDirection=value;
    this._updateFunction();
		return this._placementDirection;
  }

  /**
   * The method in which the layout handles nodes that do not fit within the bounds of the layout
   *
   * @see com.somerandomdude.coordy.layouts.FlowOverflowPolicy
   *
   * @return String describing layout's overflow policy
   *
   */
  public function get_overflowPolicy():String { return this._overflowPolicy; }
  public function set_overflowPolicy(policy:String):String
  {
    this._overflowPolicy=policy;
    if (this._size > 0) this._updateFunction();
		return this._overflowPolicy;
  }

  /**
   * Accessor for y padding property
   *
   * @return	Y padding of grid cells for layout organizer
   */
  public function get_paddingY():Int { return this._yPadding; }
  public function set_paddingY(value:Int):Int
  {
    this._yPadding=value;
    this._updateFunction();
		return this._yPadding;
  }

  /**
   * Accessor for x padding property
   *
   * @return	X padding of grid cells for layout organizer
   */
  public function get_paddingX():Int { return this._hPadding; }
  public function set_paddingX(value:Int):Int
  {
    this._hPadding=value;
    this._updateFunction();
		return this._hPadding;
  }
	


  /**
   * Distributes nodes in a flow layout.
   *
   * @param width			Width of the flow layout
   * @param height		Height of the flow layout
   * @param hPadding		Horizontal padding of all nodes in the layout
   * @param vPadding		Vertical padding of all nodes in the layout
   * @param x				x position of the flow layout
   * @param y				y position of the flow layout
   *
   */
  public function Flow(width:Int,
      height:Int,
      hPadding:Int=0,
      vPadding:Int=0,
      x:Int=0,
      y:Int=0):Void
  {
    this._width=width;
    this._height=height;
    this._hPadding=hPadding;
    this._yPadding=vPadding;
    this._x=x;
    this._y=y;
    this._nodes=new Array();
  }

  /**
   * Returns the type of layout in a string format
   *
   * @see com.somerandomdude.coordy.layouts.LayoutType
   * @return Layout's type
   *
   */
  override public function toString():String { return LayoutType.FLOW; }

  /**
   * Adds object to layout in next available position.
   *
   * @param  object  Object to add to layout
   * @param  moveToCoordinates  automatically move DisplayObject to corresponding nodes's coordinates
   *
   * @return newly created node object containing a link to the object
   */
  override public function addNode(object:Object=null, moveToCoordinates:Boolean=true):INode
  {
    if(!validateObject(object)) throw new Error('Object does not implement at least one of the following properties: "x", "y", "width", "height", "rotation", "getBounds()"');
    if(linkExists(object)) return null;
    var node:FlowNode=new FlowNode();

    node.link=object;
    this.storeNode(node);
    this.update();

    if(moveToCoordinates) this.render();

    dispatchEvent(new CoordyNodeEvent(CoordyNodeEvent.ADD, node));

    return node;
  }

  /**
   * Adds object to layout in next available position <strong>This method is depreceated.</strong>
   *
   * @param  object  Object to add to layout
   * @param  moveToCoordinates  automatically move DisplayObject to corresponding node's coordinates
   *
   * @return newly created node object containing a link to the object
   */
  override public function addToLayout(object:Object, moveToCoordinates:Boolean=true):INode
  {
    if(!validateObject(object)) throw new Error('Object does not implement at least one of the following properties: "x", "y", "width", "height", "rotation", "getBounds()"');
    if(linkExists(object)) return null;
    var node:FlowNode=new FlowNode();

    node.link=object;
    this.storeNode(node);
    this.update();

    if(moveToCoordinates) this.render();

    dispatchEvent(new CoordyNodeEvent(CoordyNodeEvent.ADD, node));

    return node;
  }

  /**
   * Clones the current object's properties (does not include links to DisplayObjects)
   *
   * @return Flow clone of object
   */
  override public function clone():ILayout2d
  {
    return new Flow(_width, _height, paddingX, paddingY, _x, _y);
  }

  /**
   * Updates the nodes' virtual coordinates. <strong>Note</strong> - this method does not update
   * the actual objects linked to the layout.
   *
   */
  override public function update():Void
  {
    (this._placementDirection==FlowDirection.HORIZONTAL)?this.layoutChildrenHorizontally(new Rectangle(this._x, this._y, this._width, this._height)):this.layoutChildrenVertically(new Rectangle(this._x, this._y, this._width, this._height));
    if(this._overflowPolicy==FlowOverflowPolicy.HIDE_OVERFLOW)
    {
      for(var i:int=0; i<this._size; i++)
      {
        var c:FlowNode = this._nodes[i];
        //if(c.outsideBounds&&this._target.contains(c.link)) this._target.removeChild(c.link);
        //else if(!c.outsideBounds&&!this._target.contains(c.link)) this._target.addChild(c.link);
      }
    }


  }

  /**
   * @private
   * @param bounds
   *
   */
  private function layoutChildrenHorizontally(bounds:Rectangle):Void
  {
    const START_X:Int = bounds.x + 0;
    var yPosition:Int = bounds.y + 0;
    var xPosition:Int = START_X;
    var maxChildHeight:Int = 0;
    var row:Array = [];

    for(var i:int = 0; i < this._size; i++)
    {
      var cell:FlowNode = this._nodes[i];
      if(!_nodes[i].link) continue;
      var child:Object = this._nodes[i].link;
      var bb:Rectangle = child.getBounds(child);

      bb.x*=child.width/bb.width;
      bb.y*=child.height/bb.height;

      //next column if we're over the height, but not if we're at yposition == bounds.y
      var endOfRow:Int = xPosition + child.width + 0;
      if(endOfRow - bounds.x >= bounds.width && xPosition != START_X)
      {
        //update alignment
        this.alignRow(row, maxChildHeight, bounds);

        yPosition += maxChildHeight + this._yPadding;
        xPosition = START_X;
        maxChildHeight = 0;
        row = [];
      }

      cell.outsideBounds=(yPosition+child.height>bounds.height)?true:false;

      cell.x = xPosition-bb.x;
      cell.y = yPosition-bb.y;
      row.push(cell);
      maxChildHeight = Math.max(maxChildHeight, child.height);
      xPosition += child.width + this._hPadding;
    }
    this.alignRow(row, maxChildHeight, bounds);
  }

  override private function validateObject(object:Object):Boolean
  {
    if(	object.hasOwnProperty('x')&&
        object.hasOwnProperty('y')&&
        object.hasOwnProperty('width')&&
        object.hasOwnProperty('height')&&
        object.hasOwnProperty('rotation')&&
        object.hasOwnProperty('getBounds')
      ) return true;

    return false;
  }

  /**
   * @private
   * @param bounds
   *
   */
  private function layoutChildrenVertically(bounds:Rectangle):Void
  {
    const START_Y:Int = bounds.y + 0;
    var xPosition:Int = bounds.x + 0;
    var yPosition:Int = START_Y;
    var maxChildWidth:Int = 0;
    var column:Array = [];

    for(var i:int = 0; i < this._size; i++)
    {
      var cell:FlowNode = this._nodes[i];
      if(!_nodes[i].link) continue;
      var child:Object = this._nodes[i].link;
      var bb:Rectangle = child.getBounds(child);

      bb.x*=child.width/bb.width;
      bb.y*=child.height/bb.height;

      var endOfColumn:Int = yPosition + child.height + 0;
      if(endOfColumn - bounds.y >= bounds.height && yPosition != START_Y)
      {
        this.alignColumn(column, maxChildWidth, bounds);

        xPosition += maxChildWidth + this._hPadding;

        yPosition = START_Y;
        maxChildWidth = 0;
        column = [];
      }

      cell.outsideBounds=(xPosition+child.width>bounds.width)?true:false;

      cell.x = xPosition-bb.x;
      cell.y = yPosition-bb.y;
      column.push(cell);
      maxChildWidth = Math.max(maxChildWidth, child.width);
      yPosition += child.height + this._yPadding;
    }
    this.alignColumn(column, maxChildWidth, bounds);
  }

  /**
   * @private
   * @param column
   * @param maxChildWidth
   * @param bounds
   *
   */
  private function alignColumn(column:Array, maxChildWidth:Int, bounds:Rectangle):Void
  {
    if(column.length == 0) return;

    var lastChild:FlowNode = column[column.length - 1];
    var columnHeight:Int = (lastChild.y + lastChild.link.height) - bounds.y + /*this.paddingBottom*/0;
    var difference:Int = bounds.height - columnHeight;

    var columnCount:int = column.length;
    for(var i:int = 0; i < columnCount; i++)
    {
      var child:FlowNode = column[i];

      this.alignItems(child, new Rectangle(child.x, child.y, maxChildWidth, child.link.height), this.horizontalAlign, null);


      switch(this.verticalAlign)
      {
        case "middle":
          child.y += difference / 2;
          break;
        case "bottom":
          child.y += difference;
          break;
      }

    }
  }

  /**
   * @private
   * @param row
   * @param maxChildHeight
   * @param bounds
   *
   */
  private function alignRow(row:Array, maxChildHeight:Int, bounds:Rectangle):Void
  {
    if(row.length == 0) return;

    var lastChild:FlowNode = row[row.length - 1];
    var rowWidth:Int = (lastChild.x + lastChild.link.width) - bounds.x + /*this.paddingRight*/0;
    var difference:Int = bounds.width - rowWidth;

    var rowCount:int = row.length;
    for(var i:int = 0; i < rowCount; i++)
    {
      var child:FlowNode = row[i];
      this.alignItems(child, new Rectangle(child.x, child.y, child.link.width, maxChildHeight), null, this.verticalAlign);

      switch(this.horizontalAlign)
      {
        case "center":
          child.x += difference / 2;
        case "right":
          child.x += difference;
      }
    }
  }

  /**
   *
   * @param	target
   * @param	bounds
   * @param	horizontalAlign
   * @param	verticalAlign
   */
  private function alignItems(target:FlowNode, bounds:Rectangle, horizontalAlign:String = null, verticalAlign:String = null):Void {

    var horizontalDifference:Int = bounds.width - target.link.width;
    switch(horizontalAlign) {
      case "left":
        target.x = bounds.x;
      case "center":
        target.x = bounds.x + horizontalDifference / 2;
      case "right":
        target.x = bounds.x + horizontalDifference;
    }

    var verticalDifference:Int = bounds.height - target.link.height;
    switch(verticalAlign)
    {
      case "top":
        target.y = bounds.y;
      case "middle":
        target.y = bounds.y + (verticalDifference) / 2;
      case "bottom":
        target.y = bounds.y + verticalDifference;
    }
  }

}
