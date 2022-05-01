const mongoose = require('mongoose');

const { Schema } = mongoose;

const dislikeSchema = new Schema({
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
});

const Dislike = mongoose.model('Dislike', dislikeSchema);

module.exports = Dislike;
