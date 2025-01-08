const express = require('express');
const { sendMail } = require('../controllers/mailerController');
const apiKeyModel = require('../models/apiKeyModel');

const router = express.Router();

// Middleware untuk validasi API key
router.use((req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    if (!apiKey) {
        return res.status(401).json({ message: 'API key is required' });
    }

    const isValid = apiKeyModel.some((entry) => entry.apiKey === apiKey);
    if (!isValid) {
        return res.status(403).json({ message: 'Invalid API key' });
    }

    next();
});

// Endpoint untuk mengirim email
router.post('/send', sendMail);

module.exports = router;
