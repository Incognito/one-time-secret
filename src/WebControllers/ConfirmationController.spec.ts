import { Writable } from 'stream'
import { Readable } from 'stream'
import { ConfirmationController } from './ConfirmationController';

describe('ConfirmationController Spec', function() {
  it('should have handlers for the request upload', function() {
    const secretStoreMock = { set: jest.fn() };
    const identity = identity => identity;
    const sut = new ConfirmationController(
      { KEY_NAME_RANDOM_BYTES: 1, MAX_UPLOAD_KB: 1 },
      identity,
      secretStoreMock,jest.fn,
      identity
    );

    const mockRequest = {
      on: jest.fn(),
      connection: { destroy: jest.fn() }
    };

    const mockResponse = {
      writeHead: jest.fn(),
      end: jest.fn()
    };

    sut.execute(mockRequest, mockResponse);
    expect(mockRequest.on).toBeCalledWith('data', expect.any(Function));
    expect(mockRequest.on).toBeCalledWith('end', expect.any(Function));
  });

  it('should process an upload', async function() {
    const secretStoreMock = { set: jest.fn() };
    const identity = identity => identity;
    const sut = new ConfirmationController(
      { KEY_NAME_RANDOM_BYTES: 1, MAX_UPLOAD_KB: 1 },
      identity,
      secretStoreMock,jest.fn,
      identity
    );

    const requestStreamMock = new Readable()
    requestStreamMock.push('some-normal-payload')
    requestStreamMock.push(null)

    const mockResponse = {
      writeHead: jest.fn(),
      end: jest.fn()
    };
    await sut.execute(requestStreamMock, mockResponse);

    expect(mockResponse.writeHead).toBeCalledWith(200, { 'Content-Type': 'text/html' });
    expect(mockResponse.end).toBeCalledWith('https://example.com/fetch?key=');
  });

  it('should fail large uploads', async function() {
    const secretStoreMock = { set: jest.fn() };
    const identity = identity => identity;
    const sut = new ConfirmationController(
      { KEY_NAME_RANDOM_BYTES: 1, MAX_UPLOAD_KB: 1 },
      identity,
      secretStoreMock,jest.fn,
      identity
    );

    const requestStreamMock = new Readable();
    requestStreamMock.push("x".repeat(1026)); // more than max_upload_kb
    requestStreamMock.push(null);
    requestStreamMock.connection = { destroy: jest.fn() };

    const mockResponse = {
      writeHead: jest.fn(),
      end: jest.fn()
    };

    try{
      await sut.execute(requestStreamMock, mockResponse);
      expect(true).toEqual(false); // Fail test if there is no uncaught rejection
    } catch (e) {
      expect(true).toEqual(true);
    }

    expect(requestStreamMock.connection.destroy).toBeCalled();
  });
});
