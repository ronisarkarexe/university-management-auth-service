import { NextFunction, Request, Response } from 'express'
import { AcademicSemesterService } from './academicSemester.service'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import pick from '../../../shared/pick'
import { paginationFields } from '../../../constants/pagination'

const createAcademicSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body
    const result = await AcademicSemesterService.createSemester(
      academicSemesterData
    )
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semester created successfully',
      data: result,
    })
    next()
  }
)

const getAllSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // const paginationOptions = {
    //   page: Number(req.query.page),
    //   limit: Number(req.query.limit),
    //   sortBy: req.query.sortBy,
    //   sortOrder: req.query.sortOrder,
    // }
    const paginationOptions = pick(req.query, paginationFields)
    const result = await AcademicSemesterService.getAllSemestersDb(
      paginationOptions
    )
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semesters retrieved successfully',
      meta: result.meta,
      data: result.data,
    })
    next()
  }
)
export { createAcademicSemester, getAllSemester }
