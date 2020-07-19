import { Readable } from 'stream';
import { ConfirmationController } from './ConfirmationController';

const createConfirmationController = function() {
  const secretStoreMock = { set: jest.fn() };
  const identity = (identity: any) => { return identity; };
  const confirmationController = new ConfirmationController(
    { KEY_NAME_RANDOM_BYTES: 1, MAX_UPLOAD_KB: 1, DOMAIN: 'example.com' },
    identity,
    <any> secretStoreMock,
    identity,
    () => { return Buffer.from('00', 'hex'); },
    identity
  );

  return confirmationController;
};

describe('ConfirmationController Spec', function() {
  it('should have handlers for the request upload', function() {
    const sut = createConfirmationController();

    const mockRequest = {
      on: jest.fn(),
      connection: { destroy: jest.fn() }
    };

    const mockResponse = {
      writeHead: jest.fn(),
      end: jest.fn()
    };

    // tslint:disable-next-line
    sut.execute(<any> mockRequest, <any> mockResponse);
    expect(mockRequest.on).toBeCalledWith('data', expect.any(Function));
    expect(mockRequest.on).toBeCalledWith('end', expect.any(Function));
  });

  it('should process an upload', async function() {
    const sut = createConfirmationController();

    const requestStreamMock = <any> new Readable();
    requestStreamMock.push('some-normal-payload');
    requestStreamMock.push(null);

    const mockResponse = {
      writeHead: jest.fn(),
      end: jest.fn()
    };
    await sut.execute(requestStreamMock, <any> mockResponse);

    expect(mockResponse.writeHead).toBeCalledWith(200, { 'Content-Type': 'text/html' });
    expect(mockResponse.end).toBeCalledWith('https://example.com/fetch?key=1&iv=00&pass=00');
  });

  it('should fail large uploads', async function() {
    const sut = createConfirmationController();

    const requestStreamMock = <any> new Readable();
    requestStreamMock.push('x'.repeat(1026)); // more than max_upload_kb
    requestStreamMock.push(null);
    requestStreamMock.connection = { destroy: jest.fn() };

    const mockResponse = {
      writeHead: jest.fn(),
      end: jest.fn()
    };

    try {
      await sut.execute(requestStreamMock, <any> mockResponse);
      expect(true).toEqual(false); // Fail test if there is no uncaught rejection
    } catch (e) {
      expect(true).toEqual(true);
    }

    expect(requestStreamMock.connection.destroy).toBeCalled();
  });
});
