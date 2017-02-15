var mongoose = require('../../lib/mongo');
var sha1     = require('sha1');

var UserSchema = mongoose.Schema({
	first_name 	: { type: String, required: true,},
	last_name 	: { type: String, required: true,},
	password 	: { type: String, required: true, select: false },
	email 		: { type: String, required: true, unique: true },
	created_at	: { type: Date, default: Date.now},
    updated_at	: Date,
});


UserSchema.methods.hash_password = function(){
	this.password = sha1(this.password);
	return this.password;
};

UserSchema.pre('save',function(next){
	this.hash_password();
	var current_date = new Date();
	this.updated_at = current_date;

	if(!this.created_at) this.created_at = current_date;
	return next();
});

var UserModel = mongoose.model('User',UserSchema);

module.exports = UserModel;