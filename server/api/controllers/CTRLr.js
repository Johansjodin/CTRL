'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User');

exports.create_user = function(req, res) {
    console.log(req.body);
    var user = new User({username: req.body.username,
                         email: req.body.email});
    user.setPassword(req.body.password);
    user.save(function (err, user) {
        if (err) {
            /**
             * TODO: handle errors better and respond with something that makes sense
             */
            console.error(err);
            return res.json(err);
        }
        res.json(user);
    });
};

exports.get_user = function(req, res) {
    var query = User.findById(req.params.userId).select({ "username": 1, "_id": 0});

    query.exec(function (err, user) {
        /**
         * TODO: handle errors better and respond with something that makes sense
         */
        if (err) return res.json(err);
        if (!user) return res.status(404).end();
        res.json(user);
    });
};
