const mongoose = require('mongoose');

const { Schema } = mongoose;

const likeSchema = new Schema({
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

const Like = mongoose.model('Like', likeSchema);

module.exports = Like;
