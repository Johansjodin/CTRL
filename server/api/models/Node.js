'use strict';

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

var NodeSchema = new mongoose.Schema({
    name: {type: String,
           lowercase: true,
           unique: true,
           match: [/^[a-zA-Z0-9]+$/, 'is invalid']},
    coordinates: {
        type: [Number],
        required: true},
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    captured_at: { type : Date, default: Date.now() }
});

NodeSchema.plugin(uniqueValidator, {message: 'is already taken.'});

NodeSchema.methods.secondsSinceCapture = function() {
    return parseInt((new Date() - this.captured_at)/1000);
}

NodeSchema.methods.getValue = function(time) {
    return time*2;
}

NodeSchema.methods.capture = function(userId, timestamp) {
    this.owner = userId;
    this.captured_at = timestamp;
}

mongoose.model('Node', NodeSchema);
