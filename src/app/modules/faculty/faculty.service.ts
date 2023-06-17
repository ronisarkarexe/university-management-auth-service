import calculatePagination from '../../../helpers/paginationHelper'
import { IGenericResponse } from '../../../interfaces/common'
import { IPagination } from '../../../interfaces/pagination'
import { facultySearchableFields } from './faculty.constant'
import { IFaculty, IFacultyFilters } from './faculty.interface'
import { SortOrder } from 'mongoose'
import { Faculty } from './faculty.model'
import ApiError from '../../../customeError/ApiError'
import httpStatus from 'http-status'

const getAllFacultyDataDb = async (
  filters: IFacultyFilters,
  paginationOptions: IPagination
): Promise<IGenericResponse<IFaculty[]>> => {
  const { searchTerm, ...filtersData } = filters
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions)

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      $or: facultySearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
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

  const result = await Faculty.find(whereConditions)
    .populate('academicDepartment')
    .populate('academicFaculty')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)

  const total = await Faculty.countDocuments(whereConditions)

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const updateFacultyDb = async (
  id: string,
  payload: IFaculty
): Promise<IFaculty | null> => {
  const isExit = Faculty.findOne({ id })
  if (!isExit) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Faculty not found')
  }

  const { name, ...facultyData } = payload
  const updatedFacultyData: Partial<IFaculty> = { ...facultyData }

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}`
      ;(updatedFacultyData as any)[nameKey] = name[key as keyof typeof name]
    })
  }

  const result = await Faculty.findOneAndUpdate({ id }, updatedFacultyData, {
    new: true,
  })
    .populate('academicDepartment')
    .populate('academicFaculty')

  return result
}

const getSingleFacultyDb = async (id: string): Promise<IFaculty | null> => {
  const result = await Faculty.findById(id)
    .populate('academicDepartment')
    .populate('academicFaculty')
  return result
}

const deleteSingleFacultyDb = async (id: string): Promise<IFaculty | null> => {
  const result = await Faculty.findByIdAndDelete(id)
    .populate('academicDepartment')
    .populate('academicFaculty')
  return result
}

export const FacultyService = {
  getAllFacultyDataDb,
  getSingleFacultyDb,
  deleteSingleFacultyDb,
  updateFacultyDb,
}
