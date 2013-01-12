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


module.exports.tokenizer = tokenizer;


//var test = "This is, if I'm not mistaken, a half-good example of what a less naïve tokenizer (if such a contraption exists) should be able to index! -- For good measure, it should also parse numbers like 1000... We can index python magic methods like __init__, but we will ignore things like -----! Aren't we good?";


//console.log(tokenizer(test));
