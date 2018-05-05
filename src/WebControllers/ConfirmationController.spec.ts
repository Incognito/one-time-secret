import { ConfirmationController } from './ConfirmationController';

describe('ConfirmationController Spec', function() {
  it('should have handlers for the request upload', function() {

    const secretStoreMock = { set: jest.fn() };

    const identity = identity => identity;

    const sut = new ConfirmationController(
      { KEY_NAME_RANDOM_BYTES: 0 },
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
    // todo test reqeuest.on(data) and reqeuest.on(end)

    sut.execute(mockRequest, mockResponse);
    expect(mockRequest.on).toBeCalledWith('data', expect.any(Function));
    expect(mockRequest.on).toBeCalledWith('end', expect.any(Function));
  });
});
