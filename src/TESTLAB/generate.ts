// main.ts
import token from './token';
import fs from 'fs';

interface Payload {
    userId: string;
    username: string;
}

const payload: Payload = { userId: "42069", username: "admin" };
const linebreak = "=========================================================";

// Generate JWT token
console.log(linebreak);
const jwtToken = token.generateJwtToken(payload);
console.log("JWT Token:", jwtToken);
console.log(linebreak);

// Load keys from files
const publicKey = fs.readFileSync("./secretKeys/public.pem", "utf8");
const privateKey = fs.readFileSync("./secretKeys/private.pem", "utf8");

// Encrypt JWT token with RSA public key
const encryptedToken = token.encryptWithPublicKey(jwtToken, publicKey);
console.log("Encrypted Token:", encryptedToken);
console.log(linebreak);

// Decrypt with RSA private key
const decryptedToken = token.decryptWithPrivateKey(encryptedToken, privateKey);
console.log("Decrypted Token:", decryptedToken);
console.log(linebreak);

// Check if decrypted token matches original
console.log("Match:", decryptedToken === jwtToken);
