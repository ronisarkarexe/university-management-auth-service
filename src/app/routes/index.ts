import express from 'express'
import { UserRoutes } from '../modules/users/user.router'
import { AcademicSemesterRouters } from '../modules/academicSemester/academicSemester.router'
import { AcademicFacultyRouters } from '../modules/academicFaculty/academicFaculty.router'
import { AcademicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.router'
import { StudentRoutes } from '../modules/student/student.router'
import { FacultyRoutes } from '../modules/faculty/faculty.router'
import { AdminRoutes } from '../modules/admin/admin.router'
import { AuthRouter } from '../modules/auth/auth.route'

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
  {
    path: '/academic-department',
    route: AcademicDepartmentRoutes,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/faculty',
    route: FacultyRoutes,
  },
  {
    path: '/admin',
    route: AdminRoutes,
  },
  {
    path: '/auth',
    route: AuthRouter,
  },
]

// Old code
// router.use('/users', UserRoutes)
// router.use('/academic-semesters', AcademicSemesterRouters)

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router
