const mongoose = require('mongoose');
const CommentReplyLike = require('./commentReplyLikeSchema');
const commentReplySchema = new mongoose.Schema({
    commentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
        required: true,
    },
    reply: {
        type: String,
        required: [true, "Reply is required"],
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    commentsCount: {
        type: Number,
        default: 0,
    },
    likesCount: {
        type: Number,
        default: 0,
    }
}, {
    timestamps: true
});

commentReplySchema.pre('remove', async function (next) {
    const commentReplyId = this._id;

    try {
        await CommentReplyLike.deleteMany({ commentReplyId });
        next();
    } catch (err) {
        next(err);
    }
});

const CommentReply = mongoose.model('CommentReply', commentReplySchema);
module.exports = CommentReply;
