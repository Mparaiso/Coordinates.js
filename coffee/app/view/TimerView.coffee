define (require)->

    TimerModel = require "app/model/TimerModel"
    
    class TimerView extends Backbone.View
        ###
            start and stop a timer
        ###

        model: TimerModel

        TIMER_EVENT:"timerEvent"

        initialize:->
            _.bindAll(this.tick)

        tick:=>

            @model.set "tick",(@model.get "tick")+1
            @model.set "timerId",setTimeout(this.tick,@model.get("interval"))
            @trigger(TimerView::TIMER_EVENT,@model.toJSON())
            if @model.get("debug")==true
                console.log "tick",@model.toJSON()
            return

        start:->
            @model.set("timerId",setTimeout(this.tick,@model.get("interval")))
            @model.set("isRunning",true)
            return

        stop:->
            clearTimeout(@model.get("timerId"))
            @model.set("isRunning",false)
            return

        ###
            // Exemple : 
            m = new app.model.TimerModel()
            m.set("debug",true)
            v = new app.view.TimerView({model:m})
            v.start()
            E = _.extend(
                { 
                    initialize:function(v){ 
                            v.on("timerEvent",function(){console.log("timer event");});
                        } 
                }
            ,Backbone.Events)
            E.initialize(v)
        ###
