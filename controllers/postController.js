var Post = require('../models/post');
var PostBid = require('../models/post_bid');
const isEmpty = require("is-empty");

var async = require('async');

exports.browse_all_post = function (req, res, next) {
    Post.find(function (err, post_list) {
        if (err) {
            console.log("[backend] ERROR: ".err);
            return next(err);
        } else {
            res.status(200).json(post_list);
        }
    });
};
/** Get all job post by user id */
exports.post_list = function (req, res, next) {
    const current_user = req.body.user_id;
    Post.find({ user_id: current_user }, function (err, post_list) {
        if (err) {
            res.status(400).send('Failed to load Post');
        } else {
            res.status(200).json(post_list);
        }
    });
};
// Handle book create on POST.
exports.job_post_create_post = function (req, res) {
    var post = new Post(req.body);
    post.save()
        .then(post => {
            console.log("[backend] INFO: New Post: ",post);
            res.status(201).json({ message: 'Post in   added successfully' });
        })
        .catch(error => {
            console.error("[backend] ERROR: ", error);
            res.status(400).send('Insert New Post Failed');
        });
};
/**Get single post detail */
exports.post_detail = function (req, res, next) {
    var id = req.params.id;
    Post.findById(id, function (err, single_post_detail) {
        if (err) { 
            console.error("[backend] ERROR: ",err);
            return next(err);
        }
        if (!single_post_detail) {
            console.log("[backend] INFO: Post Not Found",);
            res.status(404).send("Record Not Found");
        }
        res.status(200).json(single_post_detail);
    });
};
/**Update job post details */
exports.job_post_update_post = function (req, res) {
    Post.findById(req.params.id, function (err, post_data) {
        if (!post_data) {
            console.log("[backend] INFO: Post Not Found",);
            res.status(404).send("Record Not Found!");
        } else {
            post_data.user_id = req.body.user_id;
            post_data.post_title = req.body.post_title;
            post_data.post_description = req.body.post_description;
            post_data.post_catagories = req.body.post_catagories;
            post_data.post_budget = req.body.post_budget;
            post_data.address = req.body.address;
            post_data.city = req.body.city;
            post_data.postal_code = req.body.postal_code;
            post_data.province = req.body.province;
            post_data.country = req.body.country;
            post_data.save()
            .then(post_data => {
                console.log("[backend] INFO: Update Post: ",post_data);
                res.status(201).send({ message: 'Post in update successfully' });
            })
            .catch(err => {
                console.error('[backend] Update Error:', err);
                res.status(400).send("Unable to update the database");
            });
        }
    });
};
/**Delete the user post */
exports.job_post_delete_post = function (req, res, next) {
    Post.findOneAndDelete({ _id: req.params.id }, function (err, post) {
        if (err) {
            res.status(400).send("Bad Input Paramater", err);
            return next(err);
        }
        if (!post) {
            res.status(404).send("Record Not Found");
        } else {
            console.log("[backend] INFO: Post Deleted: ",post._id);
            res.status(200).send("Record Sucessfully Deleted");
        }
    });
};

/**Submit bid on user selected post */
exports.submit_user_bid = function (req, res) {
    PostBid.findOne({ username: req.body.username, post_id: req.params.id }).then(currentBid => {
        if (currentBid) {
            currentBid.post_id = req.params.id;
            currentBid.username = req.body.username;
            currentBid.bid_amount = req.body.bid_amount;
            currentBid.user_id = req.body.user_id;
            currentBid.save().then(currentBid => {
                console.log("INFO: Update bid=>", currentBid);
                res.status(200).send(currentBid);
            })
        } else {
            var post_bid = new PostBid({
                post_id: req.params.id,
                username: req.body.username,
                user_id: req.body.user_id,
                bid_amount: req.body.bid_amount
            });
            post_bid.save()
                .then(bid=> {
                console.log("[backend] INFO: New bid =>",bid);
                    res.status(201).json({ message: 'PostBid in added successfully' });
                })
                .catch(err => {
                    console.error("[backend] ERROR:",err);
                    res.status(400).send('Insert New Post Failed');
                });
        }
    });
};

/**Select all bids on the post*/
exports.get_all_post_bid = function (req, res) {
    var post_id = req.params.post_id;
    PostBid.find({ post_id: post_id }, function (err, post_bids) {
        if (err) { return next(err); }
        if (!post_bids) {
            res.status(404).send("Bids Not Found");
        }
        res.status(200).json(post_bids);
    });
}
