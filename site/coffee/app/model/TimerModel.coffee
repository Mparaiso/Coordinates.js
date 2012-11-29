define (require)->
    
    class TimerModel extends Backbone.Model
        defaults:
            interval:4000
            isRunning:false
            ticks:0
            totalTicks:0

        