import calculatePagination from '../../../helpers/paginationHelper'
import { IGenericResponse } from '../../../interfaces/common'
import { studentSearchableFields } from './student.constant'
import { IStudent, IStudentFilters } from './student.interface'
import { SortOrder } from 'mongoose'
import { Student } from './student.model'
import { IPagination } from '../../../interfaces/pagination'
import ApiError from '../../../customeError/ApiError'
import httpStatus from 'http-status'

const getAllStudentDataDb = async (
  filters: IStudentFilters,
  paginationOptions: IPagination
): Promise<IGenericResponse<IStudent[]>> => {
  const { searchTerm, ...filtersData } = filters
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions)

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      $or: studentSearchableFields.map(field => ({
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

  const result = await Student.find(whereConditions)
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('academicFaculty')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)

  const total = await Student.countDocuments(whereConditions)

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const updateStudentDb = async (
  id: string,
  payload: IStudent
): Promise<IStudent | null> => {
  const isExit = await Student.findOne({ id })
  if (!isExit) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Student not found !')
  }

  const { name, guardian, localGuardian, ...studentData } = payload

  const updatedStudentData: Partial<IStudent> = { ...studentData }

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}`
      ;(updatedStudentData as any)[nameKey] = name[key as keyof typeof name]
    })
  }
  if (guardian && Object.keys(guardian).length > 0) {
    Object.keys(guardian).forEach(key => {
      const guardianKey = `guardian.${key}`
      ;(updatedStudentData as any)[guardianKey] =
        guardian[key as keyof typeof guardian]
    })
  }

  if (localGuardian && Object.keys(localGuardian).length > 0) {
    Object.keys(localGuardian).forEach(key => {
      const localGuardianKey = `localGuardian.${key}`
      ;(updatedStudentData as any)[localGuardianKey] =
        localGuardian[key as keyof typeof localGuardian]
    })
  }

  const result = await Student.findOneAndUpdate({ id }, updatedStudentData, {
    new: true,
  })
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('academicFaculty')

  return result
}

const getSingleStudentDb = async (id: string): Promise<IStudent | null> => {
  const result = await Student.findById(id)
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('academicFaculty')
  return result
}

const deleteSingleStudentDb = async (id: string): Promise<IStudent | null> => {
  const result = await Student.findOne({ id })
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('academicFaculty')
  return result
}

export const StudentService = {
  getAllStudentDataDb,
  getSingleStudentDb,
  deleteSingleStudentDb,
  updateStudentDb,
}
