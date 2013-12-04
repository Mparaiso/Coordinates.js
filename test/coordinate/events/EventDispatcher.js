/*global it,coordinate */

var util, assert = require('assert');
util = require('util');
describe('A event dispatcher', function() {"use strict";
    var e = "AN_EVENT",e1="ANOTHER_EVENT", ed = new coordinate.events.EventDispatcher();
    it('has a constructor', function() {
        assert.ok(ed !== null);
    });
    it('dispatches an event', function(done) {
        ed.addEventListener(e, done.bind(null,undefined));
        ed.dispatchEvent(e);
        ed.dispatchEvent(e1);// done should not be called
    });
    it('can remove a registered listener',function(done){
        function listener(){ done(new Error());}
        ed.addEventListener(e,listener);
        ed.removeEventListener(e,listener);
        ed.dispatchEvent(e);
        done();
    });
});
