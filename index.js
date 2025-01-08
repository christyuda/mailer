require('dotenv').config();
const express = require('express');
const mailerRoutes = require('./src/routes/mailerRoutes');

const app = express();
const PORT = process.env.PORT || 9000;

app.use(express.json());
app.use('/api/mailer', mailerRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal server error', error: err.message });
});

app.listen(PORT, () => {
    console.log(`Mailer service running on port ${PORT}`);
});
