'use strict';

var SSE = require('express-sse');
var sse = new SSE();

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    NodeSchema = mongoose.model('Node');

exports.create_user = function(req, res) {
    let user = new User({username: req.body.username,
                         googleId: req.googleId});
    user.save(function (err, user) {
        if (err) {
            /**
             * TODO: handle errors better and respond with something that makes sense
             */
            console.error(err);
            return res.json(err);
        }
        res.json({user: user.getProfile(), token: user.generateToken()});
    });
};

exports.get_user = function(req, res) {
    let query = User.findById(req.params.userId);

    query.exec(function (err, user) {
        /**
         * TODO: handle errors better and respond with something that makes sense
         */
        if (err) return res.json(err);
        if (!user) return res.status(404).end();
        res.json(user.getProfile());
    });
};

exports.login = function(req, res) {
    let query = User.findOne({googleId: req.googleId});

    query.exec(function (err, user) {
        if (err) throw err;
        if (!user) return res.status(401).json("Authentication failed, User not found.").end();

        return res.json({user: user.getProfile(), token: user.generateToken()});
    })
}

exports.set_colors = function(req, res) {
    if (req.user._id !== req.params.userId) {
        return res.status(401).json("Not authorized.").end();
    }
    let query = User.findById(req.params.userId);
    query.exec(function (err, user) {
        /**
         * TODO: handle errors better and respond with something that makes sense
         */
        if (err) return res.json(err);
        if (!user) return res.status(404).end();

        user.colors = req.body.colors;
        user.save(function (err, user) {
            /**
            * TODO: handle errors better and respond with something that makes sense
            */
            if (err) return res.json(err);
            res.json(user.colors);
        });
    });
}

exports.get_user_colors = function(req, res) {
    let query = User.findById(req.params.userId);
    query.exec(function (err, user) {
        /**
         * TODO: handle errors better and respond with something that makes sense
         */
        if (err) return res.json(err);
        if (!user) return res.status(404).end();
        res.json(user.colors);
    });
}

exports.create_node = function(req, res) {
    let node = new NodeSchema({name: req.body.name,
        coordinates: req.body.coordinates});

    node.save(function (err, node) {
        if (err) {
            /**
             * TODO: handle errors better and respond with something that makes sense
             */
            console.error(err);
            return res.json(err);
        }
        res.json(node);
    });
};

exports.get_nodes = function(req, res) {
    let query = NodeSchema.find();

    query.exec(function (err, nodes) {
        /**
         * TODO: handle errors better and respond with something that makes sense
         */
        if (err) return res.json(err);
        if (!nodes) return res.status(404).end();
        res.json(nodes);
    });
}

exports.stream_events = function(req, res) {
    console.log("asf");
    sse.init(req, res);
};

exports.test_event = function(req, res) {
    let content = {
        text: "hello there",
        markers: [{x: 3.14, y: 1.23},{x: 5.11, y: 2.23}]
    }
    sse.send(content, 'testevent');
    res.json("ty");
};

exports.test_capture = function(req, res) {
    NodeSchema.findByIdAndUpdate(req.body.nodeId,
                                { $set: { owner: req.body.newowner,
                                          captured_at: new Date() }},{ new: true })
    .populate({ path: 'owner', select: '-salt -hash -admin -updatedAt'})
    .exec(function (err, node) {
        /**
         * TODO: handle errors better and respond with something that makes sense
         */
        if (err) return res.json(err);
        if (!node) return res.status(404).end();

        sse.send({node, newowner: req.body.newowner}, 'capture');

        //node.capture(req.body.newowner);
        //node.name = "intefetnode";
        //node.save();
        res.json(node);
    });
};
