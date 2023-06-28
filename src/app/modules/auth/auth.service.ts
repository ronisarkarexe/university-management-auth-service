/* eslint-disable no-empty-pattern */
import httpStatus from 'http-status'
import ApiError from '../../../customeError/ApiError'
import User from '../users/user.model'
import { ILoginRes, ILoginUser, IRefreshToken } from './auth.interface'
// import bcrypt from 'bcrypt'
// import jwt from 'jsonwebtoken'
import { Secret } from 'jsonwebtoken'
import config from '../../../config'
import { createToken, verifyJwt } from '../../../helpers/jwtHelpers'

const loginUser = async (payload: ILoginUser): Promise<ILoginRes> => {
  const { id, password } = payload

  const user = new User()

  // check user exists

  // const isUserExist = await User.findOne({id}, {id:1, password:1, passwordChange: 1}).lean()

  const isUserExist = await user.isUserExist(id)

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
  }

  // const isPasswordMatch = await bcrypt.compare(password, isUserExist)

  if (
    isUserExist.password &&
    !user.isPasswordMatch(password, isUserExist?.password)
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect')
  }

  // create access token & refresh token
  const { id: userId, role, passwordChange } = isUserExist

  const accessToken = createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  )

  const refreshToken = createToken(
    { userId, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  )

  return {
    accessToken,
    refreshToken,
    passwordChange,
  }
}

const refreshTokenDb = async (token: string): Promise<IRefreshToken> => {
  // verify token
  let verifiedToken = null
  try {
    verifiedToken = verifyJwt(token, config.jwt.refresh_secret as Secret)
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid refresh token')
  }

  // checking deleted user refresh token
  const {} = verifiedToken
  //const { userId } = verifiedToken;

  const user = new User()
  const isUserExist = await user.isUserExist(token)
  //const isUserExist = await user.isUserExist(userId)

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }

  // new access token
  const newAccessToken = createToken(
    { id: isUserExist.id, role: isUserExist.role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  )

  return {
    accessToken: newAccessToken,
  }
}

export const AuthService = {
  loginUser,
  refreshTokenDb,
}
