import { FetchController } from './FetchController';

describe('FetchController Spec', function() {
  const identity = (identity: any) => { return identity; };

  it('should return an http response with body containing template and secret uri', async function() {
    jest.useFakeTimers();
    const secretStoreMock = <any> { get: jest.fn() };
    secretStoreMock.get.mockReturnValueOnce({ secret: 'login-key' });

    const sut = new FetchController(
      secretStoreMock,
      identity
    );

    const mockResponse = {
      writeHead: jest.fn(),
      end: jest.fn()
    };

    await sut.execute(<any> { url: 'https://example.com/?key=login-key&iv=00&pass=00' }, <any> mockResponse);

    expect(setTimeout).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(250);

    expect(mockResponse.writeHead).toBeCalledWith(200, { 'Content-Type': 'text/plain' });
    expect(mockResponse.end).toBeCalledWith('login-key');
    expect(secretStoreMock.get).toBeCalledWith('login-key');
  });

  it('should return an empty response when invalid request is made', async function() {
    jest.useFakeTimers();
    const secretStoreMock = <any> { get: jest.fn() };
    secretStoreMock.get.mockReturnValueOnce({ secret: 'login-key' });

    const sut = new FetchController(
      secretStoreMock,
      identity
    );

    const mockResponse = {
      writeHead: jest.fn(),
      end: jest.fn()
    };

    await sut.execute(<any> { url: 'https://example.com/?key=login-key' }, <any> mockResponse);

    expect(setTimeout).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(250);

    expect(mockResponse.writeHead).toBeCalledWith(200, { 'Content-Type': 'text/plain' });
    expect(mockResponse.end).toBeCalledWith('');
  });
});
