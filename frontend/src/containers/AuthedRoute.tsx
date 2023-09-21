import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '../app/hooks'

const AuthedRoute = () => {
  const { isAuthed } = useAppSelector((state) => state.users)

  return isAuthed ? (
    <Outlet />
  ) : (
    <>
      <Navigate to='/signup' />
    </>
  )
}

export default AuthedRoute
