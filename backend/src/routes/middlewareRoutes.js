const express = require('express');
const router = express.Router();

router.get('/logger', (req, res) => {
    res.json({
        success: true,
        message: "Logger middleware executed successfully. Check the server console to see the log."
    });
});

module.exports = router;
