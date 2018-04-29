import { IncomingMessage, ServerResponse } from 'http';

import { WebControllerInterface } from './WebControllerInterface';
import { render } from '../templates/AuthorView';

export class AuthorController implements WebControllerInterface {
  public execute(request: IncomingMessage, response: ServerResponse) {
    if (request) {
      return request;
    }
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.end(render('TODO Secret'));
    return response;
  }
}
