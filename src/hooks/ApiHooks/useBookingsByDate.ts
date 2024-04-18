import { useEffect, useState } from 'react'
import { constants } from '../../constant'
import { BookingInterface } from '../../interfaces'
import useApiRequest from './useApiRequest'
import { BookingListFilter } from './interfaces'
import moment from 'moment'
import { BookingDetails } from '../../pages/BookingDetails/interface'

export const useBookingsByDate = (id?: string, initialFetch = true, user_group_id?: number, license_area_id?: number, date?: Date) => {
  const [bookings, setBookings] = useState<BookingInterface[]>([])
  const [oneBooking, setOneBooking] = useState<BookingDetails>({} as BookingDetails)
  const [dataCount, setDataCount] = useState<number>(0)
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [filterValue, setFilterValue] = useState<BookingListFilter>({
    start_date: moment(date).toDate(),
    end_date: moment().add(6, 'days').toDate(),
    license_area_id: license_area_id,
    user_group_id: user_group_id,
    status: null
  })
  const { getRequest, isLoading } = useApiRequest()
  const { apiEndpoints } = constants

  const getBooking = async (page: number, filterValue: BookingListFilter) => {
    try {
      const params = {
        page_size: pageSize,
        page: page,
        search: filterValue.search ? filterValue.search : '',
        date: moment(filterValue.start_date).format('YYYY-MM-DD'),
        license_area_id: filterValue.license_area_id,
        user_group_id: filterValue.user_group_id,
        status: filterValue.status || ''
      }
      const response = await getRequest(apiEndpoints.getBookingOverviewDetailsList, params)
      setBookings(response?.data?.results)
      setDataCount(response?.data?.count)
    } catch (error) {
      console.error('An error occurred')
    }
  }

  const fetchBookingById = async (id: string) => {
    const res: any = await getRequest(apiEndpoints.getBookingOverviewDetailsList, { bookingId: id })
    setOneBooking(res.data)
  }

  useEffect(() => {
    if (initialFetch) {
      if (id) {
        fetchBookingById(id)
        return
      }
      getBooking(page, filterValue)
    }
  }, [])

  useEffect(() => {
    getBooking(1, filterValue)
  }, [filterValue])

  useEffect(() => {
    getBooking(page, filterValue)
  }, [page])
  useEffect(() => {
    getBooking(1, filterValue)
  }, [pageSize])

  return { bookings, isLoading: isLoading.getLoading, dataCount, page, setPage, pageSize, setPageSize, setFilterValue, fetchBookingById, oneBooking }
}
