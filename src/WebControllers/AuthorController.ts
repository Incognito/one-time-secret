import { IncomingMessage, ServerResponse } from 'http';

import { WebControllerInterface } from './WebControllerInterface';
import { render } from '../templates/AuthorView';

export class AuthorController implements WebControllerInterface {
  public execute(_: IncomingMessage, response: ServerResponse) {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.end(render('TODO Secret'));
    return response;
  }
}
