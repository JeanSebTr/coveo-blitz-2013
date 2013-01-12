var indexer = function(doc) {
    console.log(doc);
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
