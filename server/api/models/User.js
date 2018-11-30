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
    email: {type: String,
            lowercase: true,
            unique: true,
            required: [true, "can't be blank"],
            match: [/\S+@\S+\.\S+/, 'is invalid'],
            index: true},
    bio: String,
    image: String,
    hash: String,
    salt: String
}, {timestamps: true});

UserSchema.plugin(uniqueValidator, {message: 'is already taken.'});

UserSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.validPassword = function(password) {
    let hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};

UserSchema.methods.generateToken = function() {
    return jwt.sign({ username: this.username, 
                      email: this.email,   
                      _id: this._id}, process.env.JWT_SECRET);
};
  
mongoose.model('User', UserSchema);