import { createServer } from 'http';

import { HTTPD } from './httpd/HTTPD';
import { RequestHandler } from './httpd/RequestHandler';
import { getRouter } from './WebControllers/router';
import { AuthorController } from './WebControllers/AuthorController';
import { ConfirmationController } from './WebControllers/ConfirmationController';
import { FetchController } from './WebControllers/FetchController';
import { render as ConfirmationView } from './templates/ConfirmationView';
import { render as FetehView } from './templates/FetechView';
import { render as AuthorView } from './templates/AuthorView';
import { InMemoryStorage } from './one-time-secret/InMemoryStorage';

import { env } from './env';
import { logger } from './logger';

const secretStore = new InMemoryStorage();

const createHttpd = (router: any) => {
  const nodeServer = createServer();
  const requestHandler = new RequestHandler(logger, router);
  const httpd = new HTTPD(logger, nodeServer, requestHandler, env.HTTP_PORT, env.HTTP_TIMEOUT_MS);

  return httpd;
};

const authorController = new AuthorController(env, AuthorView);
const confirmationController = new ConfirmationController(env, ConfirmationView, secretStore);
const fetchController = new FetchController(FetehView, secretStore);

const createApp = () => {
  const router = getRouter(
    env.PUBLISH_SECRET_URI,
    fetchController.execute.bind(fetchController),
    confirmationController.execute.bind(confirmationController),
    authorController.execute.bind(authorController)
  );

  const httpd = createHttpd(router);

  return httpd;
};

export { createApp };
