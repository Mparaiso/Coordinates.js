###
    Coordinates.js tests with qunit
###
### load a script according to its path , then execute a callback ###
loadScript=(scriptPath,callback,options={},callbackoptions={})->
    s = document.createElement("SCRIPT")
    s.option = value for option,values in options

    s.onload = (e)=>
        callback(e,callbackoptions)

    s.src = scriptPath
    document.body.appendChild(s)
    return s

### callback ###
requireloaded = (event)->
    console.log("requireloaded",arguments)
    require ["../src/js/coordinates/coordinates"],(coordinates)->
        console.log("coordinates loaded",arguments)

        ### helper pour le debugging via console ###
        window.Coordinates = coordinates
        test "coordinates is loaded",->
            ok(coordinates!=null,"coordinates is not null")

            
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
            domLink2d = new coordinates.links.DOMLink2d(el)
            ok(domLink2d!=null && domLink2d instanceof coordinates.links.DOMLink2d,"DOMLink2d.constructor")
            domLink2d.x=200
            domLink2d.y=250
            domLink2d.rotation=45
            equal(domLink2d.domElement.style.transform ,"translate(200px,250px) rotate(45deg)","DOMLink2d.applyTransform")
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

        


loadScript("../src/js/vendor/require.min.js",requireloaded)


