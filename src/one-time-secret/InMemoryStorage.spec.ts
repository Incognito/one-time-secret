import { InMemoryStorage } from './InMemoryStorage';

jest.useFakeTimers();

describe('InMemoryStorage Spec', function() {
  const key = 'key-name';
  const secret = 'secret-name';

  it('should construct', function() {
    const sut = new InMemoryStorage();
    expect(sut).toEqual(expect.any(InMemoryStorage));
  });

  it('should get and set', async () => {
    const sut = new InMemoryStorage();
    sut.set(key, { secret }, 1000);

    const result = await sut.get(key);
    jest.runOnlyPendingTimers(); // Simulates "wait 1000"
    const result2 = await sut.get(key);

    expect(result).toMatchObject({ 'secret': 'secret-name' });
    expect(result2).toMatchObject({ 'secret': undefined });
  });

  it('should use has', async () => {
    const sut = new InMemoryStorage();
    sut.set(key, { secret }, 1000);

    const result = await sut.has(key);
    jest.runOnlyPendingTimers(); // Simulates "wait 1000"
    const result2 = await sut.has(key);

    expect(result).toBe(true);
    expect(result2).toBe(false);
  });
});
