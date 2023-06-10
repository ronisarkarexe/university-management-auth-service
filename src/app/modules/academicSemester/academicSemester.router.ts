import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import {
  createAcademicSemester,
  getAllSemester,
  getSingleSemester,
} from './academicSemester.controller'
import { createAcademicSemesterZodSchema } from './academicSemester.validation'

const router = express.Router()

router.post(
  '/create-semester',
  validateRequest(createAcademicSemesterZodSchema),
  createAcademicSemester
)

router.get('/:id', getSingleSemester)

router.get('/', getAllSemester)

export const AcademicSemesterRouters = router
