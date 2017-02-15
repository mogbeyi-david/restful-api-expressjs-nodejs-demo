var config = require('../config/config');
var mongoose = require('mongoose');

var Connector = {
	
	_mongo: null,

	MongoDB: function(){
		var _config = config;
        if(Connector._mongo == null){
            mongoose.connect(url);

            var db = mongoose.connection;
            db.once('open',function(){
                console.log("Successfully connected to mongodb");
            });

            Connector._mongo = mongoose;
        }

        return Connector._mongo;
    },

}

module.exports = Connector;