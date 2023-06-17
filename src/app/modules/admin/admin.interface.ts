import { Model, Types } from 'mongoose'
import { IAcademicDepartment } from '../academicDepartment/academicDepartment.interface'

export type UserName = {
  firstName: string
  middleName: string
  lastName: string
}

export type IAdmin = {
  id: string
  name: UserName
  gender: 'Male' | 'Female'
  dateOfBirth: string
  email: string
  contactNo: string
  emergencyContactNo: string
  designation: 'admin' | 'superAdmin'
  academicDepartment: Types.ObjectId | IAcademicDepartment
  profileImage?: string
}

export type AdminModel = Model<IAdmin, Record<string, unknown>>

export type IAdminFilters = {
  searchTerm?: string
  id?: string
  email?: string
  contactNo?: string
  emergencyContactNo?: string
}
