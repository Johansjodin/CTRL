'use strict';

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

require('dotenv').config();

var UserSchema = new mongoose.Schema({
    username: {type: String,
               lowercase: true,
               unique: true,
               required: [true, "can't be blank"],
               match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
               index: true},
/*  email: {type: String,
        lowercase: true,
        unique: true,
        required: [true, "can't be blank"],
        match: [/\S+@\S+\.\S+/, 'is invalid'],
        index: true}, */
    bio: String,
    image: String,
/*  hash: String,
    salt: String, */
    colors: {
        type: [{ type: String, validate: [validateColor, 'not a valid color'] }],
        validate: [arrayLimit, '{PATH} exceeds the limit of 10']
    },
    admin: { type: Boolean, default: false },
    googleId: {type: String, unique: true, required: [true, "google id required"]}
}, {timestamps: true});

UserSchema.plugin(uniqueValidator, {message: 'is already taken.'});

/* UserSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.validPassword = function(password) {
    let hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
}; */

UserSchema.methods.generateToken = function() {
    return jwt.sign({ username: this.username,
                      email: this.email,
                      _id: this._id,
                      admin: this.admin},
                    process.env.JWT_SECRET,
                    { expiresIn: '24h' });
};

UserSchema.methods.getProfile = function() {
    return {
        id: this._id,
        username: this.username,
        email: this.email,
        bio: this.bio,
        image: this.image,
        colors: this.colors,
        createdAt: this.createdAt
    }
}

function validateColor(color) {
    return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color);
}

function arrayLimit(val) {
    return val.length <= 5;
}

mongoose.model('User', UserSchema);
