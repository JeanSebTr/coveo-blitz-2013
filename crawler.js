
var nodeio = require('node.io');
var Indexer = require('./indexer').Indexer;

module.exports.jobArtists = new nodeio.Job({
    input: function (start, num, callback) {
        var url = process.env.DATA_WEB_SERVICE + '/BlitzDataWebService/artists';
        this.get(url, function(err, data){
            data = JSON.parse(data);
            callback(data.content);
        });
    },
    run: function (content) {
        var url = process.env.DATA_WEB_SERVICE + '/BlitzDataWebService/artists/' + content.id;
        this.get(url, function(err, data){
            data = JSON.parse(data);
            Indexer(data);
            this.emit(data);
        });
    },
    output: function(artists){
        this.exit();
    }
});
