import { Writable } from 'stream';
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

  it('should log error on client error', async function() {
    jest.mock('http');
    const serverStreamMock = <any> new Writable();
    serverStreamMock.setTimeout = jest.fn();

    const requestHandlerMock = { process: jest.fn() };
    const loggerMock = <any> { info: jest.fn(), debug: jest.fn(), error: jest.fn() };

    // tslint:disable-next-line
    new HTTPD(
      loggerMock,
      serverStreamMock,
      <any> requestHandlerMock,
      1337,
      31337
    );
    const endMock = jest.fn();
    serverStreamMock.emit('clientError', <any> 'error', <any> { end: endMock });

    await new Promise((resolve) => {
      process.nextTick(resolve);
    });
    expect(loggerMock.error).toBeCalled();
    expect(endMock).toBeCalledWith('HTTP/1.1 400 Bad Request\r\n\r\n');
  });

  it('should log error on client error without error message', async function() {
    jest.mock('http');
    const serverStreamMock = <any> new Writable();
    serverStreamMock.setTimeout = jest.fn();

    const requestHandlerMock = { process: jest.fn() };
    const loggerMock = <any> { info: jest.fn(), debug: jest.fn(), error: jest.fn() };

    // tslint:disable-next-line
    new HTTPD(
      loggerMock,
      serverStreamMock,
      <any> requestHandlerMock,
      1337,
      31337
    );
    const endMock = jest.fn();
    serverStreamMock.emit('clientError', <any> false, <any> { end: endMock });

    await new Promise((resolve) => {
      process.nextTick(resolve);
    });
    expect(loggerMock.error).not.toBeCalled();
    expect(loggerMock.info).toBeCalled();
    expect(endMock).toBeCalledWith('HTTP/1.1 400 Bad Request\r\n\r\n');
  });

  it('should log error on client error', async function() {
    jest.mock('http');
    const serverStreamMock = <any> new Writable();
    serverStreamMock.setTimeout = jest.fn();

    const requestHandlerMock = { process: jest.fn() };
    const loggerMock = <any> { info: jest.fn(), debug: jest.fn(), error: jest.fn() };

    // tslint:disable-next-line
    new HTTPD(
      loggerMock,
      serverStreamMock,
      <any> requestHandlerMock,
      1337,
      31337
    );

    const requestMock = <any> {};
    const responseMock = <any> {};
    serverStreamMock.emit('request', requestMock, responseMock);

    await new Promise((resolve) => {
      process.nextTick(resolve);
    });

    expect(loggerMock.debug).toBeCalled();
    expect(requestHandlerMock.process).toBeCalledWith(requestMock, responseMock);
  });

});
