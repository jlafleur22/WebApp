const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userInfoSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    age:{
        type: String,
        required: true
    },
    answer: {
        type: Boolean,
        required: true
    }
}, { timestamps: true }, {async: true});

const Information = mongoose.model('answer', userInfoSchema);//the first argument needs to be in the app.js
module.exports = Information;