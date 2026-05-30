const express = require('express');
const router = express.Router();

const jwtAuth = require('../middlewares/jwtAuth');
const roleCheck = require('../middlewares/roleCheck');

const {
    generateToken,
    verifyToken,
    refreshToken,
    revokeToken,
    getProfile,
    getDashboard,
    getAdmin,
    getPrivateStats,
    getPrivatePlayers,
    getTeamDashboard
} = require('../controllers/jwtController');

// 1. PUBLIC ENDPOINT (For generating a test token)
router.post('/generate-token', generateToken);

// ============================================
// ALL ROUTES BELOW REQUIRE A VALID JWT TOKEN
// ============================================
router.use(jwtAuth);

// Token manipulation
router.post('/verify-token', verifyToken);
router.post('/refresh-token', refreshToken);
router.delete('/revoke-token', revokeToken);

// Protected endpoints
router.get('/profile', getProfile);
router.get('/dashboard', getDashboard);
router.get('/private-stats', getPrivateStats);
router.get('/private-players', getPrivatePlayers);
router.get('/team-dashboard', getTeamDashboard);

// Strict Role-Protected Endpoint
router.get('/admin', roleCheck, getAdmin);

module.exports = router;
