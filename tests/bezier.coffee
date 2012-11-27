canvas = document.querySelector("canvas")
ctx = canvas.getContext("2d")

points = [
    {x:1,y:0}
    {x:200,y:0}
    {x:200,y:200}
    {x:0,y:200}
]
pow = Math.pow

factorial = (n)->
    f = 1 ; unless n <=1 then f*= i for i in [1..n]
    return f

nCr = (n,r)-> 
    nf = factorial(n) ; rf = factorial(r) ; nrf = factorial(n-r) 
    return (nf/(rf*nrf))


callback = (x,y,rotation)->
    rectWidth = 25
    rectHeight = 25
    ctx.save()
    ctx.translate(x,y)
    ctx.rotate(rotation)
    ctx.strokeRect(rectWidth/ -2, rectHeight/-2,rectWidth,rectHeight)
    ctx.restore()

drawCurve=(points,callback,step=0.001)->
    # n = points.length
    # for u in [0..1] by step
    #     x = 0
    #     y = 0
    #     for k in [0...n]
    #         x+= points[k].x * nCr(n,k) * pow(u,k) * pow((1-u),(n-k))
    #         y+= points[k].y * nCr(n,k) * pow(u,k) * pow((1-u),(n-k))
    #     # debugger    
    #     callback(x,y)
    bpoints = for t in [0..1] by step
        xt : Math.pow(1-t,3) * points[0].x + 3 * t * Math.pow(1-t,2) * points[1].x + 3 * Math.pow(t,2) * (1-t) * points[2].x + Math.pow(t,3) * points[3].x
        yt : Math.pow(1-t,3) * points[0].y + 3 * t * Math.pow(1-t,2) * points[1].y + 3 * Math.pow(t,2) * (1-t) * points[2].y + Math.pow(t,3) * points[3].y
    
    for point,i in bpoints
        r = if i>0 then  45 else 0
        callback(point.xt,point.yt,rotation=r*Math.PI/180)    
    
    return

drawHandles=(points,callback)->
    callback(x,y) for {x,y} in points
            
drawCurve points, callback, step=1/points.length

#drawHandles points, (x,y)-> ctx.save();ctx.fillStyle='#F00';ctx.fillRect(x,y,10,10);ctx.restore()