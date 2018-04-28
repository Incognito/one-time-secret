import { randomBytes } from 'crypto';

export function generateNewSlug(numberOfBytes) {
  const buf = randomBytes(numberOfBytes);
  return buf.toString('hex');
}
