import { getEndpointUrl } from '../../helper'
import React, { useState } from 'react'
import useAxiosPrivate from '../../adapters/xhr/axiosPrivate'
interface Loading {
  getLoading: boolean
  postLoading: boolean
  putLoading: boolean
  patchLoading: boolean
}
interface params {
  [key: string]: any
}
const useApiRequest = () => {
  const [isLoading, setIsLoading] = useState<Loading>({ getLoading: false, postLoading: false, putLoading: false, patchLoading: false })
  const axiosPrivate = useAxiosPrivate()
  // for get method
  const getRequest = async (endpoint: string, params?: params) => {
    setIsLoading((prev) => ({ ...prev, getLoading: true }))
    try {
      const apiUrl: string = getEndpointUrl(endpoint, params)
      const response = await axiosPrivate.get(apiUrl)
      setIsLoading((prev) => ({ ...prev, getLoading: false }))
      return response
    } catch (error) {
      setIsLoading((prev) => ({ ...prev, getLoading: false }))
      console.error('An error occurred')
    }
  }
  // for post method
  const postRequest = async (endpoint: string, params: params) => {
    setIsLoading((prev) => ({ ...prev, postLoading: true }))
    try {
      const apiUrl: string = getEndpointUrl(endpoint)
      const response = await axiosPrivate.post(apiUrl, params)
      setIsLoading((prev) => ({ ...prev, postLoading: false }))
      return response.data
    } catch (error) {
      setIsLoading((prev) => ({ ...prev, postLoading: false }))
      console.error('An error occurred')
    }
  }

  // for put method
  const putRequest = async (endpoint: string, params: params, id: string) => {
    setIsLoading((prev) => ({ ...prev, putLoading: true }))
    try {
      const apiUrl: string = getEndpointUrl(endpoint, { id: id })
      const response = await axiosPrivate.put(apiUrl, params)
      setIsLoading((prev) => ({ ...prev, putLoading: false }))
      return response.data
    } catch (error) {
      setIsLoading((prev) => ({ ...prev, putLoading: false }))
      console.error('An error occurred')
    }
  }

  // for patch method
  const patchRequest = async (endpoint: string, params: params, id: string) => {
    setIsLoading((prev) => ({ ...prev, patchLoading: true }))
    const apiUrl: string = getEndpointUrl(endpoint, { id: id })
    const response = await axiosPrivate.patch(apiUrl, params)
    setIsLoading((prev) => ({ ...prev, patchLoading: false }))
    return response
  }

  return { isLoading, getRequest, postRequest, putRequest, patchRequest }
}

export default useApiRequest
