import { Request, Response } from 'express'
import createUserService from './user.service'

const createUser = async (req: Request, res: Response) => {
  try {
    const { user } = req.body
    const result = await createUserService.createUserDb(user)
    res.status(200).json({
      status: true,
      message: 'User created successfully',
      data: result,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Faild to create user',
    })
  }
}

export default { createUser }
