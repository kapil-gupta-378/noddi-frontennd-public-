import React, { ReactNode, createContext, useState, useEffect } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { UserDataProps } from '../interfaces'

import axios from '../adapters/xhr/axios'
import { getEndpointUrl } from '../helper'
import { constants } from '../constant'

const TOKEN = 'noddi-token'

interface AuthContextType {
  userData: UserDataProps
  setUserData: (value: UserDataProps) => void
  logout: () => React.ReactElement
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const { apiEndpoints } = constants

  const [userData, setUserData] = useState<UserDataProps | null>(null)

  const updateUserData = (data: UserDataProps) => {
    localStorage.setItem(TOKEN, data.token)
    setUserData(data)
  }

  const tokenLogin = async (token) => {
    return await axios.get(getEndpointUrl(apiEndpoints.getLoginToken), { headers: { Authorization: `Token ${token}` } })
  }

  useEffect(() => {
    if (userData) {
      localStorage.setItem(TOKEN, userData.token)
      return
    }

    const token = localStorage.getItem(TOKEN)
    if (!token) {
      logout()
      return
    }

    tokenLogin(token)
      .then((r) => {
        const data = r.data
        localStorage.setItem(TOKEN, data.token)
        setUserData(data)
      })
      .catch(() => {
        logout()
      })
  }, [userData])

  const getToken = () => localStorage.getItem(TOKEN)

  const getCurrentUserGroupId = () => {
    if (!userData) return null
    return userData.user.user_groups.find((userGroup) => userGroup.is_selected)?.id
  }

  const logout = () => {
    // Clear token from LocalStorage
    localStorage.removeItem(TOKEN)
    // Redirect  the user to log in with action
    navigate('/login', { replace: true, state: { from: location } })
    return <Navigate to={'/login'} replace={true} state={{ from: location }} />
  }

  const contextData = {
    userData,
    setUserData,
    updateUserData,
    getToken,
    getCurrentUserGroupId,
    logout
  }

  return <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
}

export default AuthContext
