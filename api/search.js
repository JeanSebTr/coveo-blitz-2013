
module.exports.index = function(query, callback){
    var results = [];
    var result = {
        hello: "world",
        query: query
    };
    results.push(result)
    callback(null, results);
};
