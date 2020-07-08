const express = require('express');
const router  = express();

const blotterController = require('../controller/blotter-controller');

router.route('/list').get(blotterController.getBlotters);
router.route('/create').post(blotterController.addNewBlotter);
router.route('/update/:id').put(blotterController.updateBlotterDetail);
router.route('/details/:id').get(blotterController.getBlotterDetails);
router.route('/delete/:id').delete(blotterController.deleteBlotter);

module.exports = router;