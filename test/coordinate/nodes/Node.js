/*global it,coordinate */
require('chai').should();
assert = require('assert');
/**
 * coordinate.nodes.Node
 */

describe('A link', function() {"use strict";
    var link = {};
    describe("has a node", function() {
        var node = new coordinate.nodes.Node(link);
        it("that have a link that is the Link", function() {
            assert.equal(node.link,link);
        });
    });
});
