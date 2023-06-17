import { Schema, model } from 'mongoose'
import { AdminModel, IAdmin } from './admin.interface'
import { gender } from '../student/student.constant'
import { adminDesignation } from './admin.constant'

export const adminSchema = new Schema<IAdmin, AdminModel>({
  id: { type: String, required: true, unique: true },
  name: {
    type: {
      firstName: {
        type: String,
        required: true,
      },
      middleName: {
        type: String,
      },
      lastName: {
        type: String,
        required: true,
      },
    },
  },
  gender: {
    type: String,
    enum: gender,
  },
  dateOfBirth: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  contactNo: {
    type: String,
    unique: true,
    required: true,
  },
  emergencyContactNo: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    enum: adminDesignation,
  },
  academicDepartment: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicDepartment',
    required: true,
  },
  profileImage: {
    type: String,
    // required: true,
  },
})

export const Admin = model<IAdmin, AdminModel>('Admin', adminSchema)
