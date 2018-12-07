'use strict';

var SSE = require('express-sse');
var sse = new SSE();

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    NodeSchema = mongoose.model('Node'),
    ImageSchema = mongoose.model('Image');

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

exports.set_image = function(req, res) {
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

        if (!req.file) return res.status(400).json("bad image").end();

        let image = new ImageSchema({file: req.file});
        image.save();
        user.image = req.file.filename;
        user.save(function (err, user) {
            /**
            * TODO: handle errors better and respond with something that makes sense
            */
            if (err) return res.json(err);
            res.setHeader('Content-Type', image.file.mimetype);
            res.sendFile('./uploads/' + user.image, {root: process.cwd()});
        });
    });
}

exports.get_image = function(req, res) {
    ImageSchema.findOne({"file.filename": req.params.filename})
    .exec(function(err, image) {
        if (err) return res.json(err);
        if (!image) return res.status(404).end();

        res.setHeader('Content-Type', image.file.mimetype);
        res.sendFile('./uploads/' + image.file.filename, {root: process.cwd()});
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

        User.findById(req.body.newowner).exec(function (err, user) {
            if (err) return res.json(err);
            if (!user) return res.status(404).end();
            sse.send(node, 'capture');
            node.capture(req.body.newowner);
            res.json(user.colors);
        });
    });
};
