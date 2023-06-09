import calculatePagination from '../../../helpers/paginationHelper'
import { IGenericResponse } from '../../../interfaces/common'
import { IPagination } from '../../../interfaces/pagination'
import { academicDepartmentSearchableFields } from './academicDepartment.constant'
import {
  IAcademicDepartment,
  IAcademicDepartmentFilters,
} from './academicDepartment.interface'
import { AcademicDepartment } from './academicDepartment.model'
import { SortOrder } from 'mongoose'

const createDepartmentDb = async (payload: IAcademicDepartment) => {
  const result = (await AcademicDepartment.create(payload)).populate(
    'academicFaculty'
  )
  return result
}

const getAllDepartment = async (
  filters: IAcademicDepartmentFilters,
  paginationOptions: IPagination
): Promise<IGenericResponse<IAcademicDepartment[]>> => {
  const { limit, page, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions)
  const { searchTerm, ...filtersData } = filters

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      $or: academicDepartmentSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $paginationOptions: 'i',
        },
      })),
    })
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }
  const sortConditions: { [key: string]: SortOrder } = {}

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {}

  const result = await AcademicDepartment.find(whereConditions)
    .populate('academicFaculty')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)

  const total = await AcademicDepartment.countDocuments()

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getSingleDepartmentDb = async (
  id: string
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findById(id).populate(
    'academicFaculty'
  )
  return result
}

const deleteSingleDepartmentDb = async (
  id: string
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findByIdAndDelete(id)
  return result
}

const updateSingleDepartmentDb = async (
  id: string,
  payload: Partial<IAcademicDepartment>
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    { new: true }
  ).populate('academicFaculty')
  return result
}

export const AcademicDepartmentService = {
  createDepartmentDb,
  getAllDepartment,
  getSingleDepartmentDb,
  deleteSingleDepartmentDb,
  updateSingleDepartmentDb,
}
