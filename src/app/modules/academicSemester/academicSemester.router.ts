import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import {
  createAcademicSemester,
  deleteSelester,
  getAllSemester,
  getSingleSemester,
  updateSemester,
} from './academicSemester.controller'
import {
  createAcademicSemesterZodSchema,
  updateAcademicSemesterZodSchema,
} from './academicSemester.validation'

const router = express.Router()

router.post(
  '/create-semester',
  validateRequest(createAcademicSemesterZodSchema),
  createAcademicSemester
)

router.get('/:id', getSingleSemester)

router.get('/', getAllSemester)

router.patch(
  '/:id',
  validateRequest(updateAcademicSemesterZodSchema),
  updateSemester
)

router.delete('/:id', deleteSelester)

export const AcademicSemesterRouters = router

// Ensure 1: Route level : Update -> given me title and code both, nether
// Ensure 2: Service Level : Update -> Mapping title : code
