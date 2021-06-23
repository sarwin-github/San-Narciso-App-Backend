
module.exports.initializeCORS = (app) => {
	app.use(function (req, res, next) {
		res.setHeader("Access-Control-Allow-Origin", "*");
		res.setHeader(
			"Access-Control-Allow-Methods",
			"GET, POST, OPTIONS, PUT, PATCH, DELETE"
		);

		res.setHeader(
			"Access-Control-Allow-Headers",
			"Origin, X-Requested-With, Content-Type, Accept, Authorization"
		);

		res.setHeader("Access-Control-Allow-Credentials", true);
		next();
	});
}