const mongoose = require('mongoose');

const sampleBlogSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: String,
    summary: String,
    content: {
        type: String,
        required: true
    },
    cover: {
        public_id: String,
        url: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('SampleBlog', sampleBlogSchema);
