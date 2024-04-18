import { useEffect, useState } from 'react'
import { constants } from '../../constant'
import useAxiosPrivate from '../../adapters/xhr/axiosPrivate'
import { getEndpointUrl } from '../../helper'
import { ServiceOrigination } from '../../interfaces'

export const useServiceOrganization = () => {
  const [serviceOrganizationList, setServiceOrganizationList] = useState<ServiceOrigination[]>([])
  const [userGroupList, setUserGroupList] = useState([])
  const [dataCount, setDataCount] = useState<number>(0)
  const [page, setPage] = useState<number | string>(1)
  const [isLoading, setIsLoading] = useState(false)
  const [pageSize, setPageSize] = useState<number>(10)
  const { apiEndpoints } = constants
  const axiosPrivate = useAxiosPrivate()

  const getServiceOrganizationList = async (page: number) => {
    setIsLoading(true)
    const getServiceOrganizationByIdUrl = getEndpointUrl(apiEndpoints.getServiceOrganization, { page_size: pageSize, page: page })
    const res = await axiosPrivate.get(getServiceOrganizationByIdUrl)
    setServiceOrganizationList(res.data.results)
    setDataCount(res?.data.count)
    setIsLoading(false)
  }

  const getUserGroupsForOrganization = async (search: string) => {
    const getUserAllGroupUrl = getEndpointUrl(apiEndpoints.getAllUserGroups, { search: search })
    const res = await axiosPrivate.get(getUserAllGroupUrl)
    setUserGroupList(res.data.results)
  }

  //   const getServiceOrganizationListByPage = async (page: number) => {
  //     setIsLoading(true)
  //     const getServiceCategoryListByPageURL = getEndpointUrl(apiEndpoints.getServiceCategoryListByPage, { page: page })
  //     console.log(getServiceCategoryListByPageURL)
  //     const res = await axiosPrivate.get(getServiceCategoryListByPageURL)
  //     const data = res?.data?.results?.map((value: any) => ({
  //       value: value.id,
  //       label: value.name
  //     }))

  //     setDataCount(res?.data?.count)
  //     setIsLoading(false)
  //   }

  const getServiceOrganizationBySearch = async (query: string, page: number) => {
    setIsLoading(true)
    const getServiceOrganizationListBySearchAndPageURL = getEndpointUrl(apiEndpoints.getServiceOrganizationBySearch, { page: page, query: query })
    const res = await axiosPrivate.get(getServiceOrganizationListBySearchAndPageURL)
    setServiceOrganizationList(res.data.results)
    setDataCount(res?.data?.count)
    setIsLoading(false)
  }

  const getServiceOrganizationById = async (id: number | string) => {
    const getServiceOrganizationByIdUrl = getEndpointUrl(apiEndpoints.getServiceOrganizationById, { id: id })
    const res = await axiosPrivate.get(getServiceOrganizationByIdUrl)
    return res.data
  }

  useEffect(() => {
    getServiceOrganizationList(page as number)
  }, [page])

  useEffect(() => {
    getServiceOrganizationList(1)
  }, [pageSize])

  useEffect(() => {
    getUserGroupsForOrganization('')
  }, [])

  return {
    dataCount,
    page,
    pageSize,
    setPageSize,
    setPage,
    setIsLoading,
    isLoading,
    getServiceOrganizationList,
    getServiceOrganizationById,
    serviceOrganizationList,
    getServiceOrganizationBySearch,
    userGroupList,
    getUserGroupsForOrganization
  }
}
