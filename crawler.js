
var http = require('http');
var async = require('async');
var nodeio = require('node.io');
var Indexer = require('./indexer').Indexer;


var r = function(self, url, page, callback){
    self.get(url + '?page=' + page, function(err, data){
        data = JSON.parse(data);
        callback(data.content);
        if(data.lastPage){
            callback(false);
        }
        else{
            r(self, url, page + 1, callback);
        }
    });
};

var Crawler = function(){
    var _this = this;
    _this.start = function(callback){
        _this.counter = 0;
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
            callback(e);
        });
    };

    _this.jobArtists = new nodeio.Job({
        input: function (start, num, callback) {
            var url = process.env.DATA_WEB_SERVICE + '/BlitzDataWebService/artists';
            r(this, url, 0, callback);
        },
        run: function (content) {
            _this.counter++;
            var url = process.env.DATA_WEB_SERVICE + '/BlitzDataWebService/artists/' + content.id;
            console.log(url);
            this.get(url, function(err, data){
                console.log('error', err);
                try{
                    data = JSON.parse(data);
                    data.type = 'artist';
                    Indexer(data);
                    this.emit(data);
                }
                catch(err){
                    console.log(content);
                    console.log(data);
                    return;
                }
            });
        },
        output: function(artists){
            this.exit();
        }
    });

    _this.jobAlbums = new nodeio.Job({
        input: function (start, num, callback) {
            var url = process.env.DATA_WEB_SERVICE + '/BlitzDataWebService/albums';
            r(this, url, 0, callback);
        },
        run: function (content) {
            _this.counter++;
            var url = process.env.DATA_WEB_SERVICE + '/BlitzDataWebService/albums/' + content.id;
            this.get(url, function(err, data){
                console.log('error', err);
                try{
                    data = JSON.parse(data);
                    data.type = 'album';
                    Indexer(data);
                    this.emit(data);
                }
                catch(err){
                    console.log(data);
                    console.log(content);
                    return;
                }
            });
        },
        output: function(albums){
            this.exit();
        }
    });
};

module.exports = Crawler;
