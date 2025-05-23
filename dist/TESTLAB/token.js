"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
// Secret for JWT signing
const JWT_SECRET = "deeznuts";
// AES key (32 bytes for AES-256)
const AES_KEY = crypto_1.default.randomBytes(32); // You can replace with your own 32-byte Buffer
// AES IV (16 bytes)
const AES_IV = crypto_1.default.randomBytes(16); // Random IV for encryption
// 1. Generate JWT token
function generateJwtToken(payload) {
    return jsonwebtoken_1.default.sign(payload, JWT_SECRET, { expiresIn: "1h" });
}
// 2. Encrypt string with AES-256-CBC
function encryptAES(text, key, iv) {
    const cipher = crypto_1.default.createCipheriv("aes-256-cbc", key, iv);
    let encrypted = cipher.update(text, "utf8", "base64");
    encrypted += cipher.final("base64");
    // We'll prepend IV (in base64) to encrypted text separated by a colon for transport
    return iv.toString("base64") + ":" + encrypted;
}
// 3. Decrypt AES-256-CBC encrypted string
function decryptAES(encryptedText, key) {
    const [ivBase64, encrypted] = encryptedText.split(":");
    const iv = Buffer.from(ivBase64, "base64");
    const decipher = crypto_1.default.createDecipheriv("aes-256-cbc", key, iv);
    let decrypted = decipher.update(encrypted, "base64", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
}
// --- Example usage ---
const payload = { userId: "989", username: "haikal" };
const jwtToken = generateJwtToken(payload);
console.log("JWT Token:", jwtToken);
console.log("=========================================================");
const encryptedToken = encryptAES(jwtToken, AES_KEY, AES_IV);
console.log("Encrypted Token:", encryptedToken);
console.log("=========================================================");
const decryptedToken = decryptAES(encryptedToken, AES_KEY);
console.log("Decrypted Token:", decryptedToken);
console.log("=========================================================");
// Check if decrypted token matches original
console.log("Match:", decryptedToken === jwtToken);
