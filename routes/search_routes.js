
var Search = require('../api/search');

module.exports.index = function(req, res){
    Search.index(req.query.q, function(err, results){
        res.json(results);
    });
};
