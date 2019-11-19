const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OndemandRequestSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    username: {
        type: String
    },
    request_catagorie: {
        type: String,
        required: true
    },
    request_date: {
        type: Date,
        default: Date.now
    },
    request_status: {
        type: String,
        required: true,
        enum: ['Pending', 'Confirmed', 'Canceled'],
        default: 'Pending'
    },
    confirm_freelancer_id: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    }
});

module.exports = mongoose.model("OndemandRequest", OndemandRequestSchema);
