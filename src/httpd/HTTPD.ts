import {
  Server,
  IncomingMessage,
  ServerResponse
} from 'http';

import { RequestHandler } from './RequestHandler';

export class HTTPD {
  public constructor(
    private logger: any,
    private server: Server,
    private requestHandler: RequestHandler,
    private httpPort: number,
    private httpTimeoutMs: number
  ) {
    this.server.setTimeout(this.httpTimeoutMs);

    this.server.on('clientError', (err, socket) => {
      if (err) {
        this.logger.error(`Error handling client error`);
      }

      this.logger.info(`Client request error`);
      socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
    });

    this.server.on('request', (req: IncomingMessage, res: ServerResponse) => {
      this.logger.debug(`Received Request`);
      this.requestHandler.process(req, res);
    });
  }

  public start() {
    this.server.listen(this.httpPort);
    this.logger.info(`Started listening on port ${this.httpPort}`);
  }
}
