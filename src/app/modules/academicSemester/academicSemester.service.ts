import httpStatus from 'http-status'
import ApiError from '../../../customeError/ApiError'
import { academicSemesterTitleCodeMapper } from './academicSemester.constant'
import { IAcademicSemester } from './academicSemester.interface'
import AcademicSemester from './academicSemester.model'
import { IPagination } from '../../../interfaces/pagination'
import { IGenericResponse } from '../../../interfaces/common'
import calculatePagination from '../../../helpers/paginationHelper'
import { SortOrder } from 'mongoose'

const createSemester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  // Like that Summer 02 !== 03
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid semester code')
  }
  const result = await AcademicSemester.create(payload)
  return result
}

const getAllSemestersDb = async (
  paginationOptions: IPagination
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  // const { page = 1, limit = 10 } = paginationOptions

  // const skip = (page - 1) * limit

  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions)

  const sortCondition: { [key: string]: SortOrder } = {}

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder
  }

  const result = await AcademicSemester.find()
    .sort(sortCondition)
    .skip(skip)
    .limit(limit)

  const total = await AcademicSemester.countDocuments()

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

export const AcademicSemesterService = {
  createSemester,
  getAllSemestersDb,
}
