const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const createRateLimiter = require('../middlewares/rateLimit');
const rateLimit = createRateLimiter({ maxRequests: 5 });
const requestTime = require('../middlewares/requestTime');
const roleCheck = require('../middlewares/roleCheck');
const validation = require('../middlewares/validation');
const sanitizer = require('../middlewares/sanitizer');

router.get('/logger', (req, res) => {
    res.json({
        success: true,
        message: "Logger middleware executed successfully. Check the server console to see the log."
    });
});

router.get('/auth', auth, (req, res) => {
    res.json({ success: true, message: "Authentication successful!" });
});

router.get('/rate-limit', rateLimit, (req, res) => {
    res.json({ success: true, message: "Rate limit not exceeded. Request successful!" });
});

router.get('/error-handler', (req, res, next) => {
    // Deliberately throw an error to test the global error handler
    const error = new Error("This is a test error thrown by the /error-handler route!");
    error.statusCode = 400;
    next(error);
});

router.get('/request-time', requestTime, (req, res) => {
    res.json({ 
        success: true, 
        message: "Request timed successfully.",
        requestTimeMs: req.requestTime
    });
});

router.get('/role-check', roleCheck, (req, res) => {
    res.json({ success: true, message: "Role authorized. Welcome, Admin!" });
});

router.get('/validation', validation, (req, res) => {
    res.json({ 
        success: true, 
        message: "Validation passed!",
        data: { name: req.query.name, age: req.query.age }
    });
});

router.get('/sanitizer', sanitizer, (req, res) => {
    res.json({ 
        success: true, 
        message: "Text sanitized successfully!",
        cleanText: req.query.text || ""
    });
});

module.exports = router;
