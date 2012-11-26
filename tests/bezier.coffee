canvas = document.querySelector("canvas")
ctx = canvas.getContext("2d")

p0 = x:100,y:0
p1 = x:0,y:100
p2 = x:300,y:100
p3 = x:50,y:0

callback = (x,y)->
    ctx.fillRect(x,y,.5,.5)

drawCurve=(p0,p1,p2,p3,callback)->
    for t in [0...1] by 0.0008
        xt = Math.pow(1-t,3) * p0.x + 3 * t * Math.pow(1-t,2) * p1.x + 3 * Math.pow(t,2) * (1-t) * p2.x + Math.pow(t,3) * p3.x
        yt = Math.pow(1-t,3) * p0.y + 3 * t * Math.pow(1-t,2) * p1.y + 3 * Math.pow(t,2) * (1-t) * p2.y + Math.pow(t,3) * p3.y
        callback(xt,yt)
    return

drawCurve p0,p1, p2, p3, callback