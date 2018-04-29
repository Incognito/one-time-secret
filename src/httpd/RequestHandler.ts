import { IncomingMessage, ServerResponse } from 'http';
import * as nodeUrl from 'url';

export class RequestHandler {
  public constructor(
    private logger: any,
    private router: Map<string, Map<string, Function>>
  ) {}

  public process(req: IncomingMessage, res: ServerResponse) {
    const method: string = <string> req.method;
    const url = nodeUrl.parse(<string> req.url, true);

    let targetHttpController;
    try {
      targetHttpController = <Function> (<Map<string, Function>> this.router.get(method)).get(<string> url.pathname);
    } catch (parseException) {
      this.logger.warn('404 Not Found', parseException);
      res.end('HTTP/1.1 404 Not Found\r\n\r\n');
      return;
    }

    targetHttpController(req, res);

    res.end();
  }
}
