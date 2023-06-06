import { RequestHandler } from 'express'
import { UserService } from './user.service'

const createUser: RequestHandler = async (req, res, next) => {
  try {
    const { user } = req.body
    const result = await UserService.createUserDb(user)
    res.status(200).json({
      status: true,
      message: 'User Created Successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

export const UserController = { createUser }
