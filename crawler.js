
var nodeio = require('node.io');

exports.jobArtists = new nodeio.Job({
    input: function (start, num, callback) {
        var url = process.env.DATA_WEB_SERVICE + '/BlitzDataWebService/artists';
        this.get(url, function(err, data){
            data = JSON.parse(data);
            if(!(data instanceof Array)){
                data = [data];
            }
            callback(data);
        });
    },
    run: function (row) {
        this.emit(row);
    },
    output: function(rows){
        this.exit();
    }
});
