import { createServer } from 'http'

import { HTTPD } from './httpd/HTTPD'
import { RequestHandler } from './httpd/RequestHandler'
import { env } from './env'

const createHttpd= (router) => {
  const nodeServer = createServer();
  const requestHandler = new RequestHandler(router);
  const httpd = new HTTPD(nodeServer, RequestHandler, env.HTTP_PORT, env.HTTP_TIMEOUT_MS);

  return httpd
}

const createRouter = () => {
}

const createApp = () => {
  const router = createRouter;
  const httpd = createHttpServer(router)
}
