const session    = require('express-session');
const mongoose   = require('mongoose');
const mongoStore = require('connect-mongo')(session);

// Local connection
let mongoConnectionLocal = {	
	'url': `mongodb://127.0.0.1:27017/my-database`
};

// Development database from mongolab
let mongoConnectionOnline = {
	'url': `mongodb+srv://${process.env.MLabDBUser}:${process.env.MLabDBPassword}@san-narciso-app.usjju.mongodb.net/sanNarciso?retryWrites=true&w=majority`
};
//'url': `mongodb://${process.env.MLabDBUser}:${process.env.MLabDBPassword}@${process.env.MLabDB}`
	
// mongodb+srv://${process.env.MongoDBLocalUser}:{process.env.MongoDBLocalPassword}@san-narciso-app-db.usjju.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Session storage and database configuration 
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
module.exports.pickEnv = (env, app) => {
	mongoose.Promise = global.Promise;
	switch (env) {
	    case 'dev':
	    	let options = {
				useNewUrlParser: true,
				useUnifiedTopology: true
			}

	    	app.set('port', process.env.PORT || 6060);

	        mongoose.connect(mongoConnectionOnline.url, options, err => { 
				if(err) { 
					console.log(err); 
				}
			}); 

	    break;

		case 'local':
			let local_options = {
				auth: { authdb: 'admin'},
				user: process.env.MongoDBLocalUser,
				pass: process.env.MongoDBLocalPassword,
				useMongoClient: true
			}

	    	app.set('port', process.env.PORT || 5050);
	        mongoose.connect(mongoConnectionLocal.url, local_options,   
	        	err => { if(err) { console.log(err); }});

		break;
	};

	// Set session and cookie max life, store session in mongo database
	app.use(session({
		secret : process.env.sessionKey,    
		httpOnly: true,
		resave : true,
	  	saveUninitialized: false, 
		store  : new mongoStore({ mongooseConnection: mongoose.connection }),
		cookie : { maxAge: 60 * 60 * 1000 }
	}));
};

