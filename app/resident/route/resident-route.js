const express = require('express');
const router  = express();

const residentController = require('../controller/resident-controller');

router.route('/list').get(residentController.getResidents);
router.route('/create').post(residentController.addNewResident);
router.route('/update/:id').put(residentController.updateResidentDetail);
router.route('/details/:id').get(residentController.getResidentDetails);
router.route('/delete/:id').delete(residentController.deleteResident);

module.exports = router;