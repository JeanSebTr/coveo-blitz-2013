
exports.index = function(query, facets, callback){
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
    callback(null, {
        facets: {
            //
        },
        results: [
            //
        ]
    });
};
