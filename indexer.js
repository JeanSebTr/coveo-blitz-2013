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
    if (doc.type == 'artists') {
        indexArtist.indexArtist(doc);
    } else if (doc.type == 'albums') {
        indexAlbum.indexAlbum(doc);
    }
};




module.exports.Indexer = indexer;
