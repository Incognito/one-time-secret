import { IncomingMessage, ServerResponse } from 'http';

import { WebControllerInterface } from './WebControllerInterface';
import { render } from '../templates/ConfirmationView';

export class ConfirmationController implements WebControllerInterface {
  public execute(request: IncomingMessage, response: ServerResponse) {
    if (request) {
      return response;
    }
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.end(render('TODO Secret'));
    return response;
  }
}
