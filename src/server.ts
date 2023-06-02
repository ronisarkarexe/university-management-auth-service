import { connect } from 'mongoose'
import app from './app'
import config from './config/index'
import { errorLogger, logger } from './shared/logger'

async function run() {
  try {
    await connect(config.database_url as string)
    logger.info('Databse is connected successfully')
    app.listen(config.port, () => {
      logger.info('listening on port ' + config.port)
    })
  } catch (error) {
    errorLogger.error('server connection error', error)
  }
}
run().catch(err => errorLogger.error(err))
