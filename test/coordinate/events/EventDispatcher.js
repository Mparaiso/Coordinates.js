/*global it,coordinate */

var assert=require('assert');

describe('A event dispatcher',function(){
    "use strict";
	it('has a constructor',function(){
		assert.equal(typeof(coordinate.events.EventDispatcher),'function');
	});
});