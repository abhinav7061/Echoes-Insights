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

commentSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
    const commentId = this._id;
    try {
        await CommentLike.deleteMany({ commentId });
        await CommentReply.deleteMany({ commentId });
        next();
    } catch (err) {
        next(err);
    }
});

commentSchema.pre('deleteMany', async function (next) {
    const filter = this.getFilter();

    try {
        const commentIds = await Comment.distinct('_id', filter);
        await CommentLike.deleteMany({ commentId: { $in: commentIds } });
        await CommentReply.deleteMany({ commentId: { $in: commentIds } });
        next();
    } catch (err) {
        next(err);
    }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
