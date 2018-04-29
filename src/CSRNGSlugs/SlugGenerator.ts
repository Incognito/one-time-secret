import { randomBytes } from 'crypto';

export function generateNewSlug(numberOfBytes: number): string {
  const buf = randomBytes(numberOfBytes);
  return buf.toString('base64');
}
