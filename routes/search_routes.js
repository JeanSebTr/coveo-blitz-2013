
var Search = require('../api/search');

exports.index = function(req, res){
    var q = req.query.q;
    delete req.query.q;
    var facets = req.query;
    Search.index(q || '', facets, function(err, results) {
        res.set('Server', 'Nodejs by Winning Team 2012');
        if(err) {
            res.json(500, {error: 'Nooooo :('});
            console.error('Error executing query:', error);
        } else {
            res.json(results);
        }
    });
};
