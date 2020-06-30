const mongoose = require('mongoose');

const residentSchema = mongoose.Schema({
	email      : { type: String, required: true },
	profile_image_url: { type: String },
	// personal
	first_name : { type: String, required: true },
	middle_name: { type: String, required: true },
	last_name  : { type: String, required: true },
	street     : { type: String, required: true },
	barangay   : { type: String, required: true },
	city       : { type: String, required: true },
	phone      : { type: String },
	citizenship: { type: String, required: true },
	religion   : { type: String },
	province   : { type: String, required: true },
	gender     : { type: String, required: true },
	// birth info
	birthday   : { type: Date, required: true },
	birthplace : { type: String, required: true },
	age        : { type: String, required: true },
	// career info
	civil_status: { type: String, required: true },
	occupation : { type: String, required: true },
	tin_number : { type: String },
	period_of_residence: { type: String },
	voters_id_number: { type: String },
	precint_assignment_number: { type: String },
	// mother info
	mother_information: {
		first_name  : { type: String },
		middle_name : { type: String },
		last_name   : { type: String },
	},
	// father info
	father_information: {
		first_name  : { type: String },
		middle_name : { type: String },
		last_name   : { type: String },
	}
});

module.exports = mongoose.model('Resident', residentSchema);