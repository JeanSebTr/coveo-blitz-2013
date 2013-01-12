
var http = require('http');

var async = require('async');
var request = require('request');

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

function createJob(type) {
    var url = process.env.DATA_WEB_SERVICE + '/BlitzDataWebService/' + type;
    return function(cb) {
        console.log('GET', url);
        request(url + '?page=0&size=100', function(err, response, body) {
            if(err) {
                cb(err);
            }
            else {
                var data;
                try {
                    data = JSON.parse(body);
                    var tasks = [];
                    for(var i=0; i<data.content.length; i++) {
                        tasks.push(fetchItem.bind(null, type, data.content[i].id));
                    }
                    if(!data.lastPage) {
                        tasks.push(fetchPages.bind(null, type, 1, data.totalPages));
                    }
                    async.parallel(tasks, cb);
                }
                catch(e) {
                    cb(e);
                }
            }
        });
    };
}

function fetchPages(type, from, to, cb) {
    for(var i=from; i<to; i++) {
        var url = process.env.DATA_WEB_SERVICE+'/BlitzDataWebService/'+type+'?size=100&page='+i;
        console.log('GET', url);
        request(url, function(err, response, body) {
            var data;
            try {
                data = JSON.parse(body);
                var tasks = [];
                for(var j=0; j<data.content.length; j++) {
                    tasks.push(fetchItem.bind(null, type, data.content[j].id));
                }
                async.parallel(tasks, cb);
            }
            catch(e) {
                cb(e);
            }
        });
    }
}

function fetchItem(type, id, cb) {
    var url = process.env.DATA_WEB_SERVICE+'/BlitzDataWebService/'+type+'/'+id;
    console.log('GET', url);
    request(url, function(err, response, body) {
        if (err)
        cb(err);
        else {
            var doc = JSON.parse(body);
            doc.type = type;
            Indexer(doc);
            cb(null);
        }
    });
}


var Crawler = function(){
    var _this = this;
    _this.start = function(callback){
        http.get(process.env.DATA_WEB_SERVICE +
            '/BlitzDataWebService/evaluationRun/start?runId=' +
            process.env.RUN_ID, function(res) {
            async.parallel([
                createJob('artists'),
                createJob('albums')
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

    /*_this.job = new nodeio.Job({
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
    });*/
};

module.exports = Crawler;
