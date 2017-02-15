var express = require('express');
var router = express.Router();
var company_dao = require('../dao/company');
var lib_reponse = require('../lib/response');
var config      = require('../config/config');

var apiResponse = function(status, res,response){
	if(response.status === false) return res.status(400).json(response);
	return res.status(status).json(response);
	// res.end();
};

router.post('/',function(req,res, next){
	var post = req.body;
	req.checkBody({
		'name' 			: {notEmpty : true},
		'description'   : {notEmpty : true},
		'year_founded'  : {notEmpty : true},
		'contact_name'  : {notEmpty : true},
		'contact_email' : {notEmpty : true, isEmail : true},
		'num_employees' : {notEmpty : true},
        'financial'     : {notEmpty : true},
        'team'          : {notEmpty : true},
        'idea'          : {notEmpty : true}
	});

	var error = req.validationErrors();
	if(error)
    	return apiResponse(400, res,lib_reponse.response_bad(101, config.error[101], error ));
    
	company_dao.create_company(post,function(response){
		return apiResponse(201, res,response)
	});

});

router.get('/',function(req,res,next){
    var sort = {};

	var size  = req.query.size || config.query_limit;
	var key   = req.query.sort_by;

	sort[key]  = -1;
	// var param = req.
	console.log(req.query);


	company_dao.get_bulk({query_limit:size,sort:sort}, function(response){
		return apiResponse(200,res, response);
	});
});

router.get('/:company_id',function(req, res,next){
	req.checkParams({
		company_id : {notEmpty : true}
	});
	var error = req.validationErrors();
	if(error)
		return apiResponse(400, res,lib_reponse.response_bad(102, config.error[102], error ));

	company_dao.get({'company_id': req.params.company_id},function(response){
		return apiResponse(200, res, response);
	});
});

router.put('/',function(req,res,next){
	var params = req.body;
	req.checkBody({
		company_id : {notEmpty : true}
	});
	var error = req.validationErrors();
	if(error)
		return apiResponse(400, res,lib_reponse.response_bad(102, config.error[102], error ));

	company_dao.update(params, function(response){
		return apiResponse(200,res, response);
	});
});

router.delete('/:company_id',function(req, res,next){
	req.checkParams({
		company_id : {notEmpty : true}
	});

	var error = req.validationErrors();
	if(error)
		return apiResponse(400, res,lib_reponse.response_bad(102, config.error[102], error ));

	company_dao.remove({'company_id': req.params.company_id}, function(response){
		return apiResponse(200, res, response);
	});
});

module.exports = router;