import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { createUserDb } from './app/modules/users/user.service'

const app: Application = express()

// cors
app.use(cors())

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', async (req: Request, res: Response) => {
  await createUserDb({
    id: '12345',
    password: '1234',
    role: 'student',
  })
  res.send('Hello World!')
})

export default app
