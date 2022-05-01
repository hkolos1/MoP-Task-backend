const mongoose = require('mongoose');

const { Schema } = mongoose;

const replySchema = new Schema({
    userID: {
        type: String,
        required: true,
        trim: true,
    },
    questionID: {
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
        required: false
    }
});

const Reply = mongoose.model('Reply', replySchema);

module.exports = Reply;
