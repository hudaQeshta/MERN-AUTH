import {
  configureStore,
  combineReducers,
  ThunkAction,
  Action,
  PayloadAction,
} from '@reduxjs/toolkit'
import usersReducer from './users.store'

const rootReducer = combineReducers({
  users: usersReducer,
})

const persistanceMiddleware = (store: any) => {
  return (next: any) => {
    return (action: PayloadAction<any>) => {
      const result = next(action)
      return result
    }
  }
}

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([persistanceMiddleware]),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

export default store
