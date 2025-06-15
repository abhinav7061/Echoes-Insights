const mongoose = require('mongoose');

const WriterSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    bio: String,
    sampleWorkLinks: [String],
    socialLinks: {
        twitter: String,
        linkedin: String,
        github: String
    },
    reasonToWrite: {
        type: String,
        required: true
    },
    channelName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    },
    channelHandle: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    channelImg: {
        url: {
            type: String,
        },
        public_id: {
            type: String
        }
    },
    channelCover: {
        url: {
            type: String,
        },
        public_id: {
            type: String
        }
    },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    acceptTerms: Boolean,
    submittedAt: Date
});

module.exports = mongoose.model('Writer', WriterSchema);
