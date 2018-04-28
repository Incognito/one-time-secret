import {
  Server,
  IncomingMessage,
  ServerResponse
} from 'http';

import { RequestHandler } from './RequestHandler';

export class HTTPD {
  public constructor(
    private server: Server,
    private requestHandler: RequestHandler,
    private httpPort: number,
    private httpTimeoutMs: number
  ) {
    server.on('clientError', (err, socket) => {
      if (err) {
        throw new Error(err); // TODO correctly deal with this
      }

      socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
    });
    server.setTimeout(this.httpTimeoutMs);

    server.on('request', (req: IncomingMessage, res: ServerResponse) => {
      this.requestHandler.process(req, res);
    });
  }

  public start() {
    this.server.listen(this.httpPort);
  }

  public stop() {
    this.server.close();
  }
}
