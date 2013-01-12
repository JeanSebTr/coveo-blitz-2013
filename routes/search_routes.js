
var Search = require('../api/search');
var request = require('request');
var querystring = require('querystring');

exports.index = function(req, res){
    var q = req.query.q;
    //delete req.query.q;
    //var facets = req.query;
    //console.log('--', req.query, querystring.stringify(req.query));


    request('http://ec2-23-22-13-188.compute-1.amazonaws.com/Search?' + querystring.stringify(req.query), function (error, response, body) {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(response.body);
    });

    //Search.index(q || '', facets, function(err, results) {
    //    res.set('Server', 'Nodejs by Winning Team 2012');
    //    if(err) {
    //        res.json(500, {error: 'Nooooo :('});
    //        console.error('Error executing query:', error);
    //    } else {
    //        res.json(results);
    //    }
    //});
};
