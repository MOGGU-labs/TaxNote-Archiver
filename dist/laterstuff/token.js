"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// token.ts
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = require("crypto");
const fs_1 = __importDefault(require("fs"));
const JWT_SECRET = "deeznuts";
const { publicKey, privateKey } = (0, crypto_1.generateKeyPairSync)("rsa", {
    modulusLength: 2048,
    publicKeyEncoding: {
        type: "pkcs1",
        format: "pem",
    },
    privateKeyEncoding: {
        type: "pkcs1",
        format: "pem",
    },
});
function generateJwtToken(payload) {
    fs_1.default.writeFileSync("./secretKeys/private.pem", privateKey);
    fs_1.default.writeFileSync("./secretKeys/public.pem", publicKey);
    console.log("RSA keys saved to 'private.pem' and 'public.pem'");
    return jsonwebtoken_1.default.sign(payload, JWT_SECRET, { expiresIn: "1h" });
}
function encryptWithPublicKey(data, pubKey) {
    const buffer = Buffer.from(data, "utf8");
    const encrypted = (0, crypto_1.publicEncrypt)(pubKey, buffer);
    return encrypted.toString("base64");
}
function decryptWithPrivateKey(encryptedBase64, privKey) {
    const buffer = Buffer.from(encryptedBase64, "base64");
    const decrypted = (0, crypto_1.privateDecrypt)(privKey, buffer);
    return decrypted.toString("utf8");
}
exports.default = {
    generateJwtToken,
    encryptWithPublicKey,
    decryptWithPrivateKey
};
