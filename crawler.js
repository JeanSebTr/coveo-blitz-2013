
var http = require('http');
var async = require('async');
var nodeio = require('node.io');
var Indexer = require('./indexer').Indexer;

var Crawler = function(){
    var _this = this;
    _this.start = function(callback){
        _this.counter = 0;
        console.log(process.env.START_RUN);
        http.get(process.env.START_RUN, function(res) {
            async.parallel([
                nodeio.start.bind(nodeio, _this.jobArtists, {}),
                nodeio.start.bind(nodeio, _this.jobAlbums, {})
            ],
            function(){
                http.get(process.env.STOP_RUN, function(res) {
                    callback(null);
                }).on('error', function(e) {
                    callback(e);
                });
            });
        }).on('error', function(e) {
            console.log("Got error: " + e.message);
        });
    };

    _this.jobArtists = new nodeio.Job({
        input: function (start, num, callback) {
            var url = process.env.DATA_WEB_SERVICE + '/BlitzDataWebService/artists';
            this.get(url, function(err, data){
                data = JSON.parse(data);
                callback(data.content);
            });
        },
        run: function (content) {
            _this.counter++;
            var url = process.env.DATA_WEB_SERVICE + '/BlitzDataWebService/artists/' + content.id;
            console.log(url);
            this.get(url, function(err, data){
                try{
                    data = JSON.parse(data);
                    data.type = 'artist';
                    Indexer(data);
                    this.emit(data);
                }
                catch(err){
                    return;
                }
            });
        },
        output: function(artists){
            console.log(_this.counter);
            this.exit();
        }
    });

    _this.jobAlbums = new nodeio.Job({
        input: function (start, num, callback) {
            var url = process.env.DATA_WEB_SERVICE + '/BlitzDataWebService/albums';
            console.log(url);
            this.get(url, function(err, data){
                data = JSON.parse(data);
                callback(data.content);
            });
        },
        run: function (content) {
            _this.counter++;
            var url = process.env.DATA_WEB_SERVICE + '/BlitzDataWebService/albums/' + content.id;
            console.log(url);
            this.get(url, function(err, data){
                try{
                    data = JSON.parse(data);
                    data.type = 'album';
                    Indexer(data);
                    this.emit(data);
                }
                catch(err){
                    return;
                }
            });
        },
        output: function(albums){
            console.log(_this.counter);
            this.exit();
        }
    });
};

module.exports = Crawler;
