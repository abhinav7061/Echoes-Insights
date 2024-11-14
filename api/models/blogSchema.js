const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    cover: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
    },
    author: {
        type: Schema.Types.ObjectId, ref: 'User',
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    category: {
        type: Schema.Types.ObjectId, ref: 'Category',
        required: true
    },
}, {
    timestamps: true,
})

const Blog = model('Blog', blogSchema);

module.exports = Blog;