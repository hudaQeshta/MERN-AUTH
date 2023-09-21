import asyncHandler from 'express-async-handler'
import User from '../Models/Users'
import { Response } from 'express'
import { IRequest } from '../Definitions'
import { pick } from 'lodash'
import { encodeJwtToken } from '../Utils/token'
import logger from '../Utils/log'

const signup = asyncHandler(async (req: IRequest, res: Response) => {
  try {
    const { name, email, gender, password } = req.body

    const userExists = await User.findOne({ email })

    if (userExists) {
      throw { code: 400, message: 'User already exists' }
    }

    const user = await User.create({
      name,
      email,
      gender,
      password,
    })

    if (user?._id) {
      let accessToken = await encodeJwtToken(pick(user, ['_id', 'email']))
      logger.debug(
        'New user signed up',
        pick(user, ['name', 'email', 'gender'])
      )
      res.status(201).json({
        status: true,
        payload: {
          _id: user._id,
          name: user.name,
          email: user.email,
          gender: user.gender,
          accessToken,
        },
      })
    } else {
      throw { code: 400, message: 'Invalid user data' }
    }
  } catch (error) {
    logger.debug('error @ signup new user, ', error)
    res.status(error?.code || 400).json({
      status: false,
      error: error?.message,
      code: error?.code || 400,
    })
  }
})

const auth = asyncHandler(async (req: IRequest, res: Response) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (user?._id && (await user.matchPassword(password))) {
      let accessToken = await encodeJwtToken(pick(user, ['_id', 'email']))
      logger.debug('User signed in', pick(user, ['email']))
      res.json({
        status: true,
        payload: {
          _id: user._id,
          name: user.name,
          email: user.email,
          gender: user.gender,
          accessToken,
        },
      })
    } else {
      throw { code: 401, message: 'Invalid email or password' }
    }
  } catch (error) {
    logger.debug('error @ sign in user, ', error)
    res.status(error?.code || 400).json({
      status: false,
      error: error?.message,
      code: error?.code || 400,
    })
  }
})

export { auth, signup }
