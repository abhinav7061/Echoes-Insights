const mongoose = require('mongoose');

const blogSaveSchema = new mongoose.Schema({
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
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const BlogSave = mongoose.model('BlogSave', blogSaveSchema);
module.exports = BlogSave;