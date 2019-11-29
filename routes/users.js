var express = require('express');
var router = express.Router();
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
require('dotenv').config();

/** variable for secret key for jwt token */
const keys = process.env.secretKey;

/**import validation class for login and register */
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
var user_controller = require('../controllers/userController');

const User = require('../models/user');
/** POST router to handle registration of new user */
router.post("/register", (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);
    // return error to request
    if (!isValid) {
        console.log("ERROR: ", errors);
        return res.status(400).json(errors);
    }
    // find user by email address to check if user already exist
    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({ email: "Email Already Registered" });
        } else {
            // new user object 
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                user_type: req.body.user_type,
                squestion: req.body.squestion,
                sanswer: req.body.sanswer
            });
            // Password hashing before saveing to database uisng bcrypt library
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(newUserData => {
                            console.log("INFO:", newUserData);
                            res.json(newUserData);
                        })
                        .catch(err => console.log(err)
                        );
                });
            });
        }
    });
});
/**POST route to handle login request */
router.post("/login", (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
        console.log("ERROR: ", errors);
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;
    // Find user by email
    User.findOne({ email }).then(user => {
        // Check if user exists
        if (!user) {
            return res.status(404).json({ emailnotfound: "Email not found" });
        }
        // Check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // User matched
                // Create JWT Payload
                const payload = {
                    id: user.id,
                    username: user.username,
                    user_type: user.user_type
                };
                // Sign token
                jwt.sign(
                    payload,
                    keys,
                    {
                        expiresIn: 3600
                    },
                    (err, token) => {
                        res.json({
                            userId: payload.id,
                            user: payload.username,
                            success: true,
                            token: "Bearer " + token
                        });
                    }
                );
                console.log("[backend] INFO:", email, "> User Signed into System ");
            } else {
                return res
                    .status(400)
                    .json({ passwordincorrect: "Password incorrect" });
            }
        });
    });
});

/** POST router to handle forgot password request */
router.post("/forgotpassword/:email", (req, res) => {
    // find the user by email
    User.findOne({ email: req.params.email }).then(user => {
        // return 404 if email not found
        if (!user) {
            return res.status(404).json({ email: "Email Not Found" });
        } else {
            // Password hashing before saveing to database uisng bcrypt library
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(req.body.password, salt, (err, hash) => {
                    if (err) throw err;
                    user.password = hash;
                    user.save()
                        .then(newUserData => {
                            console.log("INFO: Password Reset", newUserData);
                            // return response to font end
                            res.send("Password reset sucessfully");
                        })
                        .catch(err => console.log(err)
                        );
                });
            });
        }
    });
});

/** Create new user profile */
router.post('/userprofile/:user_id', user_controller.create_user_profile);

/** Get User Profile */
router.get('/userprofile/:user_id', user_controller.view_user_profile);

/** Get User Review and Comment */
router.get('/userprofile/review/:user_id', user_controller.view_user_reviews_and_comments);

/** Create new Reviews of user */
router.post('/feedback/review', user_controller.create_new_review);

/**Forgot Password security question */
router.get('/forgotpassword/:email', user_controller.forgot_password_squestion);

module.exports = router;
