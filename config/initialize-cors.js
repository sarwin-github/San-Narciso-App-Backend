
module.exports.initializeCORS = (app) => {
	app.all('*' , (req, res, next) => {
		var origin = req.get('origin'); 

		res.header("Access-Control-Allow-Origin", origin);
		res.header("Access-Control-Allow-Credentials", true);
		res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
		res.header("Access-Control-Allow-Headers", 'Origin, X-Requested-With, Content-Type, Accept, Authorization, content-type, application/json' 
					+ ', '+ 'X-XSRF-TOKEN, CSRF-Token, X-CSRF-Token');
		next();
	});
}