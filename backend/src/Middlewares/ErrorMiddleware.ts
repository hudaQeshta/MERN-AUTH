import { NextFunction, Response } from 'express'
import { IRequest } from '../Definitions'
import { CastError } from 'mongoose'

const notFoundMiddleware = (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const error = new Error(`Not Found - ${req.originalUrl}`)
  res.status(404)
  next(error)
}

const generalErrorMiddleware = (
  error: CastError,
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode
  let message = error.message

  // If Mongoose not found error, set to 404 and change message
  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    statusCode = 404
    message = 'Resource not found'
  }

  res.status(statusCode).json({
    message: message,
    stack: process.env.NODE_ENV === 'production' ? null : error.stack,
  })
}

export { notFoundMiddleware, generalErrorMiddleware }
