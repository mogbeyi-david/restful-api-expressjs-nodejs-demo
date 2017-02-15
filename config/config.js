var config = {
	query_limit : 50,
	mongodb : {
		host : 'localhost',
		port : 27017,
		db 	 : 'test',
	},
	secret : "abcdbef",
	error : {
		100 : "An error occurred",
		101 : "Missing required parameters",
		102 : "Missing url params",
		221 : "Could not create",
		222 : "Could not update",
		223 : "Could find user",
	},
	admin_secret_key : "gagdsgagsdgagsgasgagsgagssg",
};

module.exports = config;