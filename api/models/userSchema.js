const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")
const { Schema, model } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'writer', 'user'],
        default: 'user'
    },
    password: {
        type: String,
        required: function () {
            return this.provider !== "oauth";
        },
    },
    phone: {
        type: Number,
    },
    gender: {
        type: String,
    },
    avatar: {
        url: {
            type: String
        },
        public_id: {
            type: String
        }
    },
    interests: {
        type: Array,
    },
    termsAccepted: {
        type: Boolean,
        default: false,
    },
    reciveUpdates: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true
})

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    return next();
})

userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateToken = function (rememberMe = false) {
    return jwt.sign(
        { _id: this._id },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: rememberMe ? '30d' : '2h',
        }
    );
};


const User = model('User', userSchema);

module.exports = User;