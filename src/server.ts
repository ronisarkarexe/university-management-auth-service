import { connect } from 'mongoose'
import app from './app'
import config from './config/index'

async function run() {
  try {
    await connect(config.database_url as string)
    console.log('Databse is connected successfully')
    app.listen(config.port, () => {
      console.log('listening on port ' + config.port)
    })
  } catch (error) {
    console.log('server connection error', error)
  }
}
run().catch(err => console.log(err))
