var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;


var PostSchema = new Schema({
    post_title:{type: String, required: true},
    post_description:{type: String, required: true},
    post_catagories:{type: String, required: true},
    post_budget:{type: String, required: true},
    address:{type: String, required: true},
    city:{type: String, required: true},
    postal_code:{type: String, required: true},
    province:{type: String, required: true},
    country:{type: String, required: true},
    post_date:{type: Date, default: Date.now}
});

PostSchema.virtual('full_address')
.get(function(){
    return this.address + ','
     + this.city + ','
      + this.province + ','
       + this.country + ','
        + this.postal_code;
});

PostSchema.virtual('post_date_formatted')
.get(function () {
  return moment(this.due_back).format('MMMM Do, YYYY');
});

module.exports = mongoose.model('Post',PostSchema);
