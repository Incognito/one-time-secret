import { FetchController } from './FetchController';

describe('FetchController Spec', function() {
  const identity = (identity: any) => { return identity; };

  it('should return an http response with body containing template and secret uri', async function() {
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

    await sut.execute(<any> { url: 'https://example.com/?key=login-key&iv=&pass=%00' }, <any> mockResponse);

    expect(mockResponse.writeHead).toBeCalledWith(200, { 'Content-Type': 'text/plain' });
    expect(mockResponse.end).toBeCalledWith('login-key');
    expect(secretStoreMock.get).toBeCalledWith('login-key');
  });
});
