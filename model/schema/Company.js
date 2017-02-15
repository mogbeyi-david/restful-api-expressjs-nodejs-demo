var mongoose = require('../../lib/mongo'),
autoIncrement = require('mongoose-auto-increment');

var CompanySchema = mongoose.Schema({
	name: { type: String, required: true, unique: true },
	company_id : Number,
	description: String,
	year_founded: Number,
	num_employees: Number,
	contact_name: String,
	contact_email: String,
	location: String,
	financial : Number,
	team : Number,
	idea : Number,
	created_at: {type: Date, default: Date.now},
    updated_at: Date,
});

autoIncrement.initialize(mongoose.connection);

CompanySchema.plugin(autoIncrement.plugin, {model: 'Company', field: 'company_id'})

CompanySchema.pre('save',function(next){
	var current_date = new Date();
	this.updated_at = current_date;

	if(!this.created_at)
		this.created_at = current_date;

	next();
});

var CompanyModel = mongoose.model('Company', CompanySchema);

module.exports = CompanyModel;