const nodemailer = require('nodemailer');

// Fungsi untuk mengirim email
exports.sendMail = async (req, res) => {
    try {
        // Destrukturisasi data dari body request
        const { to, subject, text, html } = req.body;

        // Validasi input
        if (!to || !subject || (!text && !html)) {
            return res.status(400).json({ message: 'Field "to", "subject", and either "text" or "html" are required.' });
        }

        // Validasi format email
        const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        if (!isEmailValid(to)) {
            return res.status(400).json({ message: 'Invalid email format.' });
        }

        // Konfigurasi transporter Nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Konfigurasi email
        const mailOptions = {
            from: `"Mailer Service" <${process.env.EMAIL_USER}>`, // Sender address
            to, // Recipient address
            subject, // Subject
            text, // Plain text body
            html, // HTML body
        };

        // Kirim email
        const info = await transporter.sendMail(mailOptions);

        // Berikan respons sukses
        res.status(200).json({ message: 'Email sent successfully', messageId: info.messageId });
    } catch (error) {
        console.error('Error sending email:', error.message);

        // Tampilkan pesan error dengan lebih jelas
        res.status(500).json({
            message: 'Failed to send email',
            error: error.message,
            suggestion: 'Check your email credentials or network connection.',
        });
    }
};
