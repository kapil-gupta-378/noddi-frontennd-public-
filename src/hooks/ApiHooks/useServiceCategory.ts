import { useEffect, useState } from 'react'
import useApiRequest from './useApiRequest'
import { constants } from '../../constant'
import { FilterOption } from '../../interfaces'
import useAxiosPrivate from '../../adapters/xhr/axiosPrivate'
import { getEndpointUrl } from '../../helper'

export const useServiceCategory = () => {
  const [serviceCategoryList, setServiceCategoryList] = useState<FilterOption[]>([])
  const [serviceCategoryListByPage, setServiceCategoryListByPage] = useState<FilterOption[]>([])
  const { getRequest } = useApiRequest()
  const [dataCount, setDataCount] = useState<number>(0)
  const [page, setPage] = useState<number>(1)
  const [isLoading, setIsLoading] = useState(false)
  const [pageSize, setPageSize] = useState<number>(10)
  const { apiEndpoints } = constants
  const axiosPrivate = useAxiosPrivate()

  const getServiceCategoryList = async () => {
    setIsLoading(true)
    const response = await getRequest(apiEndpoints.getServiceCategoryList)
    const data = response?.data?.results?.map((value: any) => ({
      value: value.id,
      label: value.name
    }))
    setDataCount(response?.data.count)
    setIsLoading(false)
    setServiceCategoryList(data || [])
  }

  const getServiceCategoryListByPage = async (page: number) => {
    setIsLoading(true)
    const getServiceCategoryListByPageURL = getEndpointUrl(apiEndpoints.getServiceCategoryListByPage, { page_size: pageSize, page: page })
    const res = await axiosPrivate.get(getServiceCategoryListByPageURL)
    const data = res?.data?.results?.map((value: any) => ({
      value: value.id,
      label: value.name
    }))

    setDataCount(res?.data?.count)
    setServiceCategoryListByPage(data || [])
    setIsLoading(false)
  }

  const getServiceCategoryBySearch = async (query: string, page: number) => {
    setIsLoading(true)
    const getServiceCategoryListBySearchAndPageURL = getEndpointUrl(apiEndpoints.getServiceCategoryListBySearchAndPage, { page: page, query: query })
    const res = await axiosPrivate.get(getServiceCategoryListBySearchAndPageURL)
    const data = res?.data?.results?.map((value: any) => ({
      value: value.id,
      label: value.name
    }))

    setDataCount(res?.data?.count)
    setServiceCategoryListByPage(data || [])
    setIsLoading(false)
  }

  const getServiceCategoryById = async (id: number | string) => {
    const getServiceCategoryByIdUrl = getEndpointUrl(apiEndpoints.getServiceCategoryById, { id: id })
    const res = await axiosPrivate.get(getServiceCategoryByIdUrl)
    return res.data
  }

  useEffect(() => {
    getServiceCategoryList()
  }, [])

  useEffect(() => {
    getServiceCategoryListByPage(page)
  }, [page])

  useEffect(() => {
    getServiceCategoryListByPage(1)
  }, [pageSize])

  return {
    serviceCategoryList,
    getServiceCategoryById,
    dataCount,
    page,
    pageSize,
    setPageSize,
    setPage,
    setIsLoading,
    isLoading,
    getServiceCategoryListByPage,
    serviceCategoryListByPage,
    getServiceCategoryBySearch,
    getServiceCategoryList
  }
}
