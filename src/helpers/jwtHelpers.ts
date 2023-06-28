import jwt, { Secret } from 'jsonwebtoken'

export const createToken = (
  payload: Record<string, unknown>,
  secret: Secret,
  expireTime: string
): string => {
  return jwt.sign(payload, secret, { expiresIn: expireTime })
}

export const verifyJwt = (token: string, secret: Secret) => {
  return jwt.verify(token, secret)
}
