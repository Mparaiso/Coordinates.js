define (require)->
    #Object.prototype.defineProperties?=(scope,properties)->
    Array.prototype.indexOf?=(needle)->
        for value,index in this
            if value==needle then return index
        return -1

    Array.prototype.isArray?=()->
        Array.prototype.constructor == this.constructor && typeof this.length == "number"

    String.prototype.capitalize?=->
        words = this.valueOf().split(" ")
        capitalized = for word in words
            first = word[...1]
            first = first.toUpperCase()
            first+word[1..]
        return capitalized.join(" ")


    if typeof console == undefined && console == null
        console=
            log :->
