import express, { Application } from 'express'
import cors from 'cors'
const app: Application = express()

// cors
app.use(cors())

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

import globalErrorHandler from './app/middlewares/globalErrorHandler'
import routers from './app/routes'

// Application router
app.use('/api/v1', routers)

app.use(globalErrorHandler)

export default app
