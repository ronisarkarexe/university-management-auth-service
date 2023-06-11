import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { IAcademicDepartment } from './academicDepartment.interface'
import { AcademicDepartmentService } from './academicDepartment.service'
import { Request, Response } from 'express'
import pick from '../../../shared/pick'
import { academicDepartmentFilterableFields } from './academicDepartment.constant'
import { paginationFields } from '../../../constants/pagination'

const createDepartment = catchAsync(async (req: Request, res: Response) => {
  const { ...academicDepartmentData } = req.body

  const result = await AcademicDepartmentService.createDepartmentDb(
    academicDepartmentData
  )

  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department created successfully',
    data: result,
  })
})

const getAllDepartment = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, academicDepartmentFilterableFields)
  const paginationOptions = pick(req.query, paginationFields)

  const result = await AcademicDepartmentService.getAllDepartment(
    filters,
    paginationOptions
  )

  sendResponse<IAcademicDepartment[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department retrieved successfully',
    meta: result.meta,
    data: result.data,
  })
})

const getSingleDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await AcademicDepartmentService.getSingleDepartmentDb(id)
  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department fetched successfully',
    data: result,
  })
})

const deleteSingleDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await AcademicDepartmentService.deleteSingleDepartmentDb(id)
    sendResponse<IAcademicDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Department deleted successfully',
      data: result,
    })
  }
)

const updateSingleDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const updateData = req.body

    const result = await AcademicDepartmentService.updateSingleDepartmentDb(
      id,
      updateData
    )
    sendResponse<IAcademicDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Department deleted successfully',
      data: result,
    })
  }
)

export {
  createDepartment,
  getAllDepartment,
  getSingleDepartment,
  deleteSingleDepartment,
  updateSingleDepartment,
}
