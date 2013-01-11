
var express = require('express');
var http = require('http');
var path = require('path');
var expressHTMLSnapshots = require('express-html-snapshots');

module.exports = function(){
    var _this = this;

    _this.app = express()
    _this.expressServer = http.createServer(_this.app);
    
    _this.start = function(callback){
        _this.app.configure(function(){
            _this.app.set('port', process.env.PORT || 3000);
            _this.app.set('views', __dirname + '/views');
            _this.app.set('view engine', 'jade');
            _this.app.use(express.favicon());
            _this.app.use(express.logger('dev'));
            _this.app.use(express.bodyParser());
            _this.app.use(express.methodOverride());
            _this.app.use(expressHTMLSnapshots.googlebotMiddleware);
            _this.app.use(_this.app.router);
            _this.app.use(require('stylus').middleware(__dirname + '/public'));
            _this.app.use(express.static(path.join(__dirname, 'public')));
        });

        _this.app.configure('development', function(){
            _this.app.use(express.errorHandler());
        });

        require('./routes_map')(_this.app);

        _this.expressServer.listen(_this.app.get('port'), function(err){
            if(err){
                callback(err);
            }
            else{
                callback(null, "Express server listening on port " + _this.app.get('port'));
            }
        });
    };

    _this.close = function(callback){
        _this.expressServer.close(callback);
    };
};
