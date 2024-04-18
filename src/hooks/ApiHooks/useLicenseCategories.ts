import { useEffect, useState } from 'react'
import { constants } from '../../constant'
import useAxiosPrivate from '../../adapters/xhr/axiosPrivate'
import { getEndpointUrl } from '../../helper'

export const useLicenseCategory = () => {
  const [dataCount, setDataCount] = useState<number>(0)
  const [page, setPage] = useState<number>(1)
  const [isLoading, setIsLoading] = useState(false)
  const [pageSize, setPageSize] = useState<number>(10)
  const { apiEndpoints } = constants
  const [licenseCategoryList, setLicenseCategoryList] = useState([])
  const axiosPrivate = useAxiosPrivate()

  const getLicenseCategory = async (page: number) => {
    setIsLoading(true)
    const getLicenseCategoryListUrl = getEndpointUrl(apiEndpoints.getLicenseCategory, { page_size: pageSize, page: page })
    const res = await axiosPrivate.get(getLicenseCategoryListUrl)
    setLicenseCategoryList(res?.data?.results)
    setDataCount(res?.data.count)
    setIsLoading(false)
  }

  //   const getServiceOrganizationListByPage = async (page: number) => {
  //     setIsLoading(true)
  //     const getServiceCategoryListByPageURL = getEndpointUrl(apiEndpoints.getServiceCategoryListByPage, { page: page })
  //     const res = await axiosPrivate.get(getServiceCategoryListByPageURL)
  //     const data = res?.data?.results?.map((value: any) => ({
  //       value: value.id,
  //       label: value.name
  //     }))

  //     setDataCount(res?.data?.count)
  //     setIsLoading(false)
  //   }
  pageSize
  const getLicenseCategoryBySearch = async (query: string, page: number) => {
    setIsLoading(true)
    const getLicenseCategoryListBySearchAndPageURL = getEndpointUrl(apiEndpoints.getLicenseCategoryListBySearchAndPage, { page: page, query: query })
    const res = await axiosPrivate.get(getLicenseCategoryListBySearchAndPageURL)
    setLicenseCategoryList(res?.data?.results)
    setDataCount(res?.data?.count)
    setIsLoading(false)
  }

  const getLicenseCategoryById = async (id: string) => {
    const getLicenseCategoryByIdUrl = getEndpointUrl(apiEndpoints.getLicenseCategoryById, { id: id })
    const res = await axiosPrivate.get(getLicenseCategoryByIdUrl)
    return res.data
  }

  useEffect(() => {
    getLicenseCategory(page)
  }, [page])
  useEffect(() => {
    getLicenseCategory(1)
  }, [pageSize])

  return {
    dataCount,
    page,
    pageSize,
    setPageSize,
    setPage,
    setIsLoading,
    isLoading,
    getLicenseCategory,
    getLicenseCategoryById,
    licenseCategoryList,
    getLicenseCategoryBySearch
  }
}
