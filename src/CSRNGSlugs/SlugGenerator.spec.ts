import { generateNewSlug } from './SlugGenerator';

describe('SlugGenerator Spec', function() {
  it('should generate different strings', function() {
    const sut = generateNewSlug(128);
    const sut2 = generateNewSlug(128);
    expect(sut).not.toEqual(sut2);
  });
});
