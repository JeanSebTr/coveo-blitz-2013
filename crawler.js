
var http = require('http');
var async = require('async');
var nodeio = require('node.io');
var Indexer = require('./indexer').Indexer;


var _input = function(self, url, page, callback){
    console.log('GET', url + '?page=' + page + '&size=100');
    self.get(url + '?page=' + page + '&size=100', function(err, data){
        try{
            data = JSON.parse(data);
            callback(data.content);
            console.log('Found %d from %s', data.content.length, url + '?page=' + page);
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
        http.get(process.env.DATA_WEB_SERVICE +
            '/BlitzDataWebService/evaluationRun/start?runId=' +
            process.env.RUN_ID, function(res) {
            async.parallel([
                nodeio.start.bind(nodeio, _this.job, {max: 100, path: '/BlitzDataWebService/artists'}),
                nodeio.start.bind(nodeio, _this.job, {max: 100, path: '/BlitzDataWebService/albums'})
            ],
            function(){
                http.get(process.env.DATA_WEB_SERVICE +
                    '/BlitzDataWebService/evaluationRun/stop', function(res) {
                        console.log('OMG!!!', _this.counter);
                    callback(null);
                }).on('error', function(e) {
                    callback(e);
                });
            });
        }).on('error', function(e) {
            callback(e);
        });
    };

    _this.job = new nodeio.Job({
        input: function (start, num, callback) {
            var url = process.env.DATA_WEB_SERVICE + this.options.path;
            _input(this, url, 0, callback);
        },
        run: function (content) {//console.log(content);
            _this.counter++;
            var url = process.env.DATA_WEB_SERVICE + this.options.path + '/' + content.id;
            console.log('Fetch:', url);
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
};

module.exports = Crawler;
