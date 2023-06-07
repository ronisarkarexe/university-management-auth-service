import { Schema, model } from 'mongoose'
import {
  IAcademicSemester,
  AcademicSemesterModel,
} from './academicSemester.interface'

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const AcademicSemesterSchema = new Schema<IAcademicSemester>(
  {
    title: {
      type: String,
      required: true,
      enum: ['Autumn', 'Summer', 'Fall'],
    },
    year: { type: Number, required: true },
    code: { type: String, required: true, enum: ['01', '02', '03'] },
    startMonth: { type: String, required: true, enum: months },
    endMonth: { type: String, required: true, enum: months },
  },
  {
    timestamps: true,
  }
)

const AcademicSemester = model<IAcademicSemester, AcademicSemesterModel>(
  'Academic',
  AcademicSemesterSchema
)

export default AcademicSemester
