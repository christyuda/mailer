const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
const key = Buffer.from(process.env.ENCRYPTION_KEY, 'hex'); // Key dari .env

// Fungsi untuk mengenkripsi secret key
function encryptSecretKey(secretKey) {
    const iv = crypto.randomBytes(16); // Generate IV (Initialization Vector)
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(secretKey, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + encrypted; // Gabungkan IV dan encrypted text
}

// Fungsi untuk mendekripsi secret key
function decryptSecretKey(encryptedKey) {
    const iv = Buffer.from(encryptedKey.slice(0, 32), 'hex'); // Ambil IV dari encrypted key
    const encryptedText = Buffer.from(encryptedKey.slice(32), 'hex'); // Ambil ciphertext
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

module.exports = { encryptSecretKey, decryptSecretKey };
