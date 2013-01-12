var index = {};


var indexer = function(doc) {
    if (doc.type == 'artist') {
        indexArtist(doc);
    } else if (doc.type == 'album') {
        indexAlbum(doc);
    }
};


var indexGenres = function(doc) {
    var docId = doc.id;
    for (var i = 0; i < doc.genres; i++) {
        var genre = genres[i];
        if (!index[genre]) {
            index[genre] = [];
        }
        index[genre].push(docId);
    }
};


var indexOrigins = function(doc) {
    var docId = doc.id;
    for (var i = 0; i < doc.origin; i++) {
        var origin = doc.origin[i];
        if (!index[origin]) {
            index[origin] = [];
        }
        index[origin].push(docId);
    }
};


var indexInstrumentsPlayed = function(doc) {
    var docId = doc.id;
    for (var i = 0; i < doc.instruments_played; i++) {
        var instrument = doc.instruments_played[i];
        if (!index[instrument]) {
            index[instrument] = [];
        }
        index[instrument].push(docId);
    }
};


var indexText = function(doc) {
    var text = doc.text;
    var tokens = tokenizer(doc.text);
    console.log(tokens);
};


var indexArtist = function(doc) {
    var docId = doc.id;
    indexGenres(doc);
    indexGenres(doc);
    indexInstrumentsPlayed(doc);
    indexText(doc);

    // Origins
    console.log(index);
};


/**
 * Make sure the character is acceptable.
 */
var isGoodChar = function(character) {
    var acceptedChars = 'abcdefghijklmnopqrstuvwxyz0123456789-_';
    return acceptedChars.indexOf(character) !== -1;
};


/**
 * Tokenize a string.
 */
var tokenizer = function(str) {
    var tokens = [];
    var start = 0;
    var newWord = true;
    str = str.toLowerCase(str);
    for (var i = 0; i < str.length; i++) {
        var character = str[i];
        if (newWord) {
            if (!isGoodChar(character)) {
                start = i + 1;
                continue;
            }
        }
        if (isGoodChar(character)) {
            newWord = false;
            continue;
        }
        var word = str.substring(start, i);
        tokens.push(word);
        newWord = true;
        start = i + 1;
    }
    return tokens;
};


//var test = "This is, if I'm not mistaken, a half-good example of what a less naïve tokenizer (if such a contraption exists) should be able to index! -- For good measure, it should also parse numbers like 1000... We can index python magic methods like __init__, but we will ignore things like -----! Aren't we good?";


//console.log(tokenizer(test));


module.exports.Indexer = indexer;
