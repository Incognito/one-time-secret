// Winston's modular strategy doesn't work with import syntax
// tslint:disable-next-line
const winston = require('winston');

// From the docs:
// Requiring `winston-syslog` will expose `winston.transports.Syslog`
// tslint:disable-next-line
require('winston-syslog').Syslog;

winston.add(new winston.transports.Syslog({
  app_name: 'one-time-secret'
}));

// FIXME we can remove override once winston3 types work.
const logger = winston.createLogger({
  levels: winston.config.syslog.levels,
  transports: [
    new winston.transports.Syslog(),
    new winston.transports.Console()
  ]
});

export { logger };
