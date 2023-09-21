import { Request } from "express"
import { Document } from "mongoose"

export interface IUser extends Document {
  name: string
  email: string
  gender: string
  password?: string
  matchPassword: Function
}

export interface IRequest extends Request {
  user: IUser
}
