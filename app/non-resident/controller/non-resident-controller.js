const mongoose  = require('mongoose');
const NonResident = require('../model/non-resident');
const async     = require('async');

/**
	@swagger
	/nonResident/list:
		get:
			tags:
				- "nonResident"
			description: "get all nonResidents"
			responses:
				"200":
					description: "return list of nonResidents"
*/
module.exports.getNonResidents = (req, res) => {
	let query = NonResident.find({}).select({'__v': 0});

	query.exec((err, nonResidents) => {
		if(err){
			return res.status(500).json({ 
				success  : false, 
				error   : err, 
				message : 'Server error.'
			});
		} if(!nonResidents){
			return res.status(404).json({
				success  : false,
				message : 'A list of nonResidents does not exist.'
			});
		}

		res.status(200).json({
			success   : true, 
			message   : 'Successfully fetched the list of  non resident person.',
			nonResidents : nonResidents,
		});
	});
}

/**
	@swagger
	/nonResident/create:
		post:
			tags:
				- "nonResident"
			description: "add new nonResident"
			responses:
				"200":
					description: "Successfully created a new nonResident"
*/
module.exports.addNewNonResident = (req, res) => {
	let nonResident = new NonResident();

	nonResident.email        = req.body.email;
	nonResident.first_name   = req.body.first_name;
	nonResident.middle_name  = req.body.middle_name;
	nonResident.last_name    = req.body.last_name;
	nonResident.street       = req.body.street;
	nonResident.barangay     = req.body.barangay;
	nonResident.city         = req.body.city;
	nonResident.phone        = req.body.phone;
	nonResident.citizenship  = req.body.citizenship;
	nonResident.religion     = req.body.religion;
	nonResident.province     = req.body.province;
	nonResident.gender       = req.body.gender;
	nonResident.birthday     = req.body.birthday;
	nonResident.birthplace   = req.body.birthplace;
	nonResident.age          = req.body.age;
	nonResident.civil_status = req.body.civil_status;
	nonResident.occupation   = req.body.occupation;
	nonResident.tin_number   = req.body.tin_number;
	nonResident.period_of_residence = req.body.period_of_residence;
	nonResident.voters_id_number = req.body.voters_id_number;
	nonResident.precint_assignment_number = req.body.precint_assignment_number;

	nonResident.mother_information.first_name  = req.body.mother_information_first_name;
	nonResident.mother_information.middle_name = req.body.mother_information_middle_name;
	nonResident.mother_information.last_name   = req.body.mother_information_last_name;

	nonResident.father_information.first_name  = req.body.father_information_first_name;
	nonResident.father_information.middle_name = req.body.father_information_middle_name;
	nonResident.father_information.last_name   = req.body.father_information_last_name;

	nonResident.save((err) => {
		if(err){
		    return res.status(500).json({success: false, error: err, message: 'Something went wrong with the server.'});
		}

	    res.status(200).json({
		    success : true, 
		    message : 'Successfully created a new  non resident person'	    	
	    });
	});
}


/**
	@swagger
	/nonResident/details/{nonResidentID}:
		get:
			tags:
				- "nonResident"
			description: "add new nonResident"
			parameters:
        		- name: "nonResidentID"
          		description: "nonResident id"
          		in: "path"
          		type: "string"
          		required: true
			responses:
				"200":
					description: "Successfully fetched nonResident details"
*/
module.exports.getNonResidentDetails = (req, res) => {
	let query = NonResident.findById({ _id: req.params.id }).select({'__v': 0});

	query.exec((err, nonResident) => {
		if(err){
			return res.status(500).json({ 
				success  : false, 
				error   : err, 
				message : 'Server error.'
			});
		} if(!nonResident){
			return res.status(404).json({
				success  : false,
				message : 'The non resident person you are looking for does not exist.'
			});
		}

		res.status(200).json({
			success  : true, 
			message  : 'Successfully fetched the  non resident person detail for edit',
			nonResident : nonResident
		});
	});
};

/**
	@swagger
	/nonResident/update/{nonResidentID}:
		put:
			tags:
				- "nonResident"
			description: "update nonResident details"
			parameters:
        		- name: "nonResidentID"
          		description: "nonResident id"
          		in: "path"
          		type: "string"
          		required: true
			responses:
				"200":
					description: "Successfully updated nonResident details"
*/
module.exports.updateNonResidentDetail = (req, res) => {
	async.waterfall([
		// find nonResident by id
	    (callback) => {
	      	let query = NonResident.findById({ _id: req.params.id }).select({'__v': 0});

  	      	query.exec((err, nonResident) => {
  		        if(!nonResident){
        			return res.status(404).json({
        				success  : false,
        				message : 'The  non resident person you are looking for does not exist.'
        			});
        		}

  		        callback(err, nonResident);
  	      	});
	    }, 
	    // update nonResident
	    (nonResident, callback) => {
	    	nonResident.email        = req.body.email;
	    	nonResident.first_name   = req.body.first_name;
	    	nonResident.middle_name  = req.body.middle_name;
	    	nonResident.last_name    = req.body.last_name;
	    	nonResident.street       = req.body.street;
	    	nonResident.barangay     = req.body.barangay;
	    	nonResident.city         = req.body.city;
	    	nonResident.phone        = req.body.phone;
	    	nonResident.citizenship  = req.body.citizenship;
	    	nonResident.religion     = req.body.religion;
	    	nonResident.province     = req.body.province;
	    	nonResident.gender       = req.body.gender;
	    	nonResident.birthday     = req.body.birthday;
	    	nonResident.birthplace   = req.body.birthplace;
	    	nonResident.age          = req.body.age;
	    	nonResident.civil_status = req.body.civil_status;
	    	nonResident.occupation   = req.body.occupation;
	    	nonResident.tin_number   = req.body.tin_number;
	    	nonResident.period_of_residence = req.body.period_of_residence;
	    	nonResident.voters_id_number = req.body.voters_id_number;
	    	nonResident.precint_assignment_number = req.body.precint_assignment_number;

	    	nonResident.mother_information.first_name  = req.body.mother_information_first_name;
	    	nonResident.mother_information.middle_name = req.body.mother_information_middle_name;
	    	nonResident.mother_information.last_name   = req.body.mother_information_last_name;

			nonResident.father_information.first_name  = req.body.father_information_first_name;
			nonResident.father_information.middle_name = req.body.father_information_middle_name;
			nonResident.father_information.last_name   = req.body.father_information_last_name;

	    	nonResident.save(err => {
	    		callback(err, nonResident);
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
			    message : 'Successfully updated  non resident person details'	    	
		    });
	});
};

/**
	@swagger
	/nonResident/delete/{nonResidentID}:
		delete:
			tags:
				- "nonResident"
			description: "delete nonResident details"
			parameters:
        		- name: "nonResidentID"
          		description: "nonResident id"
          		in: "path"
          		type: "string"
          		required: true
			responses:
				"200":
					description: "Successfully deleted a nonResident details"
*/
module.exports.deleteNonResident = (req, res) => {
	let query = NonResident.findOneAndRemove({ _id: req.params.id });

	query.exec((err, nonResident) => {
		if(err){
			return res.status(500).json({ 
				sucess  : false, 
				error   : err, 
				message : 'Server error.'
			});
		} if(!nonResident){
			return res.status(404).json({
				sucess  : false,
				message : 'The  non resident person you are looking for does not exist.'
			});
		}

	    res.status(200).json({
		    success : true, 
		    message : 'Successfully deleted a  non resident person details'	    	
	    });
	});
};