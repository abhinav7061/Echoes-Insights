const mongoose = require('mongoose');

const commentLikeSchema = new mongoose.Schema({
    commentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('CommentLike', commentLikeSchema);
