/// <reference path="../src/coordinate.ts"/>
/**
 * coordinates.test.js
 */
declare var require, describe, beforeEach, it;

var coordinate = require('../src/coordinate');
var assert = require('assert');

describe("Layout", function() {
    describe('a Layout', function() {
        beforeEach(function() {
            this.layout = new coordinate.layouts.Layout();
        });

        it('exists', function() {
            assert.ok(this.layout !== null);
        });

        it('can have nodes', function() {
            this.layout.addNodes(10);
            assert.equal(this.layout.size, 10);
        });

    });
});

/*************
 *   NODES   *
 *************/

describe("coordinate.nodes", function() {
    describe("twodee", function() {
        describe("Node2d", function() {
            beforeEach(function() {
                this.node2d = new coordinate.nodes.twodee.Node2d({}, 0, 0, 1, 1);
            });
            it('jitterX and jitterY are between -1 and 1', function() {
                assert.ok(this.node2d.jitterX < 1 && this.node2d.jitterX > -1);
                assert.ok(this.node2d.jitterY < 1 && this.node2d.jitterY > -1);
            });
        });
        describe('GridNode', function() {
            beforeEach(function() {
                this.link = {};
                this.gridNode = new coordinate.nodes.twodee.GridNode(this.link, 2, 4, 10, 15, 1, 1);
            });
            it("behaves as expected", function() {
                assert.equal(this.gridNode.link, this.link);
                assert.equal(this.gridNode.x, 10);
                assert.equal(this.gridNode.y, 15);
                assert.equal(this.gridNode.column, 2);
                assert.equal(this.gridNode.row, 4);
            });
        });
    });
});

/**************
 * LAYOUTS    *
 *************/

describe("coordinate.layouts", function() {
    describe("twodee", function() {
        describe("Grid", function() {
            beforeEach(function() {
                this.grid = new coordinate.layouts.twodee.Grid(40, 40, 4, 4, 0, 0, 0, 0, 0, 0);
                this.links = (function() {
                    var r: Array<Object> = [];
                    for (var i = 0; i < 16; i++) {
                        r.push({});
                    }
                    return r;
                } ());
            });
            it("constructor should behave as expected", function() {
                assert(this.grid !== null);
                assert.ok(this.grid.getColumn instanceof Function);
                assert.equal(this.grid.width, 40);
                assert.equal(this.grid.height, 40);
                assert.equal(this.grid.columns, 4);
            });
            it("addNode, has the right node count", function() {
                this.links.forEach((link) => this.grid.addNode(link));
                assert.equal(this.grid.size, 16);
                assert.equal(this.grid.nodes.length, 16);
                assert.equal(this.grid.nodes[0].x, 0);
                assert.equal(this.grid.nodes[0].y, 0);
                assert.equal(this.grid.nodes[1].x, 10);
                assert.equal(this.grid.nodes[1].y, 0);
                assert.equal(this.grid.nodes[2].x, 20);
                assert.equal(this.grid.nodes[1].y, 0);
            });
        });
    });
});

describe("Extend", function() {
    var o1 = {
        foo: "foo"
    }, o2 = {
            bar: "bar"
        };
    var o = coordinate.utils.extend(o1, o2);
    it(" o gets o1 and o2 properties", function() {
        assert.equal(o.foo, "foo");
        assert.equal(o.bar, "bar");
    });
}); 