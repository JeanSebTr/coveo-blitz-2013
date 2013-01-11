
var SearchRoutes = require('./routes/search_routes');
var WebsiteRoutes = require('./routes/website_routes');

module.exports = function(app){
    
    app.get('/', WebsiteRoutes.index);
    app.get('/partials/:name', WebsiteRoutes.partials);

    app.get('/api/search', SearchRoutes.index);
};