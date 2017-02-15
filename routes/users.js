var express = require('express');
var router = express.Router();
var user_dao = require('../dao/user');
var lib_reponse = require('../lib/response');
var config      = require('../config/config');

var apiResponse = function(status, res,response){
  if(response.status === false) return res.status(400).json(response);
  res.status(status).json(response);
  res.end();
};
/* GET users listing. */

router.post('/',function (req,res,next) {
    console.log("post request");
    var post = req.body;
    req.checkBody({
      first_name 	: {notEmpty : true},
      last_name 	: {notEmpty : true},
      password 	    : {notEmpty : true},
      email 		: {notEmpty : true, isEmail : true},
    });

    var error = req.validationErrors();
    if(error)
      return apiResponse(400, res,lib_reponse.response_bad(102, config.error[102], error ));

    user_dao.create_user(post,function(response){
      console.log('create user');
      return apiResponse(201, res,response);
    });

});

router.post('/login',function(req,res,next){
    var post = req.body;
    req.checkBody({
        'email': {notEmpty : true},
        'password': {notEmpty : true}
    });

    var error = req.validationErrors();
    if(error)
        return apiResponse(400, res,lib_reponse.response_bad(102, config.error[102], error ));

    user_dao.login(post,function (response) {
        return apiResponse(200, res,response);
    });
});

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
