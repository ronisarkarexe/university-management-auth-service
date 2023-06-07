import express, { Application } from 'express'
import cors from 'cors'
const app: Application = express()

// cors
app.use(cors())

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

import globalErrorHandler from './app/middlewares/globalErrorHandler'
import { UserRoutes } from './app/modules/users/user.router'
import { AcademicSemesterRouters } from './app/modules/academicSemester/academicSemester.router'

// Application router
app.use('/api/v1/users', UserRoutes)
app.use('/api/v1/academic-semesters', AcademicSemesterRouters)

app.use(globalErrorHandler)

export default app
