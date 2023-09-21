import logger from './log'
import { sign } from 'jsonwebtoken'

export interface DecodedToken {
  _id?: string
  email?: string
  expiresOn?: string | number
}

export const secret = process?.env?.JWT_SECRET || ''

/**
 * Given an object, generate a JWT token.
 */
export const encodeJwtToken = async (
  data: object | any,
  options: object = {}
): Promise<string> => {
  return new Promise((resolve, reject) => {
    sign(data, secret, options, async (err: Error | null, token: any) => {
      if (err) {
        logger.debug('@encodeJwtToken', err)
        return reject(err)
      }

      return resolve(token)
    })
  })
}
