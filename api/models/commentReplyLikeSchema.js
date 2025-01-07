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

const CommentReplyLike = mongoose.model('CommentReplyLike', commentReplyLikeSchema);
module.exports = CommentReplyLike;