var CompanyModel = require('../model/company');
var lib_response     = require('../lib/response');
var _config		 = require('../config/config');

var company = {
	create_company : function(data, callback){
		CompanyModel.create(data,function(err, response){
			if(err){
				return callback(lib_response.response_bad(221, _config.error[221],err))
			}
			return callback(lib_response.response_ok(response));
		})
	},

	get : function(query, callback){
		if(!query) query = {};

		CompanyModel.get(query, function (err, response) {
			if(err){
				return callback(lib_response.response_bad(223, _config.error[223],err))
			}
			// console.log(response);
			return callback(lib_response.response_ok(response));
		});
	},

	get_bulk : function (params, callback) {
		CompanyModel.get_bulk(params, function (err,response) {
			if(err){
				return callback(lib_response.response_bad(100, _config.error[100],err))
			}
			// console.log(response);
			return callback(lib_response.response_ok(response));
		})
	},

	update : function(params,callback){
		var conditions = {company_id: params.company_id};
		var query      = {'$set':params};
		CompanyModel.update(conditions,query,function(err,response){
			if(err){
				return callback(lib_response.response_bad(222, _config.error[222],err))
			}
			console.log(response);
			return callback(lib_response.response_ok(response));
		})
	},

	remove : function(params, callback){
		var conditions = { company_id : params.company_id};
		CompanyModel.remove(conditions,function (err, response) {
			if(err){
				return callback(lib_response.response_bad(222, _config.error[222],err))
			}
			// console.log(response);
			return callback(lib_response.response_ok(response));
		})
	},
};

module.exports = company;