define (require)-> 
    BaseClass = require("../utils/BaseClass")
    class Node extends BaseClass
        constructor:(link)->
            @initConfig({link:link})

        toObject:->
            throw 'Method must be overriden by child class'

        toString:->
            "[object Node]"