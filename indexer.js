var indexer = function(doc) {

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


var test = "This is, if I'm not mistaken, a half-good example of what a less naïve tokenizer (if such a contraption exists) should be able to index! -- For good measure, it should also parse numbers like 1000... We can index python magic methods like __init__, but we will ignore things like -----! Aren't we good?"


tokenizer(test);
