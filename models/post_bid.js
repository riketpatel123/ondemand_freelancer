const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostBidSchema = new Schema({
    post_id: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    bid_amount: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("PostBid", PostBidSchema);
