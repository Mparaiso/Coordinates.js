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

        test "coordinates.events.helpers.EventDispatcher",->
            o = new coordinates.events.helpers.EventDispatcher()
            ok(o!=null && o instanceof coordinates.events.helpers.EventDispatcher,"EventDispatcher.constructor")


loadScript("../src/js/vendor/require.min.js",requireloaded)


