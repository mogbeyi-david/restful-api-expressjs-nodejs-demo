var User = require('./schema/User');
var _config = require('../config/config');

var UserModel = {
    create : function(data, callback){
        var new_user = new User(data);
        new_user.save(function(err,response){
            return callback(err,response);
        });
    },

    get : function (query, fields, callback) {
        var user = User.findOne(query);
        if(fields)
            user.select(fields)
        user.exec(function(err, response){
            return callback(err, response);
        });
    },


};

module.exports = UserModel;