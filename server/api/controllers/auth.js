'use strict';

const jwt = require('jsonwebtoken');

exports.loginRequired = function(req, res, next) {
    if (req.user) {
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorized user!' });
    }
};

exports.validateToken = function(req, res, next) {
    if (req && req.token) {
        jwt.verify(req.token, process.env.JWT_SECRET, function(err, decode) {
            if (!err) req.user = decode;
        });
    }
    next();
}

exports.adminRequired = function(req, res, next) {
    if (req.user.admin) {
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorized user, admin required' });
    }
}
