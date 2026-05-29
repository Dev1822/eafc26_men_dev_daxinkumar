const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    sessionId: { type: String, required: true },
    device: { type: String, default: 'Unknown Device' },
    createdAt: { type: Date, default: Date.now }
});

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        maxlength: [50, 'Name cannot exceed 50 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters'],
        select: false // Do not return password by default
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    otpCode: {
        type: String,
        select: false
    },
    otpExpiresAt: {
        type: Date,
        select: false
    },
    resetPasswordToken: {
        type: String,
        select: false
    },
    resetPasswordExpiresAt: {
        type: Date,
        select: false
    },
    activeSessions: [sessionSchema]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
