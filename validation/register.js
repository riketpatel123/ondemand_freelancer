var Validator = require("validator");
var isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
    let errors = {};
    // Initialier the validater
    data.username = !isEmpty(data.username) ? data.username : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";
    data.user_type = !isEmpty(data.user_type) ? data.user_type : "";
    data.squestion = !isEmpty(data.squestion) ? data.squestion : "";
    data.sanswer = !isEmpty(data.sanswer) ? data.sanswer : "";

    //check the validation for username
    if (Validator.isEmpty(data.username)) {
        errors.username = "Username Field is required";
    }
    // check the validation for security question
    if (Validator.isEmpty(data.squestion)) {
        errors.squestion = "Security question Field is required";
    }

    // check the validation for security answer
    if (Validator.isEmpty(data.sanswer)) {
        errors.sanswer = "Security answer Field is required";
    }

    //check the validation for email
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }

    //check the validation for password
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }
    if (Validator.isEmpty(data.password2)) {
        errors.password2 = "Confirm password field is required";
    }
    //check password length 
    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = "Password must be at least 6 characters";
    }
    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = "Passwords must match";
    }
    return { errors, isValid: isEmpty(errors) };
};