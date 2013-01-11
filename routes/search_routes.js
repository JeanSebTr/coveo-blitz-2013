
var Search = require('../api/search');

module.exports.index = function(req, res){
    Search.index('coveo-blitz-2013', function(err, results){
        //TODO error handling
        res.json(results);
    });
};
