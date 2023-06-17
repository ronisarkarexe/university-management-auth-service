import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import pick from '../../../shared/pick'
import { FacultyService } from './faculty.service'
import sendResponse from '../../../shared/sendResponse'
import { IFaculty } from './faculty.interface'
import httpStatus from 'http-status'
import { paginationFields } from '../../../constants/pagination'
import { facultyFilterableFields } from './faculty.constant'

const getAllFacultyData = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, facultyFilterableFields)
  const paginationOptions = pick(req.query, paginationFields)

  const result = await FacultyService.getAllFacultyDataDb(
    filters,
    paginationOptions
  )

  sendResponse<IFaculty[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty retrieved successfully',
    meta: result.meta,
    data: result.data,
  })
})

const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await FacultyService.getSingleFacultyDb(id)
  sendResponse<IFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty retrieved successfully',
    data: result,
  })
})

const deleteSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await FacultyService.deleteSingleFacultyDb(id)
  sendResponse<IFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty deleted successfully',
    data: result,
  })
})

const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const updateData = req.body

  const result = await FacultyService.updateFacultyDb(id, updateData)
  sendResponse<IFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty updated successfully !',
    data: result,
  })
})

export {
  getAllFacultyData,
  getSingleFaculty,
  deleteSingleFaculty,
  updateFaculty,
}
