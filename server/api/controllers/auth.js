'use strict';

const jwt = require('jsonwebtoken');
const {OAuth2Client} = require('google-auth-library');

require('dotenv').config();

exports.loginRequired = function(req, res, next) {
    if (req.user) {
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorized user, login required' });
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
    if (req.user && req.user.admin) {
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorized user, admin required' });
    }
}

exports.googleAuth = async function (req, res, next) {
    const client = new OAuth2Client(process.env.GOOGLE_ANDROID_CLIENT_ID);
    let ticket;
    try {
        ticket = await client.verifyIdToken({
            idToken: req.token,
            audience: [process.env.GOOGLE_ANDROID_CLIENT_ID,
                       process.env.GOOGLE_IOS_CLIENT_ID],  // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        });
    } catch (err){
        console.log(err);
        return res.status(401).json({ message: 'Unauthorized user, missing token' });
    }
    const payload = ticket.getPayload();
    const userId = payload['sub'];
    if (!userId) { return res.status(401).json({ message: 'Unauthorized user, missing token' }); }
    req.googleId = userId;
    next();
    // If request specified a G Suite domain:
    //const domain = payload['hd'];

}