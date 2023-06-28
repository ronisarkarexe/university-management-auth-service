import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import { AuthService } from './auth.service'
import { ILoginRes, IRefreshToken } from './auth.interface'
import config from '../../../config'

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body
  const result = await AuthService.loginUser(loginData)
  const { refreshToken, ...others } = result

  // set refresh token into cookise

  const cookiesOption = {
    secure: config.env === 'production',
    httpOnly: true,
  }
  res.cookie('refreshToken', refreshToken, cookiesOption)

  // delete result.refreshToken // XXX

  // if ('refreshToken' in result) {
  //     delete result.refreshToken
  // }

  sendResponse<ILoginRes>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Logged successfully',
    data: others,
  })
})
const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies
  const result = await AuthService.refreshTokenDb(refreshToken)

  // set refresh token into cookise

  const cookiesOption = {
    secure: config.env === 'production',
    httpOnly: true,
  }
  res.cookie('refreshToken', refreshToken, cookiesOption)

  // delete result.refreshToken // XXX

  // if ('refreshToken' in result) {
  //     delete result.refreshToken
  // }

  sendResponse<IRefreshToken>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Logged successfully',
    data: result,
  })
})

export { loginUser, refreshToken }
