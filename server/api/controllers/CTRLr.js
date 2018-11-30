'use strict';

var SSE = require('express-sse');
var sse = new SSE();

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    NodeSchema = mongoose.model('Node');

exports.create_user = function(req, res) {
    console.log(req.body);
    let user = new User({username: req.body.username,
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
    let query = User.findById(req.params.userId).select({ "username": 1, "_id": 0});

    query.exec(function (err, user) {
        /**
         * TODO: handle errors better and respond with something that makes sense
         */
        if (err) return res.json(err);
        if (!user) return res.status(404).end();
        res.json(user);
    });
};

exports.login = function(req, res) {
    let query = User.findOne({email: req.body.email});

    query.exec(function (err, user) {
        if (err) throw err;
        if (!user) return res.status(401).json("Authentication failed, User not found.").end();
        if (!user.validPassword(req.body.password)) {
            return res.status(401).json("Authentication failed, wrong password.").end();
        }
        return res.json({token: user.generateToken()});
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
            res.json(user);
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
    console.log(req.body);
    let node = new NodeSchema({name: req.body.name,
        coordinates: req.body.coordinates});
    console.log(node);
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
    let node = {id: 1, owner: 123};
    let newowner = 222;
    sse.send({node, newowner}, 'capture');
    res.json(newowner);
};
