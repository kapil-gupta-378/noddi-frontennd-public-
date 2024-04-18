import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import AuthContext from '../contexts/AuthProvider'

const PrivateRoute = () => {
  const { getToken, logout } = useContext(AuthContext)

  return getToken() ? <Outlet /> : logout()
}

export default PrivateRoute
