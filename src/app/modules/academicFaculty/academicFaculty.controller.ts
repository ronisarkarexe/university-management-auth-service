import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { AcademicFacultyService } from './academicFaculty.service'
import { IAcademicFaculty } from './academicFaculty.interface'
import { Request, Response } from 'express'
import pick from '../../../shared/pick'
import { paginationFields } from '../../../constants/pagination'
import { academicFacultyFilterableFields } from './academicFaculty.constant'

const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const { ...academicFacultyData } = req.body

  const result = await AcademicFacultyService.createFaculty(academicFacultyData)
  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty created successfully',
    data: result,
  })
})

const getAllFaculty = catchAsync(async (req: Request, res: Response) => {
  console.log('req.user')
  const filter = pick(req.query, academicFacultyFilterableFields)
  const paginationOptions = pick(req.query, paginationFields)

  const result = await AcademicFacultyService.getAllFacultyDb(
    filter,
    paginationOptions
  )

  sendResponse<IAcademicFaculty[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty retrieved successfully',
    meta: result.meta,
    data: result.data,
  })
})

const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params

  const result = await AcademicFacultyService.getSingleFacultyDb(id)

  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty fetched successfully',
    data: result,
  })
})

const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const updateData = req.body

  const result = await AcademicFacultyService.updateFacultyDb(id, updateData)

  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty updated successfully',
    data: result,
  })
})

const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params

  const result = await AcademicFacultyService.deleteFacultyDb(id)
  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty Deleted successfully',
    data: result,
  })
})

export {
  createFaculty,
  getAllFaculty,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
}
