import express from 'express'
import {
  createFaculty,
  deleteFaculty,
  getAllFaculty,
  getSingleFaculty,
  updateFaculty,
} from './academicFaculty.controller'
import validateRequest from '../../middlewares/validateRequest'
import {
  createFacultyAodSchema,
  updatefacultyZodSchema,
} from './academicFaculty.validation'
import { ENUM_USER_ROLE } from '../../../enums/user'
import { auth } from '../../middlewares/auth'

const router = express.Router()

router.post(
  '/create-faculty',
  validateRequest(createFacultyAodSchema),
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  createFaculty
)

router.get(
  '/:id',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.STUDENT
  ),
  getSingleFaculty
)

router.patch(
  '/:id',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY
  ),
  validateRequest(updatefacultyZodSchema),
  updateFaculty
)

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  deleteFaculty
)

router.get(
  '/',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.STUDENT
  ),
  getAllFaculty
)

export const AcademicFacultyRouters = router
