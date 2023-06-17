import { Schema, model } from 'mongoose'
import { FacultyModel, IFaculty } from './faculty.interface'
import { bloodGroup, gender } from '../student/student.constant'
import { designation } from './faculty.constant'

export const facultySchema = new Schema<IFaculty, FacultyModel>(
  {
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
      required: true,
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
      unique: true,
      required: true,
    },
    contactNo: {
      type: String,
      required: true,
      unique: true,
    },
    emergencyContactNo: {
      type: String,
      required: true,
    },
    bloodGroup: {
      type: String,
      enum: bloodGroup,
    },
    presentAddress: {
      type: String,
      required: true,
    },
    permanentAddress: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      enum: designation,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId, // academicFaculty --> _id
      ref: 'AcademicFaculty',
      required: true,
    },
    academicDepartment: {
      type: Schema.Types.ObjectId, // academicDepartment --> _id
      ref: 'AcademicDepartment',
      required: true,
    },
    profileImage: {
      type: String,
      // required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

export const Faculty = model<IFaculty, FacultyModel>('Faculty', facultySchema)
