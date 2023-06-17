import express from 'express'
import {
  deleteSingleAdminData,
  getAllAdminData,
  getSingleAdminData,
  updateAdminData,
} from './admin.controller'
import validateRequest from '../../middlewares/validateRequest'
import { updateAdminZodSchema } from './admin.validation'

const router = express.Router()

router.patch('/:id', validateRequest(updateAdminZodSchema), updateAdminData)

router.get('/:id', getSingleAdminData)
router.delete('/:id', deleteSingleAdminData)

router.get('/', getAllAdminData)

export const AdminRoutes = router
