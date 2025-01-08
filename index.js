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

// Middleware untuk parsing JSON
app.use(express.json());

// Route untuk root URL
app.get('/', (req, res) => {
    res.send('<h1>Welcome to Mailer Service</h1><p>Use the endpoint <code>/api/mailer/send</code> to send emails.</p>');
});

// Routes untuk API Mailer
const mailerRoutes = require('./src/routes/mailerRoutes');
app.use('/api/mailer', mailerRoutes);

// Middleware untuk menangani 404
app.use((req, res) => {
    res.status(404).json({ message: 'Endpoint not found' });
});

// Menjalankan server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
