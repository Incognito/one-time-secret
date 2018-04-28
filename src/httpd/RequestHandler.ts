import * as nodeUrl from 'url'
import { } from 'http'

import { logger } from '../logger'

class RequestHandler {
  public constructor(
    private logger: Map
    private router: Map
  ) {

  private process(req, res) {
    try {
      const method = req.method
      const rawHeaders = req.rawHeaders
      const url = nodeUrl.parse(req.url)
    } catch (const parseException) {
      res.end('HTTP/1.1 400 Bad Request\r\n\r\n');
      return
    }

    try {
      const targetHttpController = router.get(method).get(url.pathname)
    } catch (const parseException) {
      res.end('HTTP/1.1 404 Not Found\r\n\r\n');
      return
    }

    res.end();
  }
}
