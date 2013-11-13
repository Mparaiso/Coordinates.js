/*

///<reference path='coordinate/events/CoordyNodeEvent.ts'/>
///<reference path='coordinate/helpers/Distribute.ts'/>
///<reference path='coordinate/helpers/SimpleZSorter.ts'/>
///<reference path='coordinate/helpers/SimpleZSortVO.ts'/>
///<reference path='coordinate/helpers/Vertex.ts'/>
///<reference path='coordinate/layouts/ICoreLayout.ts'/>
///<reference path='coordinate/layouts/ILayout.ts'/>
///<reference path='coordinate/layouts/IOrderedLayout.ts'/>
///<reference path='coordinate/layouts/Layout.ts'/>
///<reference path='coordinate/layouts/threedee/Ellipse3d.ts'/>
///<reference path='coordinate/layouts/threedee/Grid3d.ts'/>
///<reference path='coordinate/layouts/threedee/ILayout3d.ts'/>
///<reference path='coordinate/layouts/threedee/Layout3d.ts'/>
///<reference path='coordinate/layouts/threedee/Scatter3d.ts'/>
///<reference path='coordinate/layouts/threedee/Spheroid3d.ts'/>
///<reference path='coordinate/layouts/threedee/Stack3d.ts'/>
///<reference path='coordinate/layouts/threedee/Wave3d.ts'/>
///<reference path='coordinate/layouts/threedee/WaveEllipse3d.ts'/>
///<reference path='coordinate/layouts/twodee/Ellipse.ts'/>
///<reference path='coordinate/layouts/twodee/Flow.ts'/>
///<reference path='coordinate/layouts/twodee/Grid.ts'/>
///<reference path='coordinate/layouts/twodee/HorizontalLine.ts'/>
///<reference path='coordinate/layouts/twodee/ILayout2d.ts'/>
///<reference path='coordinate/layouts/twodee/Lattice.ts'/>
///<reference path='coordinate/layouts/twodee/Layout2d.ts'/>
///<reference path='coordinate/layouts/twodee/Scatter.ts'/>
///<reference path='coordinate/layouts/twodee/Spiral.ts'/>
///<reference path='coordinate/layouts/twodee/Stack.ts'/>
///<reference path='coordinate/layouts/twodee/VerticalLine.ts'/>
///<reference path='coordinate/layouts/twodee/Wave.ts'/>

///<reference path='coordinate/nodes/threedee/EllipseNode3d.ts'/>
///<reference path='coordinate/nodes/threedee/GridNode3d.ts'/>
///<reference path='coordinate/nodes/threedee/INode3d.ts'/>
///<reference path='coordinate/nodes/threedee/Node3d.ts'/>
///<reference path='coordinate/nodes/threedee/OrderedNode3d.ts'/>
///<reference path='coordinate/nodes/threedee/ScatterNode3d.ts'/>
///<reference path='coordinate/nodes/twodee/EllipseNode.ts'/>
///<reference path='coordinate/nodes/twodee/FlowNode.ts'/>
///<reference path='coordinate/nodes/twodee/GridNode.ts'/>
///<reference path='coordinate/nodes/twodee/OrderedNode.ts'/>
///<reference path='coordinate/nodes/twodee/ScatterNode.ts'/>
///<reference path='coordinate/behaviors/AutoAddToLayoutBehavior.ts'/>
///<reference path='coordinate/proxyupdaters/InvalidationProxyUpdater.ts'/>
///<reference path='coordinate/proxyupdaters/InvalidationZSortProxyUpdater.ts'/>
///<reference path='coordinate/proxyupdaters/IProxyUpdater.ts'/>
///<reference path='coordinate/proxyupdaters/OrderSortProxyUpdater.ts'/>
///<reference path='coordinate/utils/LayoutTransitioner.ts'/>
*/

///<reference path='coordinate/events/EventDispatcher.ts'/>
///<reference path='coordinate/constants/FlowAlignment.ts'/>
///<reference path='coordinate/constants/FlowDirection.ts'/>
///<reference path='coordinate/constants/FlowOverflowPolicy.ts'/>
///<reference path='coordinate/constants/GridLayoutDirection.ts'/>
///<reference path='coordinate/constants/LatticeAlternationPattern.ts'/>
///<reference path='coordinate/constants/LatticeOrder.ts'/>
///<reference path='coordinate/constants/LatticeType.ts'/>
///<reference path='coordinate/constants/LayoutType.ts'/>
///<reference path='coordinate/constants/LayoutUpdateMethod.ts'/>
///<reference path='coordinate/constants/PathAlignType.ts'/>
///<reference path='coordinate/constants/StackOrder.ts'/>
///<reference path='coordinate/constants/WaveFunction.ts'/>
///<reference path='coordinate/nodes/INode.ts'/>
///<reference path='coordinate/nodes/Node.ts'/>
///<reference path='coordinate/nodes/twodee/INode2d.ts'/>
///<reference path='coordinate/nodes/twodee/Node2d.ts'/>
///<reference path='coordinate/nodes/twodee/OrderedNode.ts'/>

declare var global;

module coordinate { }

if (typeof (global) !== "undefined") { global.coordinate = coordinate; }