var express = require('express');
var router = express.Router();

var post_controller = require('../controllers/postController');

/** Browse all job posting*/
router.get('/',post_controller.browse_all_post);

/** GET post listing. */
router.post('/view',post_controller.post_list);

/** POST request for creating Book. */
router.post('/create', post_controller.job_post_create_post);

/** Update post Data */
router.post('/update/:id', post_controller.job_post_update_post);

/** Delete Post by id */ 
router.get('/delete/:id', post_controller.job_post_delete_post);

/** Get single post by post_id */ 
router.get('/detail/:id', post_controller.post_detail);

/** User bid on the post*/ 
router.post('/detail/:id/bid',post_controller.submit_user_bid);

/** Get all bid on the post  */
router.get('/detail/bid/:post_id',post_controller.get_all_post_bid);

/** Confirm Request of freelancer on work post*/
router.post('/confirm/:id',post_controller.work_post_confirm);

module.exports = router;
