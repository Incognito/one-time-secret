import { IncomingMessage, ServerResponse } from 'http';
import * as querystring from 'querystring';
import * as nodeUrl from 'url';

import { WebControllerInterface } from './WebControllerInterface';
import { StorageInterface } from '../one-time-secret/StorageInterface';

export class ConfirmationController implements WebControllerInterface {
  public constructor(
    private env: { KEY_NAME_RANDOM_BYTES: number },
    private render: Function,
    private secretStore: StorageInterface,
    private generateNewSlug: Function,
  ) {}

  public execute(request: IncomingMessage, response: ServerResponse) {
    const secretKey = this.generateNewSlug(this.env.KEY_NAME_RANDOM_BYTES);

    let body = '';
    request.on('data', function (data) {
      body += data;
      if (body.length > 1024 * 128) { // 128 kb // TODO set as envvar
        request.connection.destroy();
      }
    });

    request.on('end', () => {
      const parsedBody = querystring.parse(body);

      this.secretStore.set(secretKey, <{secret: string}> parsedBody , +parsedBody.ttl);

      const secretUrl = nodeUrl.format({
        protocol: 'https',
        hostname: 'example.com',
        pathname: '/fetch',
        query: {
          key: secretKey
        }
      });

      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.end(this.render(secretUrl));
    });

  }
}
