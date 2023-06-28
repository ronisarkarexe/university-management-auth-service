/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose'
import { IUser, IUserMethod, UserModel } from './user.interface'
import bcrypt from 'bcrypt'
import config from '../../../config'

const userSchema = new Schema<IUser, Record<string, never>, IUserMethod>(
  {
    id: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    password: { type: String, required: true, select: 0 },
    passwordChange: { type: Boolean, default: true },
    student: { type: Schema.Types.ObjectId, ref: 'Student' },
    faculty: { type: Schema.Types.ObjectId, ref: 'Faculty' },
    admin: { type: Schema.Types.ObjectId, ref: 'Admin' },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

userSchema.methods.isUserExist = async function (
  id: string
): Promise<Partial<IUser> | null> {
  const user = await User.findOne(
    { id },
    { id: 1, password: 1, role: 1, passwordChange: 1 }
  )
  return user
}

userSchema.methods.isPasswordMatch = async function (
  givenPassword: string,
  savePassword: string
): Promise<boolean> {
  const isMatch = await bcrypt.compare(givenPassword, savePassword)
  return isMatch
}

userSchema.pre('save', async function (next) {
  const user = this
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round)
  )
  next()
})

const User = model<IUser, UserModel>('User', userSchema)
export default User
