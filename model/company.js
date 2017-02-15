var Company = require('./schema/Company');
var _config = require('../config/config');
var CompanyModel = {
	create : function(data, callback){
		var new_company = new Company(data);
		new_company.save(function(err,response){
			callback(err,response);
		});
	},

	get : function(query, callback){
		Company.findOne(query, function(err, response){
			return callback(err, response);
		});
	},

	get_bulk : function(params, callback){
	    console.log("bulk");
		console.log(params);
		Company.find({}).limit(parseInt(params.query_limit)).sort(params.sort).exec(function(err, response){
			return callback(err, response);
		});
	},

	update : function(conditions, query, callback){
		Company.update(conditions,query,function(err,response){
			return callback(err,response);
		});
	},

	remove : function(conditions, callback){
		Company.remove(conditions,function(err,response){
			return callback(err,response);
		});
	}
};

module.exports = CompanyModel;