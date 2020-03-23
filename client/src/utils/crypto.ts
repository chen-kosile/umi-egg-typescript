import crypto from 'crypto';

const secret = 'kosile';

export function aesEncrypt(passwrod: string): string {
    const cipher = crypto.createCipher('aes192', secret);
    let crypted = cipher.update(passwrod, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}

export function aesDecrypt(encrypted: string): string {
    const decipher = crypto.createDecipher('aes192', secret);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}