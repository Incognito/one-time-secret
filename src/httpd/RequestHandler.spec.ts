import { RequestHandler } from './RequestHandler';

describe('RequestHandler Spec', function() {
  it('should construct', function() {
    const loggerMock = { warn: jest.fn() };
    const router = new Map();

    const sut = new RequestHandler(loggerMock, router);
    expect(sut).toEqual(expect.any(RequestHandler));
  });

  it('should process web request', function() {
    const loggerMock = { warn: jest.fn() };
    const method = 'POST';
    const url = '/sut';
    const mockController = jest.fn();
    const router = new Map([
      ['GET', new Map([
        ['/sut', mockController]
      ])]
    ]);
    const sut = new RequestHandler(loggerMock, router);

    // todo test fn is called
    const endMock = jest.fn();

    const request = { method, url };
    const response = { end: endMock };
    sut.process(<any> request, <any> response);
  });

  it('should fail if route not found', function() {
    const loggerMock = { warn: jest.fn() };
    const method = 'POST';
    const url = '/sut';
    const mockController = jest.fn();
    const router = new Map([
      ['GET', new Map([
        ['/notHere`', mockController]
      ])]
    ]);
    const sut = new RequestHandler(loggerMock, router);

    // todo test fn is called
    // todo ensure mock controller is not called
    const endMock = jest.fn();

    const request = { method, url };
    const response = { end: endMock };
    sut.process(<any> request, <any> response);
  });
});
