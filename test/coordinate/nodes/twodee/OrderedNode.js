/*jslint node:true,nomen:true,vars:true */

var assert = require('assert');

describe('A link', function() {
	var link = {};
	describe('has an ordered node', function() {
		var node = new coordinate.nodes.twodee.OrderedNode(link);
		it('should have a order property', function() {
			assert(typeof (node.order) === "number");
		})
	})
})