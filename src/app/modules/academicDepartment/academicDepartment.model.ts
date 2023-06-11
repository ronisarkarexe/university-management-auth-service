import { Schema, model } from 'mongoose'
import {
  AcademicDepartmentModel,
  IAcademicDepartment,
} from './academicDepartment.interface'

const AcademicDepartmentSchema = new Schema<
  IAcademicDepartment,
  AcademicDepartmentModel
>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'AcademicFaculty',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

export const AcademicDepartment = model<
  IAcademicDepartment,
  AcademicDepartmentModel
>('Department', AcademicDepartmentSchema)
