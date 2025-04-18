const mongoose = require('mongoose');

const WriterSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    bio: String,
    topics: {
        type: [String],
        required: true
    },
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
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    acceptTerms: Boolean,
    submittedAt: Date
});

module.exports = mongoose.model('Writer', WriterSchema);
