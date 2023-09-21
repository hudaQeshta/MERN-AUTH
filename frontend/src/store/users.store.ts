import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AuthRequest, SignUpRequest } from '../api/users.api'
import api from '../api'

export interface UserState {
  userInfo: Record<string, any>
  isAuthed: boolean
  loading: boolean
  error?: string
}

const accessToken = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo') || '').accessToken
  : null

const initialState: UserState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo') || '')
    : null,
  isAuthed: !!accessToken || false,
  loading: false,
}

export const login = createAsyncThunk(
  'users/login',
  async (credentials: AuthRequest, thunkAPI) => {
    try {
      const response = await api.users.auth(credentials)

      return response
    } catch (error) {
      if (error instanceof Error) return thunkAPI.rejectWithValue(error)
    }
  }
)

export const signup = createAsyncThunk(
  'users/signup',
  async (newUserData: SignUpRequest, thunkAPI) => {
    try {
      const response = await api.users.signup(newUserData)

      return response
    } catch (error) {
      if (error instanceof Error) return thunkAPI.rejectWithValue(error)
    }
  }
)

export const usersSlice = createSlice({
  name: 'login',
  initialState,

  reducers: {
    logout: (state: UserState) => {
      localStorage.removeItem('userInfo')
      localStorage.removeItem('accessToken')
      state = {
        ...initialState,
      }
    },
    clearError: (state: UserState) => {
      state.error = undefined
    },
  },

  extraReducers: {
    [login.pending.toString()]: (state, action) => {
      state.loading = true
    },
    [login.rejected.toString()]: (state, action) => {
      state.loading = false
      state.isAuthed = false
      if (
        action.payload &&
        action.payload.response &&
        action.payload.response.data &&
        action.payload.response.data.error
      ) {
        state.error = action.payload.response.data.error
      }
    },
    [login.fulfilled.toString()]: (state, action) => {
      if (
        action.payload &&
        action.payload.response &&
        action.payload.response.data &&
        action.payload.response.data.error
      ) {
        state.error = action.payload.response.data.error
        state.isAuthed = false
      } else {
        localStorage.setItem(
          'userInfo',
          JSON.stringify(action.payload.data.payload)
        )
        state.userInfo = action.payload.data.payload || {}
        state.isAuthed = true
      }
      state.loading = false
    },
    [signup.pending.toString()]: (state, action) => {
      state.loading = true
    },
    [signup.rejected.toString()]: (state, action) => {
      state.loading = false
      state.isAuthed = false
      if (
        action.payload &&
        action.payload.response &&
        action.payload.response.data &&
        action.payload.response.data.error
      ) {
        state.error = action.payload.response.data.error
      }
    },
    [signup.fulfilled.toString()]: (state, action) => {
      if (
        action.payload &&
        action.payload.response &&
        action.payload.response.data &&
        action.payload.response.data.error
      ) {
        state.error = action.payload.response.data.error
        state.isAuthed = false
      } else {
        localStorage.setItem(
          'userInfo',
          JSON.stringify(action.payload.data.payload)
        )
        state.userInfo = action.payload.data.payload || {}
        state.isAuthed = true
      }
      state.loading = false
    },
  },
})

export const { logout, clearError } = usersSlice.actions

export default usersSlice.reducer
