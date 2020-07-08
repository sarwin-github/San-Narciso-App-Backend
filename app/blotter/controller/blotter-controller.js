const mongoose  = require('mongoose');
const Blotter = require('../model/blotter');
const async     = require('async');

/**
	@swagger
	/blotter/list:
		get:
			tags:
				- "blotter"
			description: "get all blotters"
			responses:
				"200":
					description: "return list of blotters"
*/
module.exports.getBlotters = (req, res) => {
	let query = Blotter.find({}).select({'__v': 0});

	query.exec((err, blotters) => {
		if(err){
			return res.status(500).json({ 
				success  : false, 
				error   : err, 
				message : 'Server error.'
			});
		} if(!blotters){
			return res.status(404).json({
				success  : false,
				message : 'A list of blotters does not exist.'
			});
		}

		res.status(200).json({
			success   : true, 
			message   : 'Successfully fetched the list of blotters.',
			blotters : blotters,
		});
	});
}

/**
	@swagger
	/blotter/create:
		post:
			tags:
				- "blotter"
			description: "add new blotter"
			responses:
				"200":
					description: "Successfully created a new blotter"
*/
module.exports.addNewBlotter = (req, res) => {
	let blotter = new Blotter();

	blotter.date_of_filing      = req.body.date_of_filing;
	blotter.case_number         = req.body.case_number;
	blotter.description         = req.body.description;
	blotter.complainant         = req.body.complainant;
	blotter.complained_resident = req.body.complained_resident;
	blotter.officer_in_charge   = req.body.officer_in_charge;
	
	blotter.save((err) => {
		if(err){
		    return res.status(500).json({success: false, error: err, message: 'Something went wrong with the server.'});
		}

	    res.status(200).json({
		    success : true, 
		    message : 'Successfully created a new blotter'	    	
	    });
	});
}


/**
	@swagger
	/blotter/details/{blotterID}:
		get:
			tags:
				- "blotter"
			description: "add new blotter"
			parameters:
        		- name: "blotterID"
          		description: "blotter id"
          		in: "path"
          		type: "string"
          		required: true
			responses:
				"200":
					description: "Successfully fetched blotter details"
*/
module.exports.getBlotterDetails = (req, res) => {
	let query = Blotter.findById({ _id: req.params.id }).select({'__v': 0});

	query.exec((err, blotter) => {
		if(err){
			return res.status(500).json({ 
				success  : false, 
				error   : err, 
				message : 'Server error.'
			});
		} if(!blotter){
			return res.status(404).json({
				success  : false,
				message : 'The blotter you are looking for does not exist.'
			});
		}

		res.status(200).json({
			success  : true, 
			message  : 'Successfully fetched the blotter detail for edit',
			blotter : blotter
		});
	});
};


/**
	@swagger
	/blotter/update/{blotterID}:
		put:
			tags:
				- "blotter"
			description: "update blotter details"
			parameters:
        		- name: "blotterID"
          		description: "blotter id"
          		in: "path"
          		type: "string"
          		required: true
			responses:
				"200":
					description: "Successfully updated blotter details"
*/
module.exports.updateBlotterDetail = (req, res) => {
	async.waterfall([
		// find blotter by id
	    (callback) => {
	      	let query = Blotter.findById({ _id: req.params.id }).select({'__v': 0});

  	      	query.exec((err, blotter) => {
  		        if(!blotter){
        			return res.status(404).json({
        				success  : false,
        				message : 'The blotter you are looking for does not exist.'
        			});
        		}

  		        callback(err, blotter);
  	      	});
	    }, 
	    // update blotter
	    (blotter, callback) => {
	    	blotter.date_of_filing      = req.body.date_of_filing;
	    	blotter.case_number         = req.body.case_number;
	    	blotter.description         = req.body.description;
	    	blotter.complainant         = req.body.complainant;
	    	blotter.complained_resident = req.body.complained_resident;
	    	blotter.officer_in_charge   = req.body.officer_in_charge;

	    	blotter.save(err => {
	    		callback(err, blotter);
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
			    message : 'Successfully updated blotter details'	    	
		    });
	});
};


/**
	@swagger
	/blotter/delete/{blotterID}:
		delete:
			tags:
				- "blotter"
			description: "delete blotter details"
			parameters:
        		- name: "blotterID"
          		description: "blotter id"
          		in: "path"
          		type: "string"
          		required: true
			responses:
				"200":
					description: "Successfully deleted a blotter details"
*/
module.exports.deleteBlotter = (req, res) => {
	let query = Blotter.findOneAndRemove({ _id: req.params.id });

	query.exec((err, blotter) => {
		if(err){
			return res.status(500).json({ 
				sucess  : false, 
				error   : err, 
				message : 'Server error.'
			});
		} if(!blotter){
			return res.status(404).json({
				sucess  : false,
				message : 'The blotter you are looking for does not exist.'
			});
		}

	    res.status(200).json({
		    success : true, 
		    message : 'Successfully deleted a blotter details'	    	
	    });
	});
};