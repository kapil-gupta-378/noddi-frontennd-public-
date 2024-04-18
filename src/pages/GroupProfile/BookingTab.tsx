import { Card, Stack, Table, TableBody, TableCell, TableHead, TablePagination, TableRow } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Loader from '../../components/Loader'
import { BookingInterface } from '../../interfaces'
import { SeverityPill } from '../../components/severity-pill'
import NotFound from '../../components/commons/NotFound'
import { constants, statusList } from '../../constant'
import moment from 'moment'
import { useNavigate, useParams } from 'react-router-dom'
import useApiRequest from '../../hooks/ApiHooks/useApiRequest'

const BookingTab = ({}) => {
  const navigate = useNavigate()
  const [bookings, setBookings] = useState<[]>([])
  const {
    isLoading: { getLoading },
    getRequest
  } = useApiRequest()
  const [dataCount, setDataCount] = useState<number>(0)
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const { apiEndpoints } = constants
  const params = useParams()

  const getBookings = async (page: number) => {
    try {
      const response = await getRequest(apiEndpoints.getGroupBookings, { groupId: params.id, page_size: pageSize, page: page })
      setBookings(response?.data.results)
      setDataCount(response?.data.count)
    } catch (error) {}
  }
  useEffect(() => {
    getBookings(page)
  }, [])

  useEffect(() => {
    getBookings(1)
  }, [pageSize])

  return (
    <Card sx={{ overflowX: 'auto' }}>
      <Table sx={{ minWidth: 400 }}>
        <TableHead>
          <TableRow>
            <TableCell>Slug</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bookings.map((booking: BookingInterface, index: number) => (
            <TableRow className='cursor-pointer' hover key={index} onClick={() => navigate(`/user-groups/${booking.user_group.id}/bookings/${booking.id}/details`)}>
              <TableCell>
                <Stack alignItems='center' direction='row' spacing={1}>
                  {booking.slug}
                </Stack>
              </TableCell>
              <TableCell>
                <Stack alignItems='center' direction='row' spacing={1}>
                  {booking?.booking_time_window?.start_public ? moment(booking?.booking_time_window?.start_public).format('DD/MM/YYYY') : ''}
                </Stack>
              </TableCell>
              <TableCell>
                <Stack alignItems='center' direction='row' spacing={1}>
                  {/* <TableCell>{booking.status ? <SeverityPill>Active</SeverityPill> : "Not active"}</TableCell> */}
                  <SeverityPill color={statusList[booking.status]?.color ?? 'primary'}>{statusList[booking.status]?.label}</SeverityPill>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {getLoading && <Loader />}
      <NotFound data={bookings} isLoading={getLoading} />
      <TablePagination
        component='div'
        count={dataCount}
        onPageChange={(e, newPage) => setPage(newPage)}
        onRowsPerPageChange={(e) => setPageSize(parseInt(e.target.value))}
        page={page - 1}
        rowsPerPage={pageSize}
        rowsPerPageOptions={[10, 20, 30, 50]}
      />
    </Card>
  )
}

export default BookingTab
