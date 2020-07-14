const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const residentSchema = mongoose.Schema({
	house_image_url: { type: String },
	// personal
	household_head : {
	    type: Schema.Types.ObjectId,
	    ref: 'Resident'
	},
	household_name: { type: String, required: true },
	household_number  : { type: String, required: true },
	street     : { type: String, required: true },
	barangay   : { type: String, required: true },
	city       : { type: String, required: true },
	province   : { type: String, required: true },
	household_inhabitants : [
		{
	        type: Schema.Types.ObjectId,
	        ref: 'Resident'
	    }
	]
	
});

module.exports = mongoose.model('Household', residentSchema);