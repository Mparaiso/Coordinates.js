/**
buld project from source: 
r.js -o require-config.js
**/
({
    name:"main",
    out:"main.js",
    baseUrl:"../js",
    paths:{
        "coordinates":"../../src/js/coordinates"
    },
    include:["../vendor/jquery.min","../vendor/underscore-min",'../vendor/backbone-min']
})