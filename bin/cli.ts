import * as program from 'commander'
import * as schedule from 'node-schedule'
import { logger } from '../src/logger'

function heartBeat () {
    logger.info('Heartbeat: Application is still running.')
}

async function webstart () {
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
