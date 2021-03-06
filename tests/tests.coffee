###
    Coordinates.js tests with qunit
###

require ["../src/js/coordinates/coordinates"],(coordinates)->
    # console.log("coordinates loaded",arguments)

    ### helper pour le debugging via console ###
    window.Coordinates = coordinates
    test "coordinates is loaded",->
        ok(coordinates!=null,"coordinates is not null")

    module "ES5shims",
        setup:->

            @MyClass = class extends Coordinates.BaseClass

                constructor:->
                    super()
                    @initConfig({x:1,y:2,z:3})

                getX:->
                    @_x * 2

                setZ:(v)->
                    @_z = v/2

            window.MyClass = @MyClass

            @MySuperClass = class extends @MyClass

                constructor:->
                    super()
                    @initConfig({a:1,b:2,c:3})

            window.MySuperClass = @MySuperClass

        teardown:->

    test "capitalize",->
        testSentence = "this is a sentence"
        expectedSentence = "This Is A Sentence"
        equal(testSentence.capitalize(),expectedSentence,"capitalize")
        testSentence= "this is a sentence with  spaces"
        expectedSentence= "This Is A Sentence With  Spaces"
        equal(testSentence.capitalize(),expectedSentence,"capitalize with spaces")

    test "BaseClass",->
        myClass = new @MyClass()
        equal(myClass.getX(),2,"BaseClass.initConfig")
        myClass.setZ(10)
        equal(myClass.getZ(),5,"BaseClass.initConfig")
        mySuperClass = new @MySuperClass()
        equal(mySuperClass.getY(),2,"BaseClass.constructor")
        equal(mySuperClass.getA(),1,"BaseClass.constructor")
        ### test inheritance ###

    ### test de chaque méthode de chaque classe ###

    ###
        coordinates.links.threedee.Link3d
    ###

    module "coordinates.links.threedee.Link3d",
        setup:->
            @link3d = new coordinates.Link3d({})

    test "constructor", ->
        @link3d.setX 30
        ok(@link3d.getX()==30)
        @link3d.setY 20
        ok(@link3d.getY()==20)
        @link3d.setZ 50
        ok(@link3d.getZ()==50)

    ### 
        coordinates.links.DOMLink3d
    ###

    module("coordinates.links.DOMLink3d",{
        setup:->
            @el = document.createElement("DIV")
            @el.style.width = "500px"
            @el.style.height = "300px"
            @link = new coordinates.DOMLink3d(@el)
            return
        })

    test("constructor",->
        equal(@link.getElement(),@el)
        equal(@link.getWidth(),500)
        equal(@link.getHeight(),300)
        equal(@link.getX(),0)
        equal(@link.getY(),0)
        return
    )

    test "update , will fail on non webkitbrowsers or on browsers that do not support CSS transform 3D",->
        @link.setRotationZ(60)

        equal(@link.getElement().style.webkitTransform,"translateX(0px) translateY(0px) translateZ(0px) rotate(0deg) rotateX(0deg) rotateY(0deg) rotateZ(60deg)","element transform is correct string")
        @link.setZ(500)
        equal(@link.getElement().style.webkitTransform,"translateX(0px) translateY(0px) translateZ(-500px) rotate(0deg) rotateX(0deg) rotateY(0deg) rotateZ(60deg)","element transform is correct string")
        return

    ###
        coordinates.links.DOMLink2d
    ###
    module("coordinates.links.DOMLink2d")

    test "coordinates.links.DOMLink2d",->
        el = document.createElement("DIV")
        el.style.width = "200px"
        el.style.height= "300px"
        el.style.position= "fixed"
        ok(true)
        domLink2d = new coordinates.DOMLink2d(el)
        
        ok(domLink2d!=null && domLink2d instanceof coordinates.links.DOMLink2d,"DOMLink2d.constructor")
        domLink2d.setX(200)
        domLink2d.setY(250)
        domLink2d.setRotation(45)
        equal(domLink2d.getElement().style.transform ,"translate(200px,250px) rotate(45deg)","DOMLink2d.applyTransform")
        # méthodes à retester
        equal(domLink2d.getWidth(),200)
        equal(domLink2d.getHeight(),300)
        return

    ###
        coordinates.events.helpers.Event
    ###

    module("coordinates.events.helpers.Event")

    test "coordinates.events.helpers.Event",->
        e = new coordinates.events.helpers.Event("xevent")
        ok(e!=null,"Event.constructor")
        ok(e.getEventPhase()==1,"EventPhase.getEventPhase")
        e.setEventPhase(coordinates.events.helpers.EventPhase.BUBBLING_PHASE)
        ok(e.getEventPhase()==2,"EventPhase.setEventPhase")
        clonedEvent = e.clone()
        ok(clonedEvent.type == e.type && clonedEvent.bubbles == e.bubbles,"Event.clone")



    ###
        coordinates.events.helpers.EventDispatcher
    ###

    module("coordinates.events.helpers.EventDispatcher")

    test "coordinates.events.helpers.EventDispatcher",->
        expect(3)
        o = new coordinates.events.helpers.EventDispatcher()
        ok(o!=null && o instanceof coordinates.events.helpers.EventDispatcher,"EventDispatcher.constructor")
        ok(o._target == o ,"EventDispatcher._target == EventDispatcher")
        o.addEventListener("XEvent",(e)-> ok(e.target == o._target,"EventDispatcher.dispatchEvent fired"))
        o.dispatchEvent(new coordinates.events.helpers.Event("XEvent"))

    module("coordinates.nodes")

    test "coordinates.nodes.Node",->
        link= {x:1,y:1}
        node = new coordinates.nodes.Node(link)
        ok(node.getLink()==link,"Node.getLink")
        newLink = {x:2,y:5}
        node.setLink(newLink)
        ok(node.getLink()==newLink,"Node.setLink")
        throws(-> 
            node.toObject()
        , "Node.toObject throws an exception")
        return

    module("coordinates.nodes.twodee")

    test "coordinates.nodes.twodee.Node2d",->
        link = {x:1,y:2}
        node2d = new coordinates.nodes.twodee.Node2d(link,2,5)
        ok(node2d!=null && node2d instanceof coordinates.nodes.twodee.Node2d,"Node2d.constructor")
        o = node2d.toObject()
        ok(o.x==2 && o.y == 5,"Node.toObject")
        node2d.setRotation(35)
        clonedNode  = node2d.clone()
        ok(clonedNode.getX()==node2d.getX()&&clonedNode.getRotation()==node2d.getRotation(),"Node.clone")
        node2d.setJitterX(3)
        node2d.setJitterY(5)
        ok(node2d.getJitterX!=3 && node2d.getJitterY()!=5,"Node2d.setJitterX , Node2d.setJitterY")
        return

    module "coordinates.OrderedNode3d",
        setup:->
            @node = new coordinates.OrderedNode3d({})

    test "constructor",->
        ok(@node!=null)
        ok(@node.toString()=="[object OrderedNode3d]")

    ###
        Coordinates.layouts
    ###

    module "coordinates.layouts.Layout",
        setup:->
            @link1 = new Coordinates.Link({x:1,y:2})
            @link2 = new Coordinates.Link({x:3,y:5})
            @node1 = new Coordinates.Node(@link1)
            @node2 = new Coordinates.Node(@link2)
            @layout = new Coordinates.Layout()
        teardown:->

    test "constructor", ->
        equal(@layout.size,0)
        equal(@layout.nodes.length,0)

    test "storeNode", ->
        @layout.storeNode(@node1)
        equal(@layout.size,1,"Layout.storeNode")
        equal(@layout.nodes.length,1,"Layout.storeNode")
        equal(@layout.linkExists(@link1),true,"Layout.linkExists")
        equal(@layout.linkExists(@link2),false,"Layout.linkExists")
        @layout.storeNodeAt(@node2,0)
        equal(@layout.nodes[0].getLink(),@link2,"Layout.storeNodeAt")
        equal(@layout.getNodeByLink(@link1),@node1,"Layout.getNodeByLink")
        equal(@layout.getNodeIndex(@node2),0,"Layout.getNodeIndex")
        equal(@layout.getNodeAt(0),@node2,"Layout.getNodeAt")
        @layout.removeNodeByLink(@link1)
        equal(@layout.linkExists(@link1),false,"layout.removeNodeByLink")
        equal(@layout.size,1,"layout.removeNodeByLink")
        equal(@layout.nodes.length,1,"layout.removeNodeByLink")
        @layout.removeAllNodes()
        equal(@layout.size,0,"Layout.removeAllNodes")
        equal(@layout.nodes.length,0,"Layout.removeAllNodes")

    test "swapNodeLinks",->
        @layout.storeNode(@node1)
        @layout.storeNode(@node2)
        @layout.swapNodeLinks(@node1,@node2)
        equal(@node1.getLink(),@link2)
        equal(@node2.getLink(),@link1)

    test "addLinkAt",->
        @layout.storeNode(@node1)
        @layout.addLinkAt(@link2,0)
        equal(@layout.nodes[0].getLink(),@link2,"Layout.addLinkAt")

    ###
        coordinates.Layout3d
    ###

    module "coordinates.Layout3d",
        setup:-> 
            @layout3d = new coordinates.Layout3d()

    test "coordinates.Layout3d.constructor", ->
            ok(@layout3d!=null,"layout3d is not null")

    test "coordinates.Layout3d.get...",->
            @layout3d.setX 30
            ok(@layout3d.getX()==30,"getX")
            @layout3d.setY 100
            ok(@layout3d.getY()==100,"getY")

    ###
        "coordinates.VerticalLine"
    ###

    module "coordinates.VerticalLine",
        setup:->
            @l1 = new coordinates.Link({},0,0,0,100,100)
            @l2 = new coordinates.Link({},0,0,0,100,100)
            @l3 = new coordinates.Link({},0,0,0,100,100)
            @l4 = new coordinates.Link({},0,0,0,100,100)

            @vl = new coordinates.VerticalLine(20,0,0,0,0)

    test "constructor",->
        ok(@vl!=null)

    test "addNode",->
        @vl.addNode(@l1)
        @vl.addNode(@l2)
        @vl.addNode(@l3)

        equal(@vl.size,3,"VerticalLine.size")

        @vl.addNode(@l4)

        equal(@vl.size,4,"VerticalLine.size")
        equal(@vl.nodes.length,4,"VerticalLine.size")

        equal(@l1.getY(),0)
        equal(@l2.getY(),120)
        equal(@l3.getY(),240)
        equal(@l4.getY(),360)

    test "addNodes",->
        expect(8)

        @vl.addEventListener( coordinates.NodeEvent::ADD,-> ok(true,"ADD event dispatched") )

        @vl.addNodes([@l1,@l2,@l3,@l4])

        equal(@l1.getY(),0,"Node updated and rendered")
        equal(@l2.getY(),120,"Node updated and rendered")
        equal(@l3.getY(),240,"Node updated and rendered")
        equal(@l4.getY(),360,"Node updated and rendered")


    module "coordinates.HorizontalLine",
        setup:->
        teadown:->

    module "coordinates.Ellipse",
        setup:->
            @ellipse = new coordinates.Ellipse(100,100)

    test "constructor",->
        expect(2)
        equal(@ellipse.getWidth(),100,"Ellipse.getWidth")
        equal(@ellipse.getHeight(),100,"Ellipse.getHeight")


    module "coordinates.Wave",
        setup:->
            @wave = new coordinates.Wave(500,300)
            @wave.addNode(new coordinates.Link({}))
            @wave.addNode(new coordinates.Link({}))
            @wave.addNode(new coordinates.Link({}))

    test "constructor",->
        expect(4)
        equal(@wave.getWidth(),500,"Wave.getWidth")
        equal(@wave.getHeight(),300,"Wave.getHeight")
        @wave.setX(50)
        equal(@wave.getX(),50,"Wave.setX")
        @wave.setY 100
        equal @wave.getY(),100,"Wave.setY"


    module "coordinates.Stack",
        setup:->
            @stack = new coordinates.Stack()
            @stack.addNode(new coordinates.Link({}))
            @stack.addNode(new coordinates.Link({}))
            @stack.addNode(new coordinates.Link({}))
            @stack.addNode(new coordinates.Link({}))


    test "constructor",->
        equal(@stack.size,4,"Stack.size")
        equal(@stack.nodes.length,4,"Stack.size")
        equal(@stack.nodes[0].getOrder(),0,"Node orders")
        equal(@stack.nodes[1].getOrder(),1,"Node orders")
        equal(@stack.nodes[2].getOrder(),2,"Node orders")
        equal(@stack.nodes[3].getOrder(),3,"Node orders")

    module "coordinates.Spiral",
        setup:->
            @spiral = new coordinates.Spiral(300)
            @spiral.addNode(new coordinates.Link({}))
            @spiral.addNode(new coordinates.Link({}))
            @spiral.addNode(new coordinates.Link({}))
            @spiral.addNode(new coordinates.Link({}))

    test "constructor",->
        equal(@spiral.size,4,"Spiral.size")
        equal(@spiral.nodes.length,4,"Spiral.size")
        equal(@spiral.toString(),"[object Spiral]","Spiral.toString")
        equal(@spiral.nodes[0].getX(),300)
        equal(@spiral.nodes[0].getY(),0)

    module "coordinates.Grid"
        setup:->
            @grid = new coordinates.Grid(500,500,5,5)
            for i in [0..25]
                @grid.addNode(new coordinates.Link({}))

    test "constructor",->
        ok(true)

    module "coordinates.Scatter",
        setup:->
            @scatter = new coordinates.Scatter(500,500)
            @scatter.addNode(new coordinates.Link({}))
            @scatter.addNode(new coordinates.Link({}))
            @scatter.addNode(new coordinates.Link({}))
            @scatter.addNode(new coordinates.Link({}))

    test "constructor",->
        equal(@scatter.toString(),"[object Scatter]",'Scatter.constructor')
        equal(@scatter.getWidth(),500)
        equal(@scatter.getHeight(),500)
        equal(@scatter.getX(),0)

    module "coordinates.Flow",
        setup:->
            @flow = new Coordinates.Flow 500,500
            @flow.addNode(new coordinates.Link({"width":100,"height":100}))
            @flow.addNode(new coordinates.Link({"width":100,height:100}))
            @flow.addNode(new coordinates.Link({"width":100,height:100}))
            @flow.addNode(new coordinates.Link({"width":500,height:100}))

    test "constructor",->
        ok(@flow != undefined)
        equal(@flow.getWidth(),500)
        equal(@flow.getHeight(),500)
        equal(@flow.size,4)
        equal(@flow.nodes[0].getWidth(),100)
        equal(@flow.nodes[0].getHeight(),100)
        equal(@flow.nodes[0].getLink().getWidth(),100)
        equal(@flow.nodes[0].getLink().getHeight(),100)
        equal(@flow.nodes[1].getX(),100,"node 1 x")
        equal(@flow.nodes[2].getX(),200,"@nodes[2]._x is 300")
        equal(@flow.nodes[3].getX(),0,"@nodes[3]._x is 0")

    module "coordinates.Lattice",
        setup:->
            @lattice = new Coordinates.Lattice(500,500,0,0,3,3)
            for i in [0...9]
                @lattice.addNode(new coordinates.Link({width:30,height:30}))

    test "constructor",->
        equal(@lattice.getWidth(),500)
        equal(@lattice.getHeight(),500)
        equal(@lattice.size,9)

    ###
        Coordinates.Stack3d
    ###
    module "coordinates.Stack3d",
        setup:->
            @stack3d = new coordinates.Stack3d()
            @link1 = new coordinates.Link3d({})
            @link2 = new coordinates.Link3d({})
            @link3 = new coordinates.Link3d({})
            @link4 = new coordinates.Link3d({})
            

    test "constructor",->
        ok(@stack3d!=null)

    test "addNode",->
        @stack3d.addNode(@link1)
        equal(1,@stack3d.size)
        equal(1,@stack3d.nodes.length)

    test "addNodes",->
        @stack3d.addNodes([@link1,@link2,@link3,@link4])
        equal(4,@stack3d.size)
        equal(4,@stack3d.nodes.length)

    ###
        Coordinates.Scatter3d
    ###
    module "coordinates.Scatter3d",
        setup:->
            @scatter3d = new coordinates.Scatter3d(300,200,100)

    test "constructor",->
        ok(@scatter3d!=null,"scatter3d not null")
        equal(@scatter3d.getWidth(),300,"width")
        equal(@scatter3d.getHeight(),200,"height")
        equal(@scatter3d.getDepth(),100,"depth")

    test "adding links",->
        links = (new Coordinates.Link3d({}) for i in [0...10])
        Coordinates.addLinksTolayout(links,@scatter3d)
        equal(@scatter3d.size,10,"size")
        equal(@scatter3d.nodes.length,10,"nodes.length")



