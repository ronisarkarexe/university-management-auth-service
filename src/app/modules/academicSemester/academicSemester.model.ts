import { Schema, model } from 'mongoose'
import {
  IAcademicSemester,
  AcademicSemesterModel,
} from './academicSemester.interface'
import {
  academicSemesterCodes,
  academicSemesterMonths,
  academicSemesterTitles,
} from './academicSemester.constant'
import ApiError from '../../../customeError/ApiError'
import httpStatus from 'http-status'

const AcademicSemesterSchema = new Schema<IAcademicSemester>(
  {
    title: {
      type: String,
      required: true,
      enum: academicSemesterTitles,
    },
    year: { type: Number, required: true },
    code: { type: String, required: true, enum: academicSemesterCodes },
    startMonth: { type: String, required: true, enum: academicSemesterMonths },
    endMonth: { type: String, required: true, enum: academicSemesterMonths },
  },
  {
    timestamps: true,
  }
)

// Handling same year and same semester issue

// data -> check -? same year && same semester

AcademicSemesterSchema.pre('save', async function (next) {
  const isExist = await AcademicSemester.findOne({
    title: this.title,
    year: this.year,
  })

  if (isExist) {
    throw new ApiError(
      httpStatus.CONFLICT,
      'Academic semester is already exists !'
    )
  } else {
    next()
  }
})

const AcademicSemester = model<IAcademicSemester, AcademicSemesterModel>(
  'Academic',
  AcademicSemesterSchema
)

export default AcademicSemester
