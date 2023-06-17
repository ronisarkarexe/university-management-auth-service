import { Request, Response } from 'express'
import { paginationFields } from '../../../constants/pagination'
import catchAsync from '../../../shared/catchAsync'
import pick from '../../../shared/pick'
import { studentFilterableFields } from './student.constant'
import { StudentService } from './student.service'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import { IStudent } from './student.interface'

const getAllStudentData = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, studentFilterableFields)
  const paginationOptions = pick(req.query, paginationFields)

  const result = await StudentService.getAllStudentDataDb(
    filters,
    paginationOptions
  )

  sendResponse<IStudent[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student retrieved successfully',
    meta: result.meta,
    data: result.data,
  })
})

const updateStudent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const updateData = req.body

  const result = await StudentService.updateStudentDb(id, updateData)
  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student updated successfully !',
    data: result,
  })
})

const getSingleStudent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await StudentService.getSingleStudentDb(id)
  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student retrieved successfully !',
    data: result,
  })
})

const deleteSingleStudent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await StudentService.deleteSingleStudentDb(id)
  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student deleted successfully !',
    data: result,
  })
})

export {
  getAllStudentData,
  getSingleStudent,
  deleteSingleStudent,
  updateStudent,
}
