//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Get Routes Source
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const HomeRoutes = require('../app/home/route/home-routes');
const UserRoutes = require('../app/user/route/user-routes');
const ResidentRoutes = require('../app/resident/route/resident-route');
const HouseholdRoutes = require('../app/household/route/household-route');
const BlotterRoutes = require('../app/blotter/route/blotter-route');
const NonResidentRoutes = require('../app/non-resident/route/non-resident-route');

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Set and Initialize Routes
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
module.exports.initializeRoutes = app => {
	/* Home routes */
	app.use('/api', HomeRoutes);

	/* User routes */
	app.use('/api/user', UserRoutes);

	/* Resident routes */
	app.use('/api/resident', ResidentRoutes);

	/* Household routes */
	app.use('/api/household', HouseholdRoutes);

	/* Blotter routes */
	app.use('/api/blotter', BlotterRoutes);

	/* Non Resident routes */
	app.use('/api/non-resident', NonResidentRoutes);
};
