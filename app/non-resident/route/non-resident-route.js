const express = require('express');
const router  = express();

const nonResidentController = require('../controller/non-resident-controller');

router.route('/list').get(nonResidentController.getNonResidents);
router.route('/create').post(nonResidentController.addNewNonResident);
router.route('/update/:id').put(nonResidentController.updateNonResidentDetail);
router.route('/details/:id').get(nonResidentController.getNonResidentDetails);
router.route('/delete/:id').delete(nonResidentController.deleteNonResident);

module.exports = router;