var tokenizer = require('./tokenizer');


var indexGenres = function(doc) {
    if (!doc.genres) { return; }
    for (var i = 0; i < doc.genres; i++) {
        var genre = genres[i];
        if (!index.genres[genre]) {
            index.genres[genre] = [];
        }
        index.genres[genre].push('b' + doc.id);
    }
};


var indexOrigins = function(doc) {
    if (!doc.origin) { return; }
    for (var i = 0; i < doc.origin; i++) {
        var origin = doc.origin[i];
        if (!index.origins[origin]) {
            index.origins[origin] = [];
        }
        index.origins[origin].push('b' + doc.id);
    }
};


var indexInstrumentsPlayed = function(doc) {
    if (!doc.instruments_played) { return; }
    for (var i = 0; i < doc.instruments_played; i++) {
        var instrument = doc.instruments_played[i];
        if (!index.instruments[instrument]) {
            index.instruments[instrument] = [];
        }
        index.instruments[instrument].push('b' + doc.id);
    }
};


var indexText = function(doc) {
    var text = doc.text;
    if (!text) { return; }
    var tokens = tokenizer.tokenizer(doc.text);
    for (var i = 0; i < tokens.length; i++) {
        var token = tokens[i];
        if (!index.text[token]) {
            index.text[token] = [];
        }
        index.text[token].push('b' + doc.id);
    }
};


var indexLabels = function(doc) {
    if (!doc.labels) { return; }
    for (var i = 0; i < doc.labels.length; i++) {
        var label = doc.labels[i];
        if (!index.labels[label]) {
            index.labels[label] = [];
        }
        index.labels[label].push('b' + doc.id);
    }
};


var indexGroupNames = function(doc) {
    if (!doc.group_names) { return; }
    for (var i = 0; i < doc.group_names.length; i++) {
        var group = doc.group_names[i];
        if (!index.groupNames[group]) {
            index.groupNames[group] = [];
        }
        index.groupNames[group].push('b' + doc.id);
    }
};


var indexArtist = function(doc) {
    indexGenres(doc);
    indexGenres(doc);
    indexInstrumentsPlayed(doc);
    indexLabels(doc);
    indexText(doc);
    indexGroupNames(doc);

    for (var i = 0; i < doc.name; i++) {
        if (!index.artists[name]) {
            index.artists[name] = {};
        }
        index.artists[name].albums = doc.albums;
    }

    // Origins
    console.log(index);
};


module.exports.indexArtist = indexArtist;
