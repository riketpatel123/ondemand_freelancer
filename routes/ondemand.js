var express = require('express');
var router = express.Router();

var ondemand_controller = require('../controllers/ondemandController');

/** Create OnDemand request */ 
router.post('/ondemand/create',ondemand_controller.create_new_ondemand_request);

/** Get all ondemand request listing */
router.get('/ondemand/',ondemand_controller.get_all_ondemand_request);

/** GET ondemand request listing by user_id. */
router.post('/ondemand/user_list/',ondemand_controller.get_all_ondemand_request_by_user_id);

/** Get single ondemand request created by user */
router.get('/ondemand/user_list/review/:id',ondemand_controller.review_ondemand_request_details);

/** Delete ondemand request by id */
router.get('/ondemand/user_list/delete/:id',ondemand_controller.delete_ondemand_request);

/** Updata ondemand request confirm freelancer. */
router.post('/ondemand/confirm/:id',ondemand_controller.update_ondemand_request);

module.exports = router;
