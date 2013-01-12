
exports.index = function(query, facets, callback){
    var results = [
        {
            hello: "world",
            query: query
        },
        {
            hello: "jack",
            query: query + ' hehe'
        }
    ];
    callback(null, results);
};
