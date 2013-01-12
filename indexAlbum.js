var tokenizer = require('./tokenizer');


var indexGenres = function(doc) {
    if (!doc.genres) { return; }
    for (var i = 0; i < doc.genres.length; i++) {
        var genre = doc.genres[i];
        if (!index.genres[genre]) {
            index.genres[genre] = [];
        }
        if (index.genres[genre].indexOf('a' + doc.id) !== -1) { continue; }
        index.genres[genre].push('a' + doc.id);
    }
};


var indexText = function(doc) {
    var text = doc.text;
    if (!text) { return; }
    var tokens = tokenizer.tokenizer(text);
    for (var i = 0; i < tokens.length; i++) {
        var token = tokens[i];
        if (!index.text[token]) {
            index.text[token] = [];
        }
        if (index.text[token].indexOf('a' + doc.id) !== -1) { continue; }
        index.text[token].push('a' + doc.id);
    }
};


var indexTrackNames = function(doc) {
    if (!doc.track_names) { return; }
    for (var i = 0; i < doc.track_names.length; i++) {
        var track = doc.track_names[i];
        if (!index.trackNames[track]) {
            index.trackNames[track] = [];
        }
        if (index.trackNames[track].indexOf('a' + doc.id) !== -1) { continue; }
        index.trackNames[track].push('a' + doc.id);
    }
};


var indexAlbum = function(doc) {
    indexGenres(doc);
    indexText(doc);
    indexTrackNames(doc);

    if (!doc.name) {
        for (var i = 0; i < doc.name.length; i++) {
            var name = doc.name[i];
            if (!index.albums[name]) {
                index.albums[name] = {};
            }
            index.albums[name].artists = doc.artists;
        }
    }
    if (doc.release_date) {
        index.albums[name].releaseDate = doc.release_date[0];
    }
};


module.exports.indexAlbum = indexAlbum;
