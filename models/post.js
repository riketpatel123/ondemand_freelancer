var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var PostSchema = new Schema({
    user_id: {type:Schema.Types.ObjectId, ref:'users', required: true},
    post_title:{type: String, required: true},
    post_description:{type: String, required: true},
    post_catagories:{type: String, required: true},
    post_budget:{type: String, required: true},
    address:{type: String, required: true},
    city:{type: String, required: true},
    postal_code:{type: String, required: true},
    province:{type: String, required: true},
    country:{type: String, required: true},
    post_date:{type: Date, default: Date.now},
    confirm_freelancer: {type: String, default: null}
});

PostSchema.virtual('post_date_formatted')
.get(function () {
  return moment(this.due_back).format('MMMM Do, YYYY');
});

module.exports = mongoose.model('Post',PostSchema);
