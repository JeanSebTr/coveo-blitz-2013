
var SearchRoutes = require('./routes/search_routes');

module.exports = function(app){
    app.get('/api/search', SearchRoutes.index);
};