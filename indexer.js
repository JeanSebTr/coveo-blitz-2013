var indexArtist = require('./indexArtist');
var indexAlbum = require('./indexAlbum');

index = {
    genres: {},
    origins: {},
    instruments: {},
    text: {},
    artists: {},
    albums: {},
    labels: {},
    trackNames: {},
    groupNames: {}
};


var indexer = function(doc) {
    if (doc.type == 'artist') {
        indexArtist.indexArtist(doc);
    } else if (doc.type == 'album') {
        indexAlbum.indexAlbum(doc);
    }
};


var fs = require('fs');
var tmp = 'artist';
fs.readFile(tmp + '.txt', function (err, data) {
    data = JSON.parse(data);
    data.type = tmp;
    indexer(data);
});




module.exports.Indexer = indexer;
