import { Card, Stack, Table, TableBody, TableCell, TableHead, TablePagination, TableRow } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Loader from '../../components/Loader'
import { car } from '../../interfaces'
import { SeverityPill } from '../../components/severity-pill'
import NotFound from '../../components/commons/NotFound'
import { useNavigate, useParams } from 'react-router-dom'
import { carSizeList, constants } from '../../constant'
import useApiRequest from '../../hooks/ApiHooks/useApiRequest'

const CarsTab = () => {
  const [groupCars, setGroupCars] = useState<[]>([])
  const {
    isLoading: { getLoading },
    getRequest
  } = useApiRequest()
  const [dataCount, setDataCount] = useState<number>(0)
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const navigate = useNavigate()
  const params = useParams()
  const { apiEndpoints } = constants

  const getGroupCars = async (page: number) => {
    try {
      const response = await getRequest(apiEndpoints.getGroupCars, { page_size: pageSize, page: page, groupId: params.id })
      setGroupCars(response?.data.results)
      setDataCount(response?.data.count)
    } catch (error) {}
  }

  useEffect(() => {
    getGroupCars(page)
  }, [])

  useEffect(() => {
    getGroupCars(1)
  }, [pageSize])

  return (
    <>
      <Card sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: 400 }}>
          <TableHead>
            <TableRow>
              <TableCell>Company</TableCell>
              <TableCell>Model</TableCell>
              <TableCell>Size</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {groupCars.map((car: car, index: number) => (
              <TableRow hover className='cursor-pointer' onClick={() => navigate(`/user-groups/${car.user_group}/cars/${car.id}/details`)} key={index}>
                <TableCell>
                  <Stack alignItems='center' direction='row' spacing={1}>
                    {car.make}
                  </Stack>
                </TableCell>
                <TableCell>
                  <Stack alignItems='center' direction='row' spacing={1}>
                    {car.model}
                  </Stack>
                </TableCell>
                <TableCell>
                  <Stack alignItems='center' direction='row' spacing={1}>
                    <SeverityPill className={'me-1'}>{carSizeList[car.car_size]}</SeverityPill>
                  </Stack>
                </TableCell>
                <TableCell>{car.is_active ? <SeverityPill>Active</SeverityPill> : 'Not active'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {getLoading && <Loader />}
        <NotFound data={groupCars} isLoading={getLoading} />
        <TablePagination
          component='div'
          count={dataCount}
          onPageChange={(e: Event, newPage: number) => setPage(newPage)}
          onRowsPerPageChange={(e) => setPageSize(parseInt(e.target.value))}
          page={page - 1}
          rowsPerPage={pageSize}
          rowsPerPageOptions={[10, 20, 30, 50]}
        />
      </Card>
    </>
  )
}

export default CarsTab
