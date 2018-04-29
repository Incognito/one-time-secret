import { createServer } from 'http';

import { HTTPD } from './httpd/HTTPD';
import { RequestHandler } from './httpd/RequestHandler';
import { env } from './env';
import { logger } from './logger';

const createHttpd = (router: any) => {
  const nodeServer = createServer();
  const requestHandler = new RequestHandler(logger, router);
  const httpd = new HTTPD(nodeServer, requestHandler, env.HTTP_PORT, env.HTTP_TIMEOUT_MS);

  return httpd;
};

const createRouter = () => {
  return 1;
};

const createApp = () => {
  const router = createRouter;
  const httpd = createHttpd(router);

  return httpd;
};

export { createApp };
