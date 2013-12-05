/**
 * coordinates.test.js
 */
var coordinate = require('../src/coordinate');
var assert=require('assert');
describe("Layout",function(){
	
	describe('a Layout',function(){
		beforeEach(function(){
			this.layout = new coordinate.layouts.Layout();
		});

		it('exists',function(){
			assert.ok(this.layout!==null);
		});

		it('can have nodes',function(){
			this.layout.addNodes(10);
			assert.equal(this.layout.size,10);
		});

	});
});

/*************
 *   NODES   *
 *************/

describe("coordinate.nodes",function(){
	describe("twodee",function(){
		describe("Node2d",function(){
			beforeEach(function(){
				this.node2d = new coordinate.nodes.twodee.Node2d({},0,0,1,1);
			});
			it('jitterX and jitterY are between -1 and 1',function(){
				assert.ok(this.node2d.jitterX < 1 && this.node2d.jitterX > -1);
				assert.ok(this.node2d.jitterY < 1 && this.node2d.jitterY > -1);
			});
		});
		describe('GridNode',function(){
			beforeEach(function(){
				this.link = {};
				this.gridNode=new coordinate.nodes.twodee.GridNode(this.link,2,4,10,15,1,1);
			});
			it("behaves as expected",function(){
				assert.equal(this.gridNode.link,this.link);
				assert.equal(this.gridNode.x,10);
				assert.equal(this.gridNode.y,15);
				assert.equal(this.gridNode.column,2);
				assert.equal(this.gridNode.row,4);
			});
		});
	});
});

describe("Extend",function(){
	var o1={foo:"foo"},o2={bar:"bar"};
	var o = coordinate.utils.extend(o1,o2);
	it(" o gets o1 and o2 properties",function(){
		assert.equal(o.foo,"foo");
		assert.equal(o.bar,"bar");
	});
});