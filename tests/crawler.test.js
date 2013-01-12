
var nodeio = require('node.io');
var Crawler = require('../crawler');
var expect = require('expect.js');

describe('test crawler', function(){
    before(function(done){
        done();
    });

    after(function(done){
        done();
    });

    it('should return all the artists from the web service', function(done){
        nodeio.start(Crawler.jobArtists, {}, done);
    });
});
