const mongoose = require('mongoose');
const CommentLike = require('./commentLikeSchema');
const CommentReply = require('./commentReplySchema');

const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: [true, "title is required"],
    },
    blogId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    repliesCount: {
        type: Number,
        default: 0,
    },
    likesCount: {
        type: Number,
        default: 0,
    }
}, {
    timestamps: true
})
const Comment = mongoose.model('Comment', commentSchema);

commentSchema.pre('remove', async function (next) {
    const commentId = this._id;

    try {
        await CommentLike.deleteMany({ commentId });
        await CommentReply.deleteMany({ commentId });
        const commentReplyIds = await Comment.distinct('_id', { commentId });
        for (const commentReply of commentReplyIds) {
            await commentReply.remove();
        }
        next();
    } catch (err) {
        next(err);
    }
});

module.exports = Comment;
