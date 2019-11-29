var Ondemand = require('../models/ondemand_request');

/** POST request to create new ondemand request */
exports.create_new_ondemand_request = function (req, res) {
    var new_request = new Ondemand(req.body);
    new_request.save()
        .then(new_request_data => {
            console.log("[backend] INFO: New Ondemand Request _id: ", new_request_data._id);
            res.status(201).json({ message: 'New Request Submitted' })
        })
        .catch(error => {
            console.error("[backend] ERROR: ", error);
            res.status(400).send("Submitted Request Failed");
        });
};

/**GET request to select request by user_id */
exports.get_all_ondemand_request_by_user_id = function (req, res) {
    const current_user = req.body.user_id;
    Ondemand.find({ user_id: current_user }, function (err, request_list) {
        if (err) {
            console.error("[backend] ERROR: ".err);
            res.status(400).send('[backend] ERROR: Failed to load Post');
        } else {
            console.log("[backend] INFO: List Requested by user @",current_user);
            res.status(200).json(request_list);
        }
    });
};

/**GET: to select all ondemand request with request_status='Pending'*/
exports.get_all_ondemand_request = function (req, res, next) {
    Ondemand.find({ request_status:"Pending" },function (err, ondemand_list) {
        if (err) {
            console.error("[backend] ERROR: ".err);
            return next(err);
        } else {
            res.status(200).json(ondemand_list);
        }
    });
};

/**GET Request to select single ondemand request details by request_id */
exports.review_ondemand_request_details = function (req, res, next) {
    var request_id = req.params.id;
    Ondemand.findById(request_id, function (err, single_request_details) {
        if (err) {
            console.error("[backend] ERROR: ", err);
            return next(err);
        }
        if (!single_request_details) {
            console.log("[backend] INFO: Request Not Found");
            res.status(404).send("Record Not Found");
            return next();
        }
        res.status(200).json(single_request_details);
    });
};

/** GET Request: Delete ondemand request by request_id */
exports.delete_ondemand_request = function (req, res, next) {
    var request_id = req.params.id;
    Ondemand.findOneAndDelete({ _id: request_id}, function (err, request) {
        if (err) {
            res.status(400).send("Bad Input Paramater", err);
            return next(err);
        }
        if (!request) {
            res.status(404).send("Request Not Found");
        } else {
            console.log("[backend] INFO: Request Deleted: ",request._id);
            res.status(200).send("Request Sucessfully Deleted");
        }
    });
};

/** POST: To update Ondemand request for freelancer id confirmation */
exports.update_ondemand_request = function (req, res, next) {
    var request_id = req.params.id;
    Ondemand.findById(request_id, function (err, request_data) {
        if (!request_data) {
            console.log("[backend] INFO: Item Not Found",);
            res.status(404).send("Record Not Found!");
        } else {
            request_data.request_status = req.body.request_status;
            request_data.confirm_freelancer_id = req.body.confirm_freelancer_id;
            request_data.save()
            .then(request_data => {
                console.log("[backend] INFO: Update Request: ",request_data);
                res.status(201).json({ message: 'Request in update successfully' });
            })
            .catch(err => {
                console.error('[backend] Update Error:', err);
                res.status(400).send("Unable to update the database");
            });
        }
    });
};
