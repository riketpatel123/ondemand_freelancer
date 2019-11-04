const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserProfileSchema = new Schema({
        user_id: {
            type: Schema.Types.ObjectId,
            ref: 'users',
            required: true
        },
        full_name:{
            type: String,
            required: true
        },
        profile_photo: {
            type: String,
            // data: Buffer, 
            // contentType: String
        },
        work_title: {
            type: String,
            required: true
        },
        description: {
            type: String
        },
        work_catagorie: {
            type: String
        },
        email: {
            type: String
        },
        contact_number: {
            type: Number
        },
        websites:{
            type: String
        }
});

module.exports = mongoose.model("UserProfile", UserProfileSchema);