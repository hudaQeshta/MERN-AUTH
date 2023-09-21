import { AxiosInstance } from 'axios'

export interface UserModel {
  _id: string
  name: string
  email: string
  gender: string
}

export interface AuthRequest {
  email: string
  password: string
}

export interface SignUpRequest {
  name: string
  email: string
  gender: string
  password: string
}

const userApi = (apiInstance: AxiosInstance) => {
  const signup = async (
    requestBody: SignUpRequest
  ): Promise<Record<string, any>> => {
    const res: Promise<Record<string, any>> = apiInstance.post(`/`, {
      ...requestBody,
    })
    return res
  }

  const auth = async (
    requestBody: AuthRequest
  ): Promise<Record<string, any>> => {
    const res: Promise<Record<string, any>> = apiInstance.post(`/auth`, {
      ...requestBody,
    })
    return res
  }

  return {
    signup,
    auth,
  }
}

export default userApi
