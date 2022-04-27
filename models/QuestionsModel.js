const mongoose = require('mongoose');

const { Schema } = mongoose;

const questionSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    text: {
        type: String,
        required: true,
        trim: true,
    },
    date: {
        type: Date,
        trim: true,
        required: true,
    },
    like: {
        type: Number,
    },
    dislike: {
        type: Number,
    }
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
