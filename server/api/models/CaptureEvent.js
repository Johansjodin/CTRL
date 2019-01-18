'use strict';

const mongoose = require('mongoose');

var CaptureEventSchema = new mongoose.Schema({
    node: { type: mongoose.Schema.Types.ObjectId, ref: 'Node'},
    prevOwner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    newOwner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    captured_at: Date,
    points: Number
});

mongoose.model('CaptureEvent', CaptureEventSchema);
