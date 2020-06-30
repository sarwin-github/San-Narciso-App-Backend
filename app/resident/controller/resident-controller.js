const mongoose  = require('mongoose');
const Resident  = require('../model/resident');
const async     = require('async');

/**
	@swagger
	/resident/list:
		get:
			tags:
				- "resident"
			description: "get all residents"
			responses:
				"200":
					description: "return list of residents"
*/
module.exports.getResidents = (req, res) => {
	let query = Resident.find({}).select({'__v': 0});

	query.exec((err, residents) => {
		if(err){
			return res.status(500).json({ 
				success  : false, 
				error   : err, 
				message : 'Server error.'
			});
		} if(!residents){
			return res.status(404).json({
				success  : false,
				message : 'A list of residents does not exist.'
			});
		}

		res.status(200).json({
			success   : true, 
			message   : 'Successfully fetched the list of residents.',
			residents : residents,
		});
	});
}

/**
	@swagger
	/resident/create:
		post:
			tags:
				- "resident"
			description: "add new resident"
			responses:
				"200":
					description: "Successfully created a new resident"
*/
module.exports.addNewResident = (req, res) => {
	let resident = new Resident();

	resident.email        = req.body.email;
	resident.first_name   = req.body.first_name;
	resident.middle_name  = req.body.middle_name;
	resident.last_name    = req.body.last_name;
	resident.street       = req.body.street;
	resident.barangay     = req.body.barangay;
	resident.city         = req.body.city;
	resident.phone        = req.body.phone;
	resident.citizenship  = req.body.citizenship;
	resident.religion     = req.body.religion;
	resident.province     = req.body.province;
	resident.gender       = req.body.gender;
	resident.birthday     = req.body.birthday;
	resident.birthplace   = req.body.birthplace;
	resident.age          = req.body.age;
	resident.civil_status = req.body.civil_status;
	resident.occupation   = req.body.occupation;
	resident.tin_number   = req.body.tin_number;
	resident.period_of_residence = req.body.period_of_residence;
	resident.voters_id_number = req.body.voters_id_number;
	resident.precint_assignment_number = req.body.precint_assignment_number;

	resident.mother_information.first_name  = req.body.mother_information_first_name;
	resident.mother_information.middle_name = req.body.mother_information_middle_name;
	resident.mother_information.last_name   = req.body.mother_information_last_name;

	resident.father_information.first_name  = req.body.father_information_first_name;
	resident.father_information.middle_name = req.body.father_information_middle_name;
	resident.father_information.last_name   = req.body.father_information_last_name;

	resident.save((err) => {
		if(err){
		    return res.status(500).json({success: false, error: err, message: 'Something went wrong with the server.'});
		}

	    res.status(200).json({
		    success : true, 
		    message : 'Successfully created a new resident'	    	
	    });
	});
}


/**
	@swagger
	/resident/details/{residentID}:
		get:
			tags:
				- "resident"
			description: "add new resident"
			parameters:
        		- name: "residentID"
          		description: "resident id"
          		in: "path"
          		type: "string"
          		required: true
			responses:
				"200":
					description: "Successfully fetched resident details"
*/
module.exports.getResidentDetails = (req, res) => {
	let query = Resident.findById({ _id: req.params.id }).select({'__v': 0});

	query.exec((err, resident) => {
		if(err){
			return res.status(500).json({ 
				success  : false, 
				error   : err, 
				message : 'Server error.'
			});
		} if(!resident){
			return res.status(404).json({
				success  : false,
				message : 'The resident you are looking for does not exist.'
			});
		}

		res.status(200).json({
			success  : true, 
			message  : 'Successfully fetched the resident detail for edit',
			resident : resident
		});
	});
};

/**
	@swagger
	/resident/update/{residentID}:
		put:
			tags:
				- "resident"
			description: "update resident details"
			parameters:
        		- name: "residentID"
          		description: "resident id"
          		in: "path"
          		type: "string"
          		required: true
			responses:
				"200":
					description: "Successfully updated resident details"
*/
module.exports.updateResidentDetail = (req, res) => {
	async.waterfall([
		// find resident by id
	    (callback) => {
	      	let query = Resident.findById({ _id: req.params.id }).select({'__v': 0});

  	      	query.exec((err, resident) => {
  		        if(!resident){
        			return res.status(404).json({
        				success  : false,
        				message : 'The resident you are looking for does not exist.'
        			});
        		}

  		        callback(err, resident);
  	      	});
	    }, 
	    // update resident
	    (resident, callback) => {
	    	resident.email        = req.body.email;
	    	resident.first_name   = req.body.first_name;
	    	resident.middle_name  = req.body.middle_name;
	    	resident.last_name    = req.body.last_name;
	    	resident.street       = req.body.street;
	    	resident.barangay     = req.body.barangay;
	    	resident.city         = req.body.city;
	    	resident.phone        = req.body.phone;
	    	resident.citizenship  = req.body.citizenship;
	    	resident.religion     = req.body.religion;
	    	resident.province     = req.body.province;
	    	resident.gender       = req.body.gender;
	    	resident.birthday     = req.body.birthday;
	    	resident.birthplace   = req.body.birthplace;
	    	resident.age          = req.body.age;
	    	resident.civil_status = req.body.civil_status;
	    	resident.occupation   = req.body.occupation;
	    	resident.tin_number   = req.body.tin_number;
	    	resident.period_of_residence = req.body.period_of_residence;
	    	resident.voters_id_number = req.body.voters_id_number;
	    	resident.precint_assignment_number = req.body.precint_assignment_number;

	    	resident.mother_information.first_name  = req.body.mother_information_first_name;
	    	resident.mother_information.middle_name = req.body.mother_information_middle_name;
	    	resident.mother_information.last_name   = req.body.mother_information_last_name;

			resident.father_information.first_name  = req.body.father_information_first_name;
			resident.father_information.middle_name = req.body.father_information_middle_name;
			resident.father_information.last_name   = req.body.father_information_last_name;

	    	resident.save(err => {
	    		callback(err, resident);
	    	});
	    }], (err) => {
		    if(err) {
		    	return res.status(500).json({ 
		    		success  : false, 
		    		error   : err, 
		    		message : 'Server error.'
		    	});
		    }
		    
		    res.status(200).json({
			    success : true, 
			    message : 'Successfully updated resident details'	    	
		    });
	});
};

/**
	@swagger
	/resident/delete/{residentID}:
		delete:
			tags:
				- "resident"
			description: "delete resident details"
			parameters:
        		- name: "residentID"
          		description: "resident id"
          		in: "path"
          		type: "string"
          		required: true
			responses:
				"200":
					description: "Successfully deleted a resident details"
*/
module.exports.deleteResident = (req, res) => {
	let query = Resident.findOneAndRemove({ _id: req.params.id });

	query.exec((err, resident) => {
		if(err){
			return res.status(500).json({ 
				sucess  : false, 
				error   : err, 
				message : 'Server error.'
			});
		} if(!resident){
			return res.status(404).json({
				sucess  : false,
				message : 'The resident you are looking for does not exist.'
			});
		}

	    res.status(200).json({
		    success : true, 
		    message : 'Successfully deleted a resident details'	    	
	    });
	});
};