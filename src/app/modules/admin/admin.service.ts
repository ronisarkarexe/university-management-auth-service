import httpStatus from 'http-status'
import ApiError from '../../../customeError/ApiError'
import calculatePagination from '../../../helpers/paginationHelper'
import { IGenericResponse } from '../../../interfaces/common'
import { IPagination } from '../../../interfaces/pagination'
import { adminSearchableFields } from './admin.constant'
import { IAdmin, IAdminFilters } from './admin.interface'
import { Admin } from './admin.model'
import { SortOrder } from 'mongoose'

const getAllAdminDataDb = async (
  filters: IAdminFilters,
  paginationOptions: IPagination
): Promise<IGenericResponse<IAdmin[]>> => {
  const { searchTerm, ...filtersData } = filters
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions)

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      $or: adminSearchableFields.map(field => ({
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

  const result = await Admin.find(whereConditions)
    .populate('academicDepartment')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)

  const total = await Admin.countDocuments(whereConditions)

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const updateAdminDataDb = async (
  id: string,
  payload: IAdmin
): Promise<IAdmin | null> => {
  const isExit = Admin.findOne({ id })
  if (!isExit) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Faculty not found')
  }

  const { name, ...facultyData } = payload
  const updatedFacultyData: Partial<IAdmin> = { ...facultyData }

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}`
      ;(updatedFacultyData as any)[nameKey] = name[key as keyof typeof name]
    })
  }

  const result = await Admin.findOneAndUpdate({ id }, updatedFacultyData, {
    new: true,
  }).populate('academicDepartment')

  return result
}

const getSingleAdminDataDb = async (id: string): Promise<IAdmin | null> => {
  const result = await Admin.findById(id).populate('academicDepartment')
  return result
}

const deleteSingleAdminDataDb = async (id: string): Promise<IAdmin | null> => {
  const result = await Admin.findByIdAndDelete(id).populate(
    'academicDepartment'
  )
  return result
}

export const AdminService = {
  getAllAdminDataDb,
  updateAdminDataDb,
  getSingleAdminDataDb,
  deleteSingleAdminDataDb,
}
