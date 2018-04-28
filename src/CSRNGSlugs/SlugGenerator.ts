import { randomBytes } from 'crypto'

export function generateNewSlug(numberOfBytes) {
  const buf = crypto.randomBytes(numberOfBytes);
  return buf.toString('hex');
}
