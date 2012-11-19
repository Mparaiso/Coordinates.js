define (require)->
    Object.prototype.defineProperties?=(scope,properties)->
    Array.prototype.indexOf?=(needle)->
        for value,index in this
            if value==needle then return index
        return -1