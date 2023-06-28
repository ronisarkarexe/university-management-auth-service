export type ILoginUser = {
  id: string
  password: string
}

export type ILoginRes = {
  accessToken: string
  refreshToken?: string
  passwordChange: boolean | undefined
}

export type IRefreshToken = {
  accessToken: string
}
