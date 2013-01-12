
var http = require('http');
var async = require('async');
var nodeio = require('node.io');
var Indexer = require('./indexer').Indexer;


var _input = function(self, url, page, callback){
    self.get(url + '?page=' + page, function(err, data){
        try{
            data = JSON.parse(data);
            callback(data.content);
            if(data.lastPage){
                callback(false);
            }
            else{
                _input(self, url, page + 1, callback);
            }
        }
        catch(e){
            callback(false);
        }
    });
};

var Crawler = function(){
    var _this = this;
    _this.start = function(callback){
        _this.counter = 0;
        http.get(process.env.DATA_WEB_SERVICE +
            '/BlitzDataWebService/evaluationRun/start?runId=' +
            process.env.RUN_ID, function(res) {
            async.parallel([
                nodeio.start.bind(nodeio, _this.jobArtists, {}),
                nodeio.start.bind(nodeio, _this.jobAlbums, {})
            ],
            function(){
                http.get(process.env.DATA_WEB_SERVICE +
                    '/BlitzDataWebService/evaluationRun/stop', function(res) {
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
            _input(this, url, 0, callback);
        },
        run: function (content) {
            _this.counter++;
            var url = process.env.DATA_WEB_SERVICE + '/BlitzDataWebService/artists/' + content.id;
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
            this.exit();
        }
    });

    _this.jobAlbums = new nodeio.Job({
        input: function (start, num, callback) {
            var url = process.env.DATA_WEB_SERVICE + '/BlitzDataWebService/albums';
            _input(this, url, 0, callback);
        },
        run: function (content) {
            _this.counter++;
            var url = process.env.DATA_WEB_SERVICE + '/BlitzDataWebService/albums/' + content.id;
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
            this.exit();
        }
    });
};

module.exports = Crawler;
