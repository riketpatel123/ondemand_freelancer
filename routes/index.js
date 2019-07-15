var express = require('express');
var router = express.Router();

var post_controller = require('../controllers/postController');

/* GET post listing. */
router.get('/',post_controller.post_list);

// Get request for creating a Book. Note: This must come before routes that display bookinstance
router.get('/create', post_controller.job_post_create_get);

// POST request for creating Book.
router.post('/create', post_controller.job_post_create_post);

// Get post my ID
router.get('/:id', post_controller.post_detail);

// Update post Data
router.post('/update/:id', post_controller.job_post_update_post);

//Delete Post by id
router.get('/delete/:id', post_controller.job_post_delete_post);

module.exports = router;
