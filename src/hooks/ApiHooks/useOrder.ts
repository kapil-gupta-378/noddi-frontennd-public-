/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import useAxiosPrivate from '../../adapters/xhr/axiosPrivate'
import { constants } from '../../constant'
import { getEndpointUrl } from '../../helper'
import { useParams } from 'react-router-dom'
import { OrderDetailDiscount, OrderDetailNonDiscount, OrderLines, OrderProps, OrderReceipt, OrderTransaction, OrderTransactionProps } from '../../pages/BookingDetails/interface'

export const useOrder = () => {
  const axiosPrivate = useAxiosPrivate()
  const { apiEndpoints } = constants
  const { bookingId } = useParams()
  const [order, setOrder] = useState<OrderProps>()
  const [orderLines, setOrderLines] = useState<OrderLines>({ withDiscount: [], withOutDiscount: [] })
  const [orderTransaction, setOrderTransaction] = useState<OrderTransaction[]>([])
  const [orderReceipt, setOrderReceipt] = useState<OrderReceipt>({} as OrderReceipt)
  const [orderDetails, setOrderDetails] = useState<OrderDetailDiscount | OrderDetailNonDiscount>({} as OrderDetailDiscount | OrderDetailNonDiscount)
  const [orderTransactionOne, setOrderTransactionOne] = useState<OrderTransactionProps>({} as OrderTransactionProps)
  const getOrderByBooking = async () => {
    try {
      const res = await axiosPrivate.get(getEndpointUrl(apiEndpoints.getOrderByBookingId, { bookingId }))
      setOrder(res.data.results[0])
    } catch (error) {
      console.log(error)
    }
  }

  const getOrderLineByOrder = async (orderId: number) => {
    try {
      if (!orderId) return
      const res = await axiosPrivate.get(getEndpointUrl(apiEndpoints.getOrderLinesByOrder, { orderId }))
      setOrderLines({ withDiscount: res.data.filter((item: any) => item.is_discount === true), withOutDiscount: res.data.filter((item: any) => item.is_discount === false) })
    } catch (error) {
      console.log(error)
    }
  }

  const getOrderTransaction = async (orderId: number) => {
    try {
      if (!orderId) return
      const res = await axiosPrivate.get(getEndpointUrl(apiEndpoints.getOrderTransaction, { orderId }))
      setOrderTransaction(res.data.results)
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  const getOrderReceipt = async (bookingId: string) => {
    try {
      if (!bookingId) return
      const res = await axiosPrivate.get(getEndpointUrl(apiEndpoints.getOrderReceipt, { bookingId }))
      setOrderReceipt(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getOrderTransactionById = async (transactionId: string) => {
    try {
      if (!transactionId) return
      const res = await axiosPrivate.get(getEndpointUrl(apiEndpoints.getOrderTransactionById, { transactionId }))
      setOrderTransactionOne(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getOrderDetails = async (orderId: string, type: string) => {
    try {
      if (!orderId) return
      let res
      if (type === 'discount') {
        res = await axiosPrivate.get(getEndpointUrl(apiEndpoints.getOrderLineDetailDiscount, { orderId }))
      } else {
        res = await axiosPrivate.get(getEndpointUrl(apiEndpoints.getOrderLineDetailNonDiscount, { orderId }))
      }
      setOrderDetails(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getOrderByBooking()
  }, [])

  useEffect(() => {
    getOrderLineByOrder(order?.id as number)
  }, [order])

  useEffect(() => {
    getOrderTransaction(order?.id as number)
  }, [order])

  useEffect(() => {
    getOrderReceipt(bookingId as string)
  }, [bookingId])

  return {
    order,
    orderLines,
    orderTransaction,
    orderReceipt,
    getOrderDetails,
    orderDetails,
    getOrderTransactionById,
    orderTransactionOne
  }
}
