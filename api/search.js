var indexer = require('../indexer');

exports.index = function(query, facets, callback) {
    var qList = query.trim().split(' ');
    var search = {
        type: 'AND',
        q: [],
        facets: {}
    };
    var i;
    for(i=qList.length-1; i>=0; i--) {
        var w = qList[i];
        if(w.toUpperCase() == 'OR') {
            search.type = 'OR';
        }
        else if(w.toUpperCase() != 'AND') {
            search.q.push(w.toLowerCase());
        }
    }
    for(var k in facets) {
        var fList = facets[k].split('OR');
        for(i=fList.length-1; i>=0; i--) {
            fList[i] = fList[i].trim();
        }
        search.facets[k] = fList;
    }

    var allIds = [];
    for (var i = 0; i < qList.length; i++) {
        var ids = index.text[qList[i]];
        if (!ids) { continue; }
        for (var j = 0; j < ids.length; j++) {
            allIds.push({id: ids[j].slice(1)});
        }
    }
    console.log(allIds, query);
    callback(null, {
        facets: {
            //
        },
        results: allIds
    });
};



//var fs = require('fs');
//var tmp = 'artist';
//fs.readFile(tmp + '.txt', function (err, data) {
//    data = JSON.parse(data);
//    data.type = tmp;
//    indexer.Indexer(data);
//    exports.index('music', {}, function() {});
//});
