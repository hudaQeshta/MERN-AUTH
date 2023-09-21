import Axios, { AxiosResponse } from 'axios'
import usersApi from './users.api'

const usersApiInstance = Axios.create({
  baseURL: `${process.env.REACT_APP_USERS}/api/users`,
})

export interface ErrorObject {
  location?: string
  msg: string
  param: string
  value: any
}

// apis
export const users = usersApi(usersApiInstance)

const api = {
  users,
} as Record<string, any>

export default api
