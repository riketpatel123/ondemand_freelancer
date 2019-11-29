var UserProfile = require('../models/user_profile');
var UserReviews = require('../models/user_review');
var User = require('../models/user');

const isEmpty = require("is-empty");
/** POST: Create new user profile of the user if not exist else update the profile */
exports.create_user_profile = function (req, res, next) {
    UserProfile.findOne({ user_id: req.params.user_id }, function (err, user_data) {
        if (!user_data) {
            console.log("[backend] INFO: User Profile Not Found"); 7
            var userProfile = new UserProfile(req.body);
            userProfile.save()
                .then(userProfile => {
                    console.log("[backend] INFO: UserProfile: ", userProfile);
                    res.status(201).send("Profile Create")
                })
                .catch(error => {
                    console.error("[backend] ERROR: ", error);
                    res.status(400).send('Failed to Create User Profile');
                });
        } else {
            user_data.user_id = req.body.user_id;
            user_data.full_name = req.body.full_name;
            user_data.profile_photo = req.body.profile_photo;
            user_data.work_title = req.body.work_title;
            user_data.description = req.body.description;
            user_data.work_catagorie = req.body.work_catagorie;
            user_data.email = req.body.email;
            user_data.contact_number = req.body.contact_number;
            user_data.websites = req.body.websites;
            user_data.save()
                .then(user_data => {
                    console.log("[backend] INFO: Updated User Profile: ", user_data);
                    res.status(201).send({ message: 'UserProfile in update successfully' });
                })
                .catch(err => {
                    console.error('[backend] Update Error:', err);
                    res.status(400).send("Unable to update the database");
                });
        }
    });
};
/** GET: Select the user profile by user_id */
exports.view_user_profile = function (req, res, next) {
    const user_id = req.params.user_id;
    UserProfile.findOne({ user_id: user_id }, function (err, user_data) {
        if (err) {
            res.status(400).send('Failed to load User Profile');
            return next(err);
        } else {
            console.log("[backend] INFO: user profile access by user>> ", user_id);
            res.status(200).json(user_data);
        }
    });
};
/** GET: Select the user views and comments */
exports.view_user_reviews_and_comments = function (req, res, next) {
    UserReviews.find({ user_id: req.params.user_id }, function (err, user_reviews) {
        if (err) {
            res.status(400).send('Failed to retrive user reviews');
            console.log("[backend] ERROR: In fetching user review ", err);
        } else if (isEmpty(user_reviews)) {
            res.status(200).send('No Reviews Found');
        } else {
            res.status(200).json(user_reviews);
        }
    });
};

/** POST: Create new review of user */
exports.create_new_review = function (req, res, next) {
    var user_review = new UserReviews(req.body);
    user_review.save()
        .then(review_response => {
            console.log("[backend] Info: Review:", review_response);
            res.status(201).send("New Review Posted Successfully");
        }).catch(error => {
            console.log("[backend] ERROR: ", error);
            res.status(400).send("Failed to create Review");
        });
};

/** GET: Verify User for security question */
exports.forgot_password_squestion = function (req, res, next) {
    User.findOne({ email: req.params.email }, function (err, userdata) {
        if (err) {
            res.status(400).send('Recovery email not found');
            console.log("[backend] ERROR: In fetching user data ", err);
            return next(err);
        } else {
            res.status(200).json(userdata);
        }
    });
};