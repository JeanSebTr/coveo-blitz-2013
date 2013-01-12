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




module.exports.Indexer = indexer;
