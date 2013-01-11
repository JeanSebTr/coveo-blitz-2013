
var Search = require('../api/search');
var expect = require('expect.js');

describe('test search api interactor', function(){
    before(function(done){
        done();
    });

    after(function(done){
        done();
    });

    it('should return a result containing hello world', function(done){
        Search.index('coveo-blitz-2013', function(err, results){
            expect(err).not.to.be.ok();
            expect(results).to.be.ok();
            expect(results).to.have.property('hello', 'world');
            done();
        });
    });
});
