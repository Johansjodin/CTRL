'use strict';

var SSE = require('express-sse');
var sse = new SSE();

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    NodeSchema = mongoose.model('Node'),
    ImageSchema = mongoose.model('Image'),
    CaptureEvent = mongoose.model('CaptureEvent');

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
            updateNodes(user);
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
        res.sendFile('./uploads/' + image.file.filename, {root: process.cwd()}, (error) => {
            if (error) return res.status(400).json("no find image").end();
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

exports.get_nodes_owned_by_user = function(req, res) {
    NodeSchema.find({owner: req.params.userId})
    .exec(function(err, nodes) {
        if (err) return res.json(err);
        res.json(nodes);
    });
}

exports.get_capture_events_by_user = function (req, res) {
    CaptureEvent.find({ $or: [ {prevOwner: req.params.userId}, {newOwner: req.params.userId} ] })
    .exec(function(err, events) {
        if (err) return res.json(err);
        res.json(events);
    });
}

exports.get_capture_events_by_node = function (req, res) {
    CaptureEvent.find({node: req.params.nodeId})
    .exec(function(err, events) {
        if (err) return res.json(err);
        res.json(events);
    });
}

exports.stream_events = function(req, res) {
    console.log("asf");
    sse.init(req, res);
};

exports.test_event = function(req, res) {
    sse.send({colors: ["a","b","c"]}, 'colorchange');
    res.json("ty");
};

exports.test_capture = function(req, res) {
    let prevOwner;
    let timestamp = new Date();
    let points;
    let ce;
    NodeSchema.findById(req.body.nodeId)
    .exec(function (err, node) {
        if (err) return res.json(err);
        if (!node) return res.status(404).end();

        prevOwner = node.owner;
        points = node.getValue(node.secondsSinceCapture(timestamp));
        ce = new CaptureEvent({ node: req.body.nodeId,
                                    prevOwner: prevOwner,
                                    newOwner: req.body.newowner,
                                    captured_at: timestamp,
                                    points: points});
        ce.save(function (err, ce) {
            /**
            * TODO: handle errors better and respond with something that makes sense
            */
            if (err) return res.json(err);
        });
    });
    /**
     * for some reason save doesnt work so gotta do this
     */
    NodeSchema.findByIdAndUpdate(req.body.nodeId,
                                { $set: { owner: req.body.newowner,
                                          captured_at: timestamp }},{ new: true })
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
            sse.send(ce, 'capture');
            node.capture(req.body.newowner, timestamp);
            user.givePoints(points);
            user.save();
            res.json(user.colors);
        });
    });
};

function updateNodes(user) {
    NodeSchema.find({owner: user._id})
    .exec(function(err, nodes) {
        if (err) return res.json(err);
        for (let node of nodes) {
            sse.send({colors: user.colors}, 'colorchange'+node._id);
        }
    });
}
