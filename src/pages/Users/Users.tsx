import React, { useState, useEffect } from 'react'
import useAxiosPrivate from '../../adapters/xhr/axiosPrivate'
import GridData from '../../components/DataGrid'
import { userProps } from '../../interfaces'
import { userTablecolumns } from '../../utils/dataColumns'
import { constants } from '../../constant'
import { getEndpointUrl } from '../../helper'
const Users = () => {
  const [page, setPage] = useState(1)
  const [perPageSize, onRowsPerPageChange] = useState(10)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [users, setUsers] = useState<userProps[]>([])
  const [, setRawUsers] = useState<userProps[]>([])
  const [usersCount, setUsersCount] = useState(0)
  const axiosPrivate = useAxiosPrivate()
  const fetchData = async (pageNumber: number, searchKeyWord = '') => {
    setIsLoading(true)
    const { apiEndpoints } = constants
    const usersUrl: string = getEndpointUrl(apiEndpoints.getUsersList, { page_size: perPageSize, page: pageNumber, search: searchKeyWord })
    await Promise.all([axiosPrivate.get(usersUrl)])
      .then((values) => {
        setUsersCount(values[0]?.data.count)
        setUsers(values[0]?.data?.results)
        setRawUsers(values[0]?.data?.results)
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
    fetchData(1)
  }, [perPageSize])

  const handelPageChange = (pageNumber: number) => {
    setPage(pageNumber)
    fetchData(pageNumber)
  }
  const dataSearch = (keyword: string) => {
    if (page === 1) fetchData(page, keyword)
    else {
      setPage(1)
      fetchData(1, keyword)
    }
  }
  return (
    <div>
      <GridData
        count={usersCount}
        columns={userTablecolumns}
        page={page}
        setPage={handelPageChange}
        rows={users}
        isLoading={isLoading}
        dataSearch={dataSearch}
        onRowsPerPageChange={onRowsPerPageChange}
        perPageSize={perPageSize}
      />
    </div>
  )
}
export default Users
