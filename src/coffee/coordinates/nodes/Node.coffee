define (require)->
    class Node
        constructor:(link)->

            @getLink=->
                return link
                
            @setLink=(value)->
                link=value

        toObject:->
            throw "Method must be called in Node descendant"
            return 

        toString:->
            "[object Node]"