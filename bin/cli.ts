import * as program from 'commander'
import { logger } from '../src/logger'

async function webstart () {
    try {
      crypto = require('crypto');
    } catch (err) {
      logger.emerg('Node on this server was build without Crypto support. I refuse to let you use this for your own good.')
      process.exit(1)
      return
    }
    logger.info('Starting webserver')

    // TODO actually start a web server
}

webstart()
