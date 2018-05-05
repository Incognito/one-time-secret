import { IncomingMessage, ServerResponse } from 'http';
import * as querystring from 'querystring';
import * as nodeUrl from 'url';

import { WebControllerInterface } from './WebControllerInterface';
import { StorageInterface } from '../one-time-secret/StorageInterface';

export class ConfirmationController implements WebControllerInterface {
  public constructor(
    private env: { KEY_NAME_RANDOM_BYTES: number, DOMAIN: string , MAX_UPLOAD_KB: number },
    private render: Function,
    private secretStore: StorageInterface,
    private generateNewSlug: Function,
  ) {}

  public execute(request: IncomingMessage, response: ServerResponse) {
    const secretKey = this.generateNewSlug(this.env.KEY_NAME_RANDOM_BYTES);
    return new Promise((resolve, reject)=>{
      let body = '';
      request.on('data', (data) => {
        body += data;
        if (body.length > 1024 * this.env.MAX_UPLOAD_KB) { // 128 kb // TODO set as envvar
          request.connection.destroy();
          reject()
        }
      });

      request.on('end', () => {
        const parsedBody = querystring.parse(body);

        this.secretStore.set(secretKey, <{secret: string}> parsedBody , +parsedBody.ttl);

        const secretUrl = nodeUrl.format({
          protocol: 'https',
          hostname: this.env.DOMAIN,
          pathname: '/fetch',
          query: {
            key: secretKey
          }
        });

        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.end(this.render(secretUrl));
        resolve()
      });
    }
  })
}
