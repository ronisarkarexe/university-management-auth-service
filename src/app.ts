import express, { Application, Request, Response } from 'express'
import cors from 'cors'
const app: Application = express()

// cors
app.use(cors())

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

import userRouter from './app/modules/users/user.router'
// Application router
app.use('/api/v1/users', userRouter)

// Testing
app.get('/', (req: Request, res: Response) => {
  res.send('Hello world!')
})

export default app
