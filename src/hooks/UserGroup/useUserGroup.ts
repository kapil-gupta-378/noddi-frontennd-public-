import { useEffect, useState } from 'react'
import { getEndpointUrl } from '../../helper'
import { constants } from '../../constant'
import { GroupInfo } from '../../interfaces'
import useAxiosPrivate from '../../adapters/xhr/axiosPrivate'

export const useUserGroup = () => {
  const [page, setPage] = useState(1)
  const [perPageSize, onRowsPerPageChange] = useState(10)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [userGroups, setUserGroups] = useState<GroupInfo[]>([])
  const [dataCount, setDataCount] = useState<number>(0)
  const [searchKey, setSearchKey] = useState<string>()
  const axiosPrivate = useAxiosPrivate()

  const fetchData = async (page: number, searchKeyWord = '') => {
    setIsLoading(true)
    setSearchKey(searchKeyWord)
    const { apiEndpoints } = constants
    const userGroupsUrl: string = getEndpointUrl(apiEndpoints.getUserGroups, { page_size: perPageSize, page: page, search: searchKeyWord })

    await axiosPrivate
      .get(userGroupsUrl)
      .then((values) => {
        setDataCount(values.data.count)
        setUserGroups(values.data.results)
        setIsLoading(false)
      })
      .catch(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    fetchData(page)
  }, [])

  useEffect(() => {
    if (page) fetchData(page)
  }, [page])

  useEffect(() => {
    fetchData(1)
  }, [perPageSize])

  const dataSearch = (keyword: string) => fetchData(page, keyword)

  return { page, setPage, userGroups, isLoading, dataSearch, onRowsPerPageChange, perPageSize, dataCount, searchKey, fetchData }
}
