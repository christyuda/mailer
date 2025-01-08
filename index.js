const express = require('express');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 9000;

// Middleware Rate Limiting (Global)
const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 menit
    max: 100, // Maksimal 100 request per IP dalam 15 menit
    message: 'Terlalu banyak permintaan. Coba lagi nanti.',
});
app.use(globalLimiter); // Pasang rate limiter global

// Routes
const mailerRoutes = require('./src/routes/mailerRoutes');
app.use('/api/mailer', mailerRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
