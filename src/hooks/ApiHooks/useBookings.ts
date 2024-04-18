import { useEffect, useState } from 'react'
import { constants } from '../../constant'
import { BookingInterface } from '../../interfaces'
import useApiRequest from './useApiRequest'
import { BookingListFilter } from './interfaces'
import moment from 'moment'
import { BookingDetails } from '../../pages/BookingDetails/interface'

export const useBookings = (id?: string, initialFetch = true) => {
  const [bookings, setBookings] = useState<BookingInterface[]>([])
  const [oneBooking, setOneBooking] = useState<BookingDetails>({} as BookingDetails)
  const [dataCount, setDataCount] = useState<number>(0)
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [filterValue, setFilterValue] = useState<BookingListFilter>({ start_date: moment().toDate(), end_date: moment().add(6, 'days').toDate() })
  const { getRequest, isLoading } = useApiRequest()
  const { apiEndpoints } = constants

  const getBooking = async (page: number, filterValue: BookingListFilter) => {
    try {
      const params = {
        page: page,
        search: filterValue.search ? filterValue.search : '',
        start_date: moment(filterValue.start_date).format('YYYY-MM-DD'),
        end_date: moment(filterValue.end_date).format('YYYY-MM-DD')
      }
      const response = await getRequest(apiEndpoints.getBookings, params)
      setBookings(response?.data?.results)
      setDataCount(response?.data?.count)
    } catch (error) {
      console.error('An error occurred')
    }
  }

  // to create product
  //   const createBookingAsync = async (data: CreateBookingParam) => await postRequest(apiEndpoints.createBooking, data).then((res)=>{
  //     if(id)fetchBookingById(id)
  //     return res
  //   } )

  // to get data of one product
  const fetchBookingById = async (id: string) => {
    const res: any = await getRequest(apiEndpoints.getBookingDetail, { bookingId: id })
    setOneBooking(res.data)
  }

  // to edit product
  //   const editBookingAsync = async (data: CreateBookingParam, id: string) => await putRequest(apiEndpoints.editBooking, data, id).then((res)=> {
  //     if(id)fetchBookingById(id)
  //     return res
  //   })

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

  return { bookings, isLoading: isLoading.getLoading, dataCount, page, setPage, pageSize, setPageSize, setFilterValue, fetchBookingById, oneBooking }
}
