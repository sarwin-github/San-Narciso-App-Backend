const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const residentSchema = mongoose.Schema({
	date_of_filing : { type: Date, required: true },
	case_number    : { type: String, required: true },
	description    : { type: String, required: true },
	status     : { type: String, default: 'Pending', required: true },
	complainant : {
        type: Schema.Types.ObjectId,
        ref: 'Resident'
	},
	complained_resident : {
        type: Schema.Types.ObjectId,
        ref: 'Resident'
	},
	officer_in_charge : {
        type: Schema.Types.ObjectId,
        ref: 'Resident'
	},
	non_resident_officer_in_charge : {
        type: Schema.Types.ObjectId,
        ref: 'NonResident'
	},
});

module.exports = mongoose.model('Blotter', residentSchema);