const mongoose = require('mongoose');

const commentReplyLikeSchema = new mongoose.Schema({
    commentReplyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CommentReply",
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

module.exports = mongoose.model('CommentReplyLike', commentReplyLikeSchema);
