import { useEffect, useState } from 'react'
import { constants } from '../../constant'
import { BookingCalendarData } from '../../interfaces'
import useApiRequest from './useApiRequest'
import { CalendarBookingsFilter } from './interfaces'
import moment from 'moment'
export const useCalendarBookings = () => {
  const [calendarBookings, setCalendarBookings] = useState<BookingCalendarData>({})
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [dateFilter, setDateFilter] = useState({
    start_date: moment().toDate(),
    end_date: moment().add(6, 'days').toDate(),
    user_group_id: null,
    license_area_id: null
  } as CalendarBookingsFilter)
  const { getRequest, isLoading } = useApiRequest()
  const { apiEndpoints } = constants

  const getBooking = async (filterValue: CalendarBookingsFilter) => {
    try {
      if (filterValue.start_date && filterValue.license_area_id && filterValue.user_group_id) {
        const params = {
          date: moment(filterValue.start_date).format('YYYY-MM-DD'),
          user_group_id: filterValue.user_group_id,
          license_area_id: filterValue.license_area_id
        }
        const response = await getRequest(apiEndpoints.getCalendarBookings, params)
        setCalendarBookings(response?.data)
      }
    } catch (error) {
      console.error('An error occurred')
    }
  }

  useEffect(() => {
    getBooking(dateFilter)
  }, [dateFilter])

  return { calendarBookings, isLoading: isLoading.getLoading, page, setPage, pageSize, setPageSize, setDateFilter, dateFilter }
}
