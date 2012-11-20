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
        expectedSentence ="This Is A Sentence"
        equal(testSentence.capitalize(),expectedSentence,"capitalize")
        testSentence="this is a sentence with  spaces"
        expectedSentence="This Is A Sentence With  Spaces"
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
        coordinates.links.DOMLink2d
    ###
    module("coordinates.links.DOMLink2d")

    test "coordinates.links.DOMLink2d",->
        el = document.createElement("DIV")
        el.style.width = "200px"
        el.style.height="200px"
        el.style.position="fixed"
        ok(true)
        domLink2d = new coordinates.DOMLink2d(el)
        
        ok(domLink2d!=null && domLink2d instanceof coordinates.links.DOMLink2d,"DOMLink2d.constructor")
        domLink2d.setX(200)
        domLink2d.setY(250)
        domLink2d.setRotation(45)
        equal(domLink2d.getElement().style.transform ,"translate(200px,250px) rotate(45deg)","DOMLink2d.applyTransform")
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


    module("coordinates.events.helpers.EventDispatcher")

    ###
        coordinates.events.helpers.EventDispatcher
    ###

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
        @vl.addNodes([@l1,@l2,@l3,@l4])

        @vl.addEventListener coordinates.NodeEvent::ADD,->
            @ok(true,"ADD event dispatched")

        equal(@l1.getY(),0)
        equal(@l2.getY(),120)
        equal(@l3.getY(),240)
        equal(@l4.getY(),360)

