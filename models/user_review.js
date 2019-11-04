const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserReviewSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    reviewer_id: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    rating: {
        type: Number,
        required: [true, "Please Rate the user"]
    }, 
    comment: {
        type: String,
        required: [true, "Comment are required!"]
    }
});

module.exports = mongoose.model("UserReview", UserReviewSchema);