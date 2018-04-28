import * as program from 'commander'
import * as schedule from 'node-schedule'
import { logger } from '../src/logger'

function heartBeat () {
    logger.info('Heartbeat: Application is still running.')
}

async function webstart () {
    try {
      crypto = require('crypto');
    } catch (err) {
      logger.emerg('Node on this server was build without Crypto support. I refuse to let you use this for your own good.')
      process.exit(1)
      return
    }
    logger.info('Starting webserver')
    schedule.scheduleJob('0 */20 * * * * *', heartBeat)
}

program
    .version('0.0.0')

program
    .command('web:start')
    .description('Run the web server')
    .action(webstart)

program
    .command('*')
    .action(() => {
      program.outputHelp()
    })

program.parse(process.argv)
