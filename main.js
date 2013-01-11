
var ClusterManager = require('openifyit-commons').ClusterManager;
var Server = require('./server');

var clusterManager = new ClusterManager();

clusterManager.start(Server, function(err, message){
    if(err){
        throw err;
    }
    console.log(message);
});
