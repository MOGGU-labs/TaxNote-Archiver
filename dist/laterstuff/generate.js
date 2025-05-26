"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// main.ts
const token_1 = __importDefault(require("./token"));
const fs_1 = __importDefault(require("fs"));
const payload = { userId: "42069", username: "admin" };
const linebreak = "=========================================================";
// Generate JWT token
console.log(linebreak);
const jwtToken = token_1.default.generateJwtToken(payload);
console.log("JWT Token:", jwtToken);
console.log(linebreak);
// Load keys from files
const publicKey = fs_1.default.readFileSync("./secretKeys/public.pem", "utf8");
const privateKey = fs_1.default.readFileSync("./secretKeys/private.pem", "utf8");
// Encrypt JWT token with RSA public key
const encryptedToken = token_1.default.encryptWithPublicKey(jwtToken, publicKey);
console.log("Encrypted Token:", encryptedToken);
console.log(linebreak);
// Decrypt with RSA private key
const decryptedToken = token_1.default.decryptWithPrivateKey(encryptedToken, privateKey);
console.log("Decrypted Token:", decryptedToken);
console.log(linebreak);
// Check if decrypted token matches original
console.log("Match:", decryptedToken === jwtToken);
