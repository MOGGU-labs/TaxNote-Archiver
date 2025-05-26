// token.ts
import jwt from "jsonwebtoken";
import { generateKeyPairSync, publicEncrypt, privateDecrypt } from "crypto";
import fs from "fs";

const JWT_SECRET = "deeznuts";

interface Payload {
    userId: string;
    username: string;
}

const { publicKey, privateKey } = generateKeyPairSync("rsa", {
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

function generateJwtToken(payload: Payload): string {
    fs.writeFileSync("./secretKeys/private.pem", privateKey);
    fs.writeFileSync("./secretKeys/public.pem", publicKey);
    console.log("RSA keys saved to 'private.pem' and 'public.pem'");
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
}

function encryptWithPublicKey(data: string, pubKey: string): string {
    const buffer = Buffer.from(data, "utf8");
    const encrypted = publicEncrypt(pubKey, buffer);
    return encrypted.toString("base64");
}

function decryptWithPrivateKey(encryptedBase64: string, privKey: string): string {
    const buffer = Buffer.from(encryptedBase64, "base64");
    const decrypted = privateDecrypt(privKey, buffer);
    return decrypted.toString("utf8");
}

export default {
    generateJwtToken,
    encryptWithPublicKey,
    decryptWithPrivateKey
};
