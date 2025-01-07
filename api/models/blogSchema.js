const mongoose = require('mongoose');
const Comment = require('./commentSchema');
const BlogLike = require('./blogLikeSchema');
const BlogSave = require('./blogSaveSchema');
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
    commentsCount: {
        type: Number,
        default: 0,
    },
    likesCount: {
        type: Number,
        default: 0,
    }
    // category: {
    //     type: Schema.Types.ObjectId, ref: 'Category',
    //     required: true
    // },
}, {
    timestamps: true,
})

blogSchema.pre('remove', async function (next) {
    //will update later for faster responce
    const blogId = this._id;
    try {
        await BlogLike.deleteMany({ blogId });
        await BlogSave.deleteMany({ blogId });
        const commentIds = await Comment.distinct('_id', { blogId });
        for (const comment of commentIds) {
            await comment.remove();
        }
        next();
    } catch (err) {
        next(err);
    }
});

const Blog = model('Blog', blogSchema);
module.exports = Blog;