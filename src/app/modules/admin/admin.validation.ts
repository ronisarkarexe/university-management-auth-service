import { z } from 'zod'
import { gender } from '../student/student.constant'
import { adminDesignation } from './admin.constant'

const nameSchema = z.object({
  firstName: z.string().nonempty().optional(),
  middleName: z.string().optional(),
  lastName: z.string().nonempty().optional(),
})

const updateAdminZodSchema = z.object({
  body: z.object({
    name: nameSchema.optional(),
    dateOfBirth: z.string().nonempty().optional(),
    gender: z.enum([...gender] as [string, ...string[]]).optional(),
    email: z.string().email().nonempty().optional(),
    contactNo: z.string().nonempty().optional(),
    emergencyContactNo: z.string().nonempty().optional(),
    presentAddress: z.string().optional(),
    permanentAddress: z.string().optional(),
    designation: z
      .enum([...adminDesignation] as [string, ...string[]])
      .optional(),
    academicDepartment: z.string().optional(),
  }),
})

export { updateAdminZodSchema }
