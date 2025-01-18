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
    likesCount: {
        type: Number,
        default: 0,
    }
}, {
    timestamps: true
});

commentReplySchema.pre('deleteOne', { document: true, query: false }, async function (next) {
    const commentReplyId = this._id;

    try {
        await CommentReplyLike.deleteMany({ commentReplyId });
        next();
    } catch (err) {
        next(err);
    }
});

commentReplySchema.pre('deleteMany', async function (next) {
    const filter = this.getFilter();

    try {
        const commentReplyIds = await CommentReply.distinct('_id', filter);
        await CommentReplyLike.deleteMany({ commentReplyId: { $in: commentReplyIds } });
        next();
    } catch (err) {
        next(err);
    }
});

const CommentReply = mongoose.model('CommentReply', commentReplySchema);
module.exports = CommentReply;
