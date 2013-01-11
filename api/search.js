
module.exports.index = function(query, callback){
    var result = {
        hello: "world",
        query: query
    };
    callback(null, result);
};
