const mongoose  = require('mongoose');
const Household  = require('../model/household');
const async     = require('async');

/**
	@swagger
	/household/list:
		get:
			tags:
				- "household"
			description: "get all households"
			responses:
				"200":
					description: "return list of households"
*/
module.exports.getHouseholds = (req, res) => {
	let query = Household.find({}).select({'__v': 0});

	query.exec((err, households) => {
		if(err){
			return res.status(500).json({ 
				success  : false, 
				error   : err, 
				message : 'Server error.'
			});
		} if(!households){
			return res.status(404).json({
				success  : false,
				message : 'A list of households does not exist.'
			});
		}

		res.status(200).json({
			success   : true, 
			message   : 'Successfully fetched the list of households.',
			households : households,
		});
	});
}

/**
	@swagger
	/household/create:
		post:
			tags:
				- "household"
			description: "add new household"
			responses:
				"200":
					description: "Successfully created a new household"
*/
module.exports.addNewHousehold = (req, res) => {
	let household = new Household();

	household.household_head   = req.body.household_head;
	household.household_name   = req.body.household_name;
	household.household_number = req.body.household_number;
	household.street       = req.body.street;
	household.barangay     = req.body.barangay;
	household.city         = req.body.city;
	household.province     = req.body.province;

	household_inhabitants  = [...req.body.household_inhabitants]
	
	household.save((err) => {
		if(err){
		    return res.status(500).json({success: false, error: err, message: 'Something went wrong with the server.'});
		}

	    res.status(200).json({
		    success : true, 
		    message : 'Successfully created a new household'	    	
	    });
	});
}


/**
	@swagger
	/household/details/{householdID}:
		get:
			tags:
				- "household"
			description: "add new household"
			parameters:
        		- name: "householdID"
          		description: "household id"
          		in: "path"
          		type: "string"
          		required: true
			responses:
				"200":
					description: "Successfully fetched household details"
*/
module.exports.getHouseholdDetails = (req, res) => {
	let query = Household.findById({ _id: req.params.id }).select({'__v': 0});

	query.exec((err, household) => {
		if(err){
			return res.status(500).json({ 
				success  : false, 
				error   : err, 
				message : 'Server error.'
			});
		} if(!household){
			return res.status(404).json({
				success  : false,
				message : 'The household you are looking for does not exist.'
			});
		}

		res.status(200).json({
			success  : true, 
			message  : 'Successfully fetched the household detail for edit',
			household : household
		});
	});
};


/**
	@swagger
	/household/update/{householdID}:
		put:
			tags:
				- "household"
			description: "update household details"
			parameters:
        		- name: "householdID"
          		description: "household id"
          		in: "path"
          		type: "string"
          		required: true
			responses:
				"200":
					description: "Successfully updated household details"
*/
module.exports.updateHouseholdDetail = (req, res) => {
	async.waterfall([
		// find household by id
	    (callback) => {
	      	let query = Household.findById({ _id: req.params.id }).select({'__v': 0});

  	      	query.exec((err, household) => {
  		        if(!household){
        			return res.status(404).json({
        				success  : false,
        				message : 'The household you are looking for does not exist.'
        			});
        		}

  		        callback(err, household);
  	      	});
	    }, 
	    // update household
	    (household, callback) => {
	    	household.household_head   = req.body.household_head;
	    	household.household_name   = req.body.household_name;
	    	household.household_number = req.body.household_number;
	    	household.street       = req.body.street;
	    	household.barangay     = req.body.barangay;
	    	household.city         = req.body.city;
	    	household.province     = req.body.province;

	    	household.save(err => {
	    		callback(err, household);
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
			    message : 'Successfully updated household details'	    	
		    });
	});
};


/**
	@swagger
	/household/delete/{householdID}:
		delete:
			tags:
				- "household"
			description: "delete household details"
			parameters:
        		- name: "householdID"
          		description: "household id"
          		in: "path"
          		type: "string"
          		required: true
			responses:
				"200":
					description: "Successfully deleted a household details"
*/
module.exports.deleteHousehold = (req, res) => {
	let query = Household.findOneAndRemove({ _id: req.params.id });

	query.exec((err, household) => {
		if(err){
			return res.status(500).json({ 
				sucess  : false, 
				error   : err, 
				message : 'Server error.'
			});
		} if(!household){
			return res.status(404).json({
				sucess  : false,
				message : 'The household you are looking for does not exist.'
			});
		}

	    res.status(200).json({
		    success : true, 
		    message : 'Successfully deleted a household details'	    	
	    });
	});
};