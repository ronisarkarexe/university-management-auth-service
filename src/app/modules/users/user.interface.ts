/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose'
import { IStudent } from '../student/student.interface'
import { IFaculty } from '../faculty/faculty.interface'
import { IAdmin } from '../admin/admin.interface'

export type IUser = {
  id: string
  role: string
  password: string
  passwordChange?: true | false
  student?: Types.ObjectId | IStudent
  admin?: Types.ObjectId | IAdmin
  faculty?: Types.ObjectId | IFaculty
}

export type IUserMethod = {
  isUserExist(id: string): Promise<Partial<IUser> | null>
  isPasswordMatch(givenPassword: string, savePassword: string): Promise<boolean>
}

export type UserModel = Model<IUser, Record<string, unknown>, IUserMethod>
