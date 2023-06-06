import { IGenericErrorMessage } from '../interfaces/error'

export type IGenericErrorRespons = {
  statusCode: number
  message: string
  errorMessages: IGenericErrorMessage[]
}
