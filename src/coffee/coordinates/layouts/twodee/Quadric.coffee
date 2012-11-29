define (require)->

    Layout2d = require './Layout2d'
    NodeEvent = require("../../events/NodeEvent")
    PathAlignType = require("../../constants/PathAlignType") 

    class Quadric extends Layout2d

        constructor:(x,y,x1,y1,x2,y2,x3,y3,x4,y4,jitterX=0,jitterY=0)->
            super(x,y,jitterX,jitterY)
            @initConfig(x1:x1,y1:y1,x2:x2,y2:y2,x3:x3,y3:y3,x4:x4,y4:y4,->@updateFunction())

        update:->
            ### 
                EN : update nodes
                FR : met à jour les nodes selon la courbe quadrique 
            ###

            if @nodes.length  <=0 then return
            t = 0
            x1 = @_x1 ; x2 = @_x2 ; x3 = @_x3 ; x4 = @_x4
            y1 = @_y1 ; y2 = @_y2 ; y3 = @_y3 ; y4 = @_y4 
            for node,i in @nodes
                xt = Math.pow(1-t,3) * x1 + 3 * t * Math.pow(1-t,2) * x2 + 3 * Math.pow(t,2) * (1-t) * x3 + Math.pow(t,3) * x4
                yt = Math.pow(1-t,3) * y1 + 3 * t * Math.pow(1-t,2) * y2 + 3 * Math.pow(t,2) * (1-t) * y3 + Math.pow(t,3) * y4

                node.setX @_x+xt+node.getJitterX()*@_jitterX
                node.setY @_y+yt+node.getJitterY()*@_jitterY
                
                t += 1/(@nodes.length)
            return

    

    #         t += 1/@size
    #         for t in [0..1] by @size
    #     xt : Math.pow(1-t,3) * points[0].x + 3 * t * Math.pow(1-t,2) * points[1].x + 3 * Math.pow(t,2) * (1-t) * points[2].x + Math.pow(t,3) * points[3].x
    #     yt : Math.pow(1-t,3) * points[0].y + 3 * t * Math.pow(1-t,2) * points[1].y + 3 * Math.pow(t,2) * (1-t) * points[2].y + Math.pow(t,3) * points[3].y
    
    # 