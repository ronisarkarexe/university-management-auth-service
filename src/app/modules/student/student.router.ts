import express from 'express'
// import validateRequest from '../../middlewares/validateRequest'
import {
  deleteSingleStudent,
  getAllStudentData,
  getSingleStudent,
  updateStudent,
} from './student.controller'
import validateRequest from '../../middlewares/validateRequest'
import { updateStudentZodSchema } from './student.validation'
const router = express.Router()

router.patch('/:id', validateRequest(updateStudentZodSchema), updateStudent)
router.get('/', getAllStudentData)
router.get('/:id', getSingleStudent)
router.delete('/:id', deleteSingleStudent)

export const StudentRoutes = router
