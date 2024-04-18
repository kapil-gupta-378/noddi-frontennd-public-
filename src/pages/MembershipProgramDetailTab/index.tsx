import { Card } from '@mui/material'
import React, { useEffect, useMemo, useState } from 'react'
import useAxiosPrivate from '../../adapters/xhr/axiosPrivate'
import { getEndpointUrl } from '../../helper'
import { useParams } from 'react-router-dom'
import { constants } from '../../constant'
import { RawTable } from '../../components/Table/BaseTable'
import { MembershipResponse } from './interface'


const MembershipProgramDetailTab = () => {
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const [dataCount, setDataCount] = useState<number>(0)
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [userMembershipProgram, setUserMembershipProgram] = useState<MembershipResponse>({} as MembershipResponse)
  const axiosPrivate = useAxiosPrivate()
  const { apiEndpoints } = constants
  const getUserAssociatedMembershipProgram = async () => {
    try {
      setIsLoading(true)
      const res = await axiosPrivate.get(getEndpointUrl(apiEndpoints.getUserGroupMembershipProgram, { page_size: pageSize, page: page, id: id }))
      setUserMembershipProgram(res.data)
      setDataCount(res.data.count)
      setIsLoading(false)
    } catch (error) {
      console.log('An error occurred')
    }
  }

  useEffect(() => {
    getUserAssociatedMembershipProgram()
  }, [page, pageSize])

  const generateTableRow = useMemo(() => {
    return userMembershipProgram.results ? userMembershipProgram.results.map((item,) => {
      return {
        id: item.id,
        Name: () => <>{item.name}</>,
        Code: () => <>{item.auth_code}</>
      }
    }) : []
  }, [userMembershipProgram])

  return (
    <>
      <Card sx={{ minWidth: 400 }}>
        <RawTable
          height='300px'
          minWidth={'auto'}
          headers={['Name', 'Code']}
          entries={generateTableRow}
          count={dataCount}
          isLoading={isLoading}
          onRowsPerPageChangeCallback={(e) => setPageSize(parseInt(e.target.value))}
          page={page}
          pageChangeCallback={(_e, newPage) => setPage(newPage)}
          rowsPerPage={pageSize}
          rowsPerPageOptions={[10, 20, 40, 50]}
          baseUrl='/membership/programs/'
        />
      </Card>
    </>
  )
}

export default MembershipProgramDetailTab
