import { useEffect, useState } from 'react'
import useAxiosPrivate from '../../adapters/xhr/axiosPrivate'
import { constants } from '../../constant'
import { getEndpointUrl } from '../../helper'
import { useParams } from 'react-router-dom'
import { BookingItemsProps } from '../../pages/BookingDetails/interface'

export const useBookingItems = () => {
  const [bookingItemsList, setBookingItemsList] = useState<BookingItemsProps[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [bookingItem, setBookingItem] = useState<BookingItemsProps>({} as BookingItemsProps)
  const [userGroupDetail, setUserGroupDetail] = useState<{ name: string }>()
  const { apiEndpoints } = constants
  const { bookingId, id: userGroupId, bookingItemId } = useParams()

  const axiosPrivate = useAxiosPrivate()

  const getBookingItemList = async (bookingId: string) => {
    try {
      setIsLoading(true)
      const res = await axiosPrivate.get(getEndpointUrl(apiEndpoints.getBookingItemsByBookingId, { bookingId }))
      setIsLoading(false)
      setBookingItemsList(res.data)
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
  }

  const getBookingItemById = async (bookingItemId: string) => {
    try {
      setIsLoading(true)
      const res = await axiosPrivate.get(getEndpointUrl(apiEndpoints.getBookingItemById, { bookingItemId }))
      setIsLoading(false)
      if (res.status === 200) {
        setBookingItem(res.data)
      }
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
  }

  const getUserGroup = async (id: string) => {
    try {
      const res = await axiosPrivate.get(getEndpointUrl(apiEndpoints.getUserGroupById, { id }))
      if (res.status === 200) {
        setUserGroupDetail(res.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (bookingId) {
      getBookingItemList(bookingId as string)
    }

    if (userGroupId) {
      getUserGroup(userGroupId as string)
    }

    if (bookingItemId) {
      getBookingItemById(bookingItemId)
    }
  }, [])

  return {
    bookingItemsList,
    bookingId,
    isLoading,
    userGroupId,
    bookingItemId,
    userGroupDetail,
    bookingItem
  }
}
