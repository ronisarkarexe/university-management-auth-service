import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { AuthValidation } from './auth.validation'
import { loginUser, refreshToken } from './auth.controller'

const router = express.Router()

router.post('/login', validateRequest(AuthValidation.loginZodSchema), loginUser)

router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenZodSchema),
  refreshToken
)

export const AuthRouter = router
