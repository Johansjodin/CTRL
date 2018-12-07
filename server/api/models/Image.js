'use strict';

const mongoose = require('mongoose');

var ImageSchema = new mongoose.Schema({
    file: Object
});

mongoose.model('Image', ImageSchema);
