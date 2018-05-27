import {
  generateIv,
  encrypt,
  decrypt
} from './crypto';

describe('Crypto Spec', function() {
  it('Should generate an IV with a length of 12', function() {
    const iv = generateIv();
    expect(iv.byteLength).toEqual(16);
  });

  it('Should encrypt something', function() {
    const iv = Buffer.from('00'.repeat(16), 'hex');
    const encryptedText = encrypt('secret', iv, '00'.repeat(16));
    expect(encryptedText).toEqual('48e9817c5a32');
  });

  it('Should decrypt something', function() {
    const iv = Buffer.from('00'.repeat(16), 'hex');
    const encrypted = '48e9817c5a32';
    const decryptedText = decrypt(encrypted, iv, '00'.repeat(16));
    expect(decryptedText).toEqual('secret');
  });
});
