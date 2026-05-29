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

// Public Routes
router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

// Protected Routes (Require JWT)
router.use(jwtAuth);

router.post('/logout', logout);

router.route('/profile')
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
