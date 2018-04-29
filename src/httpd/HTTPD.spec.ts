import { HTTPD } from './HTTPD';

describe('HTTPD Spec', function() {
  it('should setup the server', function() {
    const serverSetTimeoutMock = jest.fn();
    const serverOnMock = jest.fn();
    const serverMock = {
      on: serverOnMock,
      setTimeout: serverSetTimeoutMock
    };

    const processMock = jest.fn();
    const requestHandlerMock = { process: processMock };

    const sut = new HTTPD(
      <any> { info: jest.fn(), debug: jest.fn(), error: jest.fn() },
      <any> serverMock,
      <any> requestHandlerMock,
      1337,
      31337
    );

    expect(serverSetTimeoutMock.mock.calls.length).toBe(1);
    expect(serverSetTimeoutMock.mock.calls[0][0]).toBe(31337);

    // todo: test on client error
    // todo: test client error raises error
    // todo: test client error calls socket.end
    // todo: test on request calls request handler

    expect(sut).toEqual(expect.any(HTTPD));
  });

  it('should start', function() {
    const serverListenMock = jest.fn();
    const serverSetTimeoutMock = jest.fn();
    const serverOnMock = jest.fn();
    const serverMock = {
      on: serverOnMock,
      setTimeout: serverSetTimeoutMock,
      listen: serverListenMock
    };
    const requestHandlerMock = {};

    const sut = new HTTPD(
      <any> { info: jest.fn(), debug: jest.fn(), error: jest.fn() },
      <any> serverMock,
      <any> requestHandlerMock,
      1337,
      31337
    );

    sut.start();

    expect(serverListenMock.mock.calls.length).toBe(1);
    expect(serverListenMock.mock.calls[0][0]).toBe(1337);
  });
});
