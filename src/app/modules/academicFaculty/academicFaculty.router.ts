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

const router = express.Router()

router.post(
  '/create-faculty',
  validateRequest(createFacultyAodSchema),
  createFaculty
)

router.get('/:id', getSingleFaculty)

router.patch('/:id', validateRequest(updatefacultyZodSchema), updateFaculty)

router.delete('/:id', deleteFaculty)

router.get('/', getAllFaculty)

export const AcademicFacultyRouters = router
