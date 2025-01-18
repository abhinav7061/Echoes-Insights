const mongoose = require('mongoose');

const ReadingProgressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    blogId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog',
        required: true,
    },
    progress: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

ReadingProgressSchema.index({ userId: 1, blogId: 1 }, { unique: true });

const ReadingProgress = mongoose.model('ReadingProgress', ReadingProgressSchema);
module.exports = ReadingProgress;
