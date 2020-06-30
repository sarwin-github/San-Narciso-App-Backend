const express = require('express');
const router  = express();

const householdController = require('../controller/household-controller');

router.route('/list').get(householdController.getHouseholds);
router.route('/create').post(householdController.addNewHousehold);
router.route('/update/:id').put(householdController.updateHouseholdDetail);
router.route('/details/:id').get(householdController.getHouseholdDetails);
router.route('/delete/:id').delete(householdController.deleteHousehold);

module.exports = router;