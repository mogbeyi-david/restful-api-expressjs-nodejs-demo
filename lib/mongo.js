var mongoose = require('mongoose');
//importing configuration from db
var _config    = require('../config/config');
//setting mongo cluster
var url = 'mongodb://'+_config.mongodb.host+':'+_config.mongodb.port+'/'+_config.mongodb.db;
mongoose.connect(url);

var db = mongoose.connection;
db.once('open',function(){
    console.log("Successfully connected to mongodb");
});

module.exports = mongoose;