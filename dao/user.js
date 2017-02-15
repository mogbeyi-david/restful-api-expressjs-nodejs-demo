var UserModel    = require('../model/user');
var lib_response = require('../lib/response');
var _config		 = require('../config/config');
var sha1         = require('sha1');
var jwt          = require('jsonwebtoken');

var user = {

    create_user : function(post,callback){
        UserModel.create(post, function (err,response) {
            if(err){
                return callback(lib_response.response_bad(221, _config.error[221],err))
            }
            return callback(lib_response.response_ok(response));
        });
    },

    login : function(post,callback){
        var conditions = {'email': post.email, password: sha1(post.password)};
        UserModel.get(conditions,"",function (err,response) {
            if(err){
                return callback(lib_response.response_bad(223, _config.error[223],err))
            }
            var token = jwt.sign(response, _config.secret, {
                expiresIn: "2 days" // expires in 48 hours
            });
            var new_output = { 'user_data': response , token : token};
            return callback(lib_response.response_ok(new_output));
        });
    }
};

module.exports = user;