import express from 'express'
import { UserRoutes } from '../modules/users/user.router'
import { AcademicSemesterRouters } from '../modules/academicSemester/academicSemester.router'
import { AcademicFacultyRouters } from '../modules/academicFaculty/academicFaculty.router'

const router = express.Router()

// Application router
const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRouters,
  },
  {
    path: '/academic-faculties',
    route: AcademicFacultyRouters,
  },
]

// Old code
// router.use('/users', UserRoutes)
// router.use('/academic-semesters', AcademicSemesterRouters)

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router
