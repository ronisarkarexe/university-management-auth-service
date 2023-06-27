import { Request, Response } from 'express'
import { UserService } from './user.service'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'

const createStudent = catchAsync(async (req: Request, res: Response) => {
  const { student, ...userData } = req.body
  console.log('academicSemester-> ', student.academicSemester)
  const result = await UserService.createStudentDb(student, userData)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully',
    data: result,
  })
})

const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const { faculty, ...userData } = req.body
  const result = await UserService.createFacultyDb(faculty, userData)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully',
    data: result,
  })
})

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const { admin, ...adminData } = req.body
  const result = await UserService.createAdminDb(admin, adminData)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully',
    data: result,
  })
})

export const UserController = { createStudent, createFaculty, createAdmin }
