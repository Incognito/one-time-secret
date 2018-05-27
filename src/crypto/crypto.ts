import { randomBytes, createCipheriv, createDecipheriv } from 'crypto';

// AES is a modern crypto algo
// 256 is huge
// CTR is the most reasonable block mode for this application
// GCM is a good alternative but a lot of systems don't ship with it
const algorithm = 'aes-256-ctr';

export function generateIv(): Buffer {
  return randomBytes(16);
}

export function encrypt(text: string, iv: Buffer, password: string): string {
  const cipher = createCipheriv(algorithm, password, iv);
  return cipher.update(text,'utf8','hex') + cipher.final('hex');
}

export function decrypt(text: string, iv: Buffer, password: string): string {
  const decipher = createDecipheriv(algorithm, password, iv);
  return decipher.update(text, 'hex', 'utf8') + decipher.final('utf8');
}
