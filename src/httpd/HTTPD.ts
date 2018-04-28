import {
  Server,
  IncomingMessage,
  ServerResponse 
} from 'http'

import { RequestHandler } from './RequestHandler'

class HTTPD {
  public constructor(
    private server: Server,
    private requestHandler: RequestHandler,
    private httpPort: Number,
    private httpTimeoutMs: Number
  ) {
    server.on('clientError', (err, socket) => {
      socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
    });
    server.setTimeout(httpTimeoutMs)

    server.on('request', (err, socket) => {
      this.requestHandler.process(req: IncomingMessage, res: ServerResponse);
    });
  }

  public start() {
    this.server.listen(this.httpPort);
  }

  public stop() {
    this.server.close();
  }
}

