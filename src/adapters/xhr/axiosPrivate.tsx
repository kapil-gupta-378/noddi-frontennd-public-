import { axiosPrivate } from './axios'
import { useContext, useEffect } from 'react'
import AuthContext from '../../contexts/AuthProvider'
import EnvContext from '../../contexts/EnvProvider'

const useAxiosPrivate = () => {
  const { envIsProd } = useContext(EnvContext)
  const { getToken, logout } = useContext(AuthContext)
  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        const token = getToken()
        if (token) {
          config.headers.Authorization = `Token ${token}`
        }

        if (config.params === undefined) {
          config.params = {}
        }
        config.params.is_prod = envIsProd()

        return config
      },
      (error) => {
        Promise.reject(error).then(() => console.log("an error occurred"))
      }
    )

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status === 401) {
          logout()
        }
        return Promise.reject(error)
      }
    )

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept)
      axiosPrivate.interceptors.response.eject(responseIntercept)
    }
  }, [])

  return axiosPrivate
}

export default useAxiosPrivate
