import { IAcademicSemester } from '../academicSemester/academicSemester.interface'
import User from './user.model'

export const findLastStudentId = async (): Promise<string | undefined> => {
  const lastStudent = await User.findOne({ role: 'student' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean()

  return lastStudent?.id ? lastStudent.id.substring(4) : undefined
}

export const findLastFacultyId = async (): Promise<string | undefined> => {
  const lastFacultyId = await User.findOne(
    { role: 'faculty' },
    { id: 1, _id: 0 }
  )
    .sort({ createdAt: -1 })
    .lean()

  return lastFacultyId?.id ? lastFacultyId.id.substring(2) : undefined
}

export const findLastAdminId = async (): Promise<string | undefined> => {
  const lastFacultyId = await User.findOne({ role: 'admin' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean()

  return lastFacultyId?.id ? lastFacultyId.id.substring(2) : undefined
}

export const generateStudentId = async (
  academicSemester: IAcademicSemester | null
): Promise<string> => {
  const currentId =
    (await findLastStudentId()) || (0).toString().padStart(5, '0')
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0')

  incrementedId = `${academicSemester && academicSemester.year.substring(2)}${
    academicSemester && academicSemester.code
  }${incrementedId}`

  return incrementedId
}

export const generateFacultyId = async (): Promise<string> => {
  const currentId =
    (await findLastFacultyId()) || (0).toString().padStart(5, '0')

  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0')

  incrementedId = `F-${incrementedId}`
  return incrementedId
}

export const generateAdminId = async (): Promise<string> => {
  const currentId = (await findLastAdminId()) || (0).toString().padStart(5, '0')

  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0')

  incrementedId = `A-${incrementedId}`
  return incrementedId
}
