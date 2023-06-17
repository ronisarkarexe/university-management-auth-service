import { z } from 'zod'
import { bloodGroup, gender } from '../student/student.constant'
import { designation } from './faculty.constant'

const nameSchema = z.object({
  firstName: z.string().nonempty().optional(),
  middleName: z.string().optional(),
  lastName: z.string().nonempty().optional(),
})

const updateFacultyZodSchema = z.object({
  body: z.object({
    name: nameSchema.optional(),
    dateOfBirth: z.string().optional(),
    gender: z.enum([...gender] as [string, ...string[]]).optional(),
    email: z.string().email().optional(),
    contactNo: z.string().optional(),
    emergencyContactNo: z.string().optional(),
    bloodGroup: z.enum([...bloodGroup] as [string, ...string[]]).optional(),
    presentAddress: z.string().optional(),
    permanentAddress: z.string().optional(),
    designation: z.enum([...designation] as [string, ...string[]]).optional(),
    academicFaculty: z.string().optional(),
    academicDepartment: z.string().optional(),
  }),
})

export { updateFacultyZodSchema }
