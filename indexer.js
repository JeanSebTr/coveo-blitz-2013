var index = {};


var indexer = function(doc) {
    console.log(doc);
    if (doc.type == 'artist') {
        indexArtist(doc);
    } else if (doc.type == 'album') {
        indexAlbum(doc);
    }
};


var indexArtist = function(doc) {
    var docId = doc.id;
    // Genres
    for (var i = 0; i < doc.genres; i++) {
        var genre = doc.genres[i];
        if (!index[genre]) {
            index[genre] = [];
        }
        index[genre].push(docId);
    }
    console.log(index);
};


/**
 * Tokenize a string.
 */
var tokenizer = function(str) {
    var tokens = [];
    var currentIdx = 0;
    for (var i = 0; i < str.length; i++) {
        if (str[i] != ' ') {
            continue;
        }
        var word = str.substring(currentIdx, i);
        tokens.push(word);
        currentIdx = ++i;
    }
    return tokens;
};


module.exports.Indexer = indexer;
