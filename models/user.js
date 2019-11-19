const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    user_type: {
        type: String,
        required: true,
        enum: ['Admin', 'Freelancer', 'Employer'],
        default: 'Freelancer'
    }
});

module.exports = mongoose.model("users", UserSchema);
