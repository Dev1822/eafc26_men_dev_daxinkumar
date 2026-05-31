const express = require('express');
const router = express.Router();
const jwtAuth = require('../middlewares/jwtAuth');

const {
    register,
    login,
    logout,
    getProfile,
    updateProfile,
    deleteProfile,
    forgotPassword,
    resetPassword,
    changePassword,
    verifyEmail,
    sendOtp,
    verifyOtp,
    resendVerification,
    getSession,
    deleteSession
} = require('../controllers/authController');

const createRateLimiter = require('../middlewares/rateLimit');
const strictAuthLimiter = createRateLimiter({
    windowMs: 10 * 60 * 1000, // 10 minutes
    maxRequests: 5,
    message: "Too many authentication attempts. Please try again later."
});

// Public Routes
router.post('/register', strictAuthLimiter, register);
router.post('/login', strictAuthLimiter, login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

// Protected Routes (Require JWT)
router.use(jwtAuth);

router.post('/logout', logout);

router.route('/profile')
    .head((req, res) => res.status(200).end())
    .get(getProfile)
    .patch(updateProfile)
    .delete(deleteProfile);

router.post('/change-password', changePassword);
router.post('/verify-email', verifyEmail);
router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.post('/resend-verification', resendVerification);

router.route('/session')
    .get(getSession)
    .delete(deleteSession);

module.exports = router;
