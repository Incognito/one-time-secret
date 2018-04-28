import * as nodeUrl from 'url';

export class RequestHandler {
  public constructor(
    private logger: any,
    private router: Map<string, Map<string, Function>>
  ) {}

  public process(req, res) {
    const method = req.method;
    const url = nodeUrl.parse(req.url);

    let targetHttpController;
    try {
      targetHttpController = <function> this.router.get(method).get(url.pathname);
    } catch (parseException) {
      this.logger.warn('404 Not Found', parseException);
      res.end('HTTP/1.1 404 Not Found\r\n\r\n');
      return;
    }

    targetHttpController();

    res.end();
  }
}
