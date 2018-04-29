import { IncomingMessage, ServerResponse } from 'http';
import * as nodeUrl from 'url';

import { WebControllerInterface } from './WebControllerInterface';
import { StorageInterface } from '../one-time-secret/StorageInterface';

export class FetchController implements WebControllerInterface {
  public constructor(
    private secretStore: StorageInterface
  ) {}

  public async execute(request: IncomingMessage, response: ServerResponse) {
    const url = nodeUrl.parse(<string> request.url, true);
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    const secret = await this.secretStore.get(<string> url.query.key);
    response.end(secret.secret);
  }
}
