/* eslint-disable no-console */
import { connect } from 'mongoose'
import app from './app'
import config from './config/index'
import { errorLogger, logger } from './shared/logger'
import { Server } from 'http'

process.on('uncaughtException', err => {
  errorLogger.error(err)
  process.exit(1)
})

let server: Server

async function run() {
  try {
    await connect(config.database_url as string)
    logger.info('Databse is connected successfully')
    server = app.listen(config.port, () => {
      logger.info('listening on port ' + config.port)
    })
  } catch (error) {
    errorLogger.error('server connection error', error)
  }

  process.on('uncaughtException', err => {
    if (server) {
      server.close(() => {
        errorLogger.error(err)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}
run().catch(err => errorLogger.error(err))

process.on('SIGINT', () => {
  logger.info('SIGINT is received')
  if (server) {
    server.close()
  }
})
