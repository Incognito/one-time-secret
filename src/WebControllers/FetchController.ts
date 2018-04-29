import { IncomingMessage, ServerResponse } from 'http';
import * as nodeUrl from 'url';

import { WebControllerInterface } from './WebControllerInterface';
import { StorageInterface } from '../one-time-secret/StorageInterface';

export class FetchController implements WebControllerInterface {
  public constructor(
    private render: Function,
    private secretStore: StorageInterface
  ) {}

  public execute(request: IncomingMessage, response: ServerResponse) {
    const url = nodeUrl.parse(<string> request.url, true);
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.end(this.render(this.secretStore.get(<string> url.query.key)));
  }
}
