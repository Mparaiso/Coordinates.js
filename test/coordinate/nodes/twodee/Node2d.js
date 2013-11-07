/*jslint node:true,  vars:true */
/*global it,coordinate */
var assert = require('assert');

var link = {};
describe('A Node2d', function() {"use strict";
    var X = 20;
    var Y = 20;
    var node = new coordinate.nodes.twodee.Node2d(link, 20, 20);
    describe('has a link', function() {
        it('should be cloned properly', function() {
            var newnode = node.clone();
            assert.equal(node.x, newnode.x);
            assert.equal(node.y, newnode.y);
            assert.equal(node.rotation, newnode.rotation);
        });
    });
});
