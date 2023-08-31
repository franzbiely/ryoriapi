import { Injectable, Req, Res } from '@nestjs/common';
import * as crypto from "crypto";

@Injectable()
export class Encryptor {
    
    private readonly algorithm = 'aes-256-ctr';
    private readonly encryptionPassword = 'your-secret-password'; // Replace with your secret password

    private generateKey(): Buffer {
        const key = crypto.scryptSync(this.encryptionPassword, 'salt', 32); // 32 bytes key
        return key;
    }

    encrypt(text: string): string {
        const iv = crypto.randomBytes(16); // Generate a random initialization vector
        const cipher = crypto.createCipheriv(this.algorithm, this.generateKey(), iv);

        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');

        return iv.toString('hex') + encrypted;
    }

    decrypt(encryptedText: string): string {
        const iv = Buffer.from(encryptedText.slice(0, 32), 'hex'); // Extract IV from the encrypted text
        const decipher = crypto.createDecipheriv(this.algorithm, this.generateKey(), iv);

        let decrypted = decipher.update(encryptedText.slice(32), 'hex', 'utf8');
        decrypted += decipher.final('utf8');

        return decrypted;
    }
}