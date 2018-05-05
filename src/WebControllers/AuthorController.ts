import { IncomingMessage, ServerResponse } from 'http';

import { WebControllerInterface } from './WebControllerInterface';

export class AuthorController implements WebControllerInterface {
  public constructor(
    private env: { PUBLISH_SECRET_URI: string },
    private render: Function
  ) {}

  public execute(_: IncomingMessage, response: ServerResponse) {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.end(this.render(this.env.PUBLISH_SECRET_URI));
  }
}
