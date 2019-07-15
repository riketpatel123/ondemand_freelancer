var Post = require('../models/post');

var async = require('async');

exports.post_list = function(req,res,next){
    Post.find(function(err,post_list){
        if(err){
            console.log(err);
        }else {
            res.status(200).json(post_list);
        }
    });
};
exports.job_post_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Book create GET');
};

// Handle book create on POST.
exports.job_post_create_post = function(req, res) {
    var post = new Post(req.body);
    post.save()
    .then(post => {
        res.status(201).json({ message: 'Post in added successfully'});
    })
    .catch(err => {
        console.log(err);
        res.status(400).send('Insert New Post Failed');
    });
};

exports.post_detail = function(req, res, next){
    var id = req.params.id;
    Post.findById(id, function(err,single_post_detail){
        if (err) { return next(err); }
        if(!single_post_detail){
            res.status(404).send("Record Not Found");
        }
        res.status(200).json(single_post_detail);
    });
};

exports.job_post_update_post = function (req, res) {
    Post.findById(req.params.id, function(err, post_data) {
        if (!post_data){
            res.status(404).send("Record Not Found!");
        } else {
            post_data.post_title = req.body.post_title;
            post_data.post_description = req.body.post_description;
            post_data.post_catagories = req.body.post_catagories;
            post_data.post_budget = req.body.post_budget;
            post_data.address = req.body.address;
            post_data.city = req.body.city;
            post_data.postal_code = req.body.postal_code;
            post_data.province = req.body.province;
            post_data.country = req.body.country;

            post_data.save().then(post_data => {
                res.status(201).send(res.redirect("/post/"));
            })
            .catch(err => {
                console.error('Update Error:', err);
                res.status(400).send("Unable to update the database");
            });
        }
    });
};

exports.job_post_delete_post = function (req, res, next) {
    Post.findByIdAndRemove({_id: req.params.id}, function(err, post){
        if(err){
            res.status(400).send("Bad Input Paramater", err);
            return next(err);
        }
        if(!post){
            res.status(404).send("Record Not Found");
        }else {
            res.status(200).send(res.redirect("/post/"));
        }
    });
};
