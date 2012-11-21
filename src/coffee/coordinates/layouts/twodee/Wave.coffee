define (require)->
    NodeEvent = require("../../events/NodeEvent")
    PathAlignType = require("../../constants/PathAlignType") 
    WaveFunction = require("../../constants/WaveFunction")
    Layout2d = require("./Layout2d")

    class Wave extends Layout2d

        PI = Math.PI

        setWaveFunction:(value)->
            @_wavefunction = value || WaveFunction.SINE
            switch @_wavefunction
                when WaveFunction.SINE
                    @_function  =  Math.sin
                when WaveFunction.COSINE
                    @_function = Math.cos
                when WaveFunction.TAN
                    @_function = Math.tan
                when WaveFunction.ARCSINE
                    @_function = Math.asin
                when WaveFunction.ARCOSINE
                    @_function = Math.acos
                when WaveFunction.ARCTAN
                    @_function = Math.atan
                else 
                    @_function  =  Math.sin

        getWaveFunction:->@_wavefunction
        getAlignType:->@_alignType
        getAlignOffset:->@_alignOffset

        constructor:(width, height,x=0, y=0, frequency=1, waveFunction=WaveFunction.SINE, jitterX=0, jitterY=0,  alignType=PathAlignType.ALIGN_PERPENDICULAR, alignOffset=0)->
            ### Distributes nodes in a wave. ###
            super(x,y,jitterX,jitterY,width,height)
            @initConfig({frequency:frequency,waveFunction:waveFunction,alignType:alignType,alignOffset:alignOffset},->@updateFunction())
            @_heightMultiplier = 0
            @_thetaOffset = 0

        toString:->
            ### Returns the type of layout in a string format ###
            "[object Wave]"

        clone:->
            new Wave(@getWidth(),@getHeight(),@getX(),@getY(),@getFrequency(),@getWaveFunction(),@getJitterX(),@getJitterY(),@getAlignType(),@getAlignOffset())

        render:->
            ### Applies all layout property values to all cells/display objects in the collection ###
            for node in @nodes
                unless node.getLink() == null
                    @renderNode(node)

        renderNode:(node)->
            super(node)
            node.getLink().setRotation(if @getAlignType() == PathAlignType.NONE then 0 else node.getRotation())

        update:->
            ### 
                Updates the nodes' virtual coordinates. <strong>Note</strong> - 
                this method does not update
                the actual objects linked to the layout. 
            ###
            len = @nodes.length
            unless len <=0
                for n,i in @nodes
                    n.setX i*(@getWidth()/len)+@getX()+(n.getJitterX()*@getJitterX()) 
                    jitter = @_y + (n._jitterY*@_jitterY) 
                    n.setY( (@_function(PI*(i+1)/(len/2)*@_frequency-(@_thetaOffset*PI/180))*((@_height+(@_heightMultiplier*i))/2)) + jitter )

                    if @_function==Math.sin then n.setRotation(Math.cos(PI*(i+1)/(len/2)*@_frequency)*180/PI)
                    else if @_function == Math.cos then n.setRotation(Math.sin(PI*(i+1)/(len/2)*@frequency)*180/PI)
                    else n.setRotation(0)

                    if @_alignType == PathAlignType.ALIGN_PERPENDICULAR then n.setRotation(n.getRotation()+90)

                    n.setRotation(n.getRotation()+@_alignOffset)
