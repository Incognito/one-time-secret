import { logger } from '../src/logger';
import { createApp } from '../src/dependencyInjection';

function webstart () {
  try {
    require('crypto');
  } catch (err) {
    logger.emerg('Node on this server was build without Crypto support. I refuse to let you use this for your own good.', err);
    process.exit(1);
    return;
  }
  logger.info('Starting webserver');
  const app = createApp();
  app.start();
}

webstart();
