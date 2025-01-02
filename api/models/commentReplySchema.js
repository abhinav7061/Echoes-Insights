const mongoose = require('mongoose');

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
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('CommentReply', commentReplySchema);
