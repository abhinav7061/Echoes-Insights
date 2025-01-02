const mongoose = require('mongoose');

const blogSaveSchema = new mongoose.Schema({
    blogId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Poll",
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

module.exports = mongoose.model('BlogSave', blogSaveSchema);
