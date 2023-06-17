import express from 'express'
import {
  deleteSingleFaculty,
  getAllFacultyData,
  getSingleFaculty,
  updateFaculty,
} from './faculty.controller'
import { updateFacultyZodSchema } from './faculty.validation'
import validateRequest from '../../middlewares/validateRequest'

const router = express.Router()

router.patch('/:id', validateRequest(updateFacultyZodSchema), updateFaculty)
router.get('/:id', getSingleFaculty)
router.delete('/:id', deleteSingleFaculty)

router.get('/', getAllFacultyData)

export const FacultyRoutes = router
