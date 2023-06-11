import express from 'express'
import {
  createDepartment,
  deleteSingleDepartment,
  getAllDepartment,
  getSingleDepartment,
  updateSingleDepartment,
} from './academicDepartment.controller'
import validateRequest from '../../middlewares/validateRequest'
import {
  createAcademicDepartmentZodSchema,
  updateAcademicDepartmentZodSchema,
} from './academicDepartment.validation'

const router = express.Router()

router.post(
  '/create-department',
  validateRequest(createAcademicDepartmentZodSchema),
  createDepartment
)

router.get('/:id', getSingleDepartment)

router.delete('/:id', deleteSingleDepartment)

router.patch(
  '/:id',
  validateRequest(updateAcademicDepartmentZodSchema),
  updateSingleDepartment
)

router.get('/', getAllDepartment)

export const AcademicDepartmentRoutes = router
