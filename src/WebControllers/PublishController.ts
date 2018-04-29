import { IncomingMessage, ServerResponse } from 'http';

import { WebControllerInterface } from './WebControllerInterface';

export class PublishController implements WebControllerInterface {
  public execute(request: IncomingMessage, response: ServerResponse) {
    if (request) {
      return response;
    }
    return response;
  }
}
