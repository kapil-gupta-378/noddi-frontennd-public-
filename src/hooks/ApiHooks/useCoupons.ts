/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import useAxiosPrivate from '../../adapters/xhr/axiosPrivate'
import { constants } from '../../constant'
import { getEndpointUrl } from '../../helper'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { CouponsData } from '../../pages/Coupons/interface'
import { AxiosError } from 'axios'

export const useCoupons = () => {
  const [couponsList, setCouponsList] = useState<CouponsData[]>([])
  const [couponsData, setCouponsData] = useState<CouponsData>({} as CouponsData)
  const [dataCount, setDataCount] = useState<number>(0)
  const [page, setPage] = useState<number>(1)
  const [isLoading, setIsLoading] = useState(false)
  const [pageSize, setPageSize] = useState<number>(10)
  const [searhQuery, setSearhQuery] = useState<string>('')
  const [isLoadedItem, setIsLoadedItem] = useState(false)
  const [isDeleted, setIsDeleted] = useState<boolean>(false)
  const [allSalesItems, setAllSalesItems] = useState<{ id: number; name: string }[]>([])
  const [allServices, setAllServices] = useState<{ id: number; name: string }[]>([])
  const [allUserGroup, setAllUserGroup] = useState<{ id: number; name: string }[]>([])
  const [allServiceAreas, setAllServiceAreas] = useState([])
  const [loading, setLoading] = useState({ SalesItems: false, services: false, userGroups: false, serviceAreas: false })

  const axiosPrivate = useAxiosPrivate()
  const { apiEndpoints } = constants
  const navigate = useNavigate()

  const getCouponsList = async (page: number, query: string) => {
    try {
      setIsLoading(true)
      const res = await axiosPrivate.get(getEndpointUrl(apiEndpoints.getCoupons, { page_size: pageSize, page: page, query: query }))
      setIsLoading(false)
      setCouponsList(res.data.results)
      setDataCount(res.data.count)
    } catch (error) {
      toast.error('something went wrong!')
      setIsLoading(false)
    }
  }

  const getCouponsById = async (id: string) => {
    try {
      setIsLoadedItem(true)
      const res = await axiosPrivate.get(getEndpointUrl(apiEndpoints.getCouponsById, { id: id }))
      setIsLoadedItem(true)
      setCouponsData(res.data)
      setIsLoadedItem(false)
    } catch (error: any) {
      setIsLoading(false)
      if (error instanceof AxiosError) {
        error.response?.status === 404 ? toast.error('Item not found!') : toast.error('something went wrong!')
      }
    }
  }

  const deleteCoupons = async (id: string) => {
    try {
      setIsDeleted(true)
      const res = await axiosPrivate.delete(getEndpointUrl(apiEndpoints.getCouponsById, { id: id }))
      setIsDeleted(false)
      if (res.status === 204) {
        toast.success('Deleted successfully')
        navigate('/coupons')
      }
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  const getAllServiceAreas = async (query: string) => {
    try {
      setLoading((prev) => ({ ...prev, serviceAreas: true }))
      const res = await axiosPrivate.get(getEndpointUrl(apiEndpoints.getServiceAreas, { query: query }))
      setLoading((prev) => ({ ...prev, serviceAreas: false }))
      setAllServiceAreas(res.data.results)
    } catch (error) {
      console.log('An error occurred')
    }
  }

  const updateAndCreateCoupons = async (action: string, values: any, id: string, setSubmitting: (isSubmitting: boolean) => void) => {
    if (action === 'edit') {
      try {
        const changedFields: any = {}
        for (const key in values) {
          if (values[key] !== couponsData[key]) {
            changedFields[key] = values[key]
          }
        }
        setSubmitting(true)
        const res = await axiosPrivate.patch(getEndpointUrl(apiEndpoints.getCouponsById, { id: id }), changedFields)
        if (res.status === 200) {
          toast.success('Updated successfully')
          navigate('/coupons')
        }
      } catch (error) {
        toast.error('something went wrong')
        setSubmitting(false)
      }
    } else {
      try {
        const res = await axiosPrivate.post(getEndpointUrl(apiEndpoints.createCoupons), values)
        if (res.status === 201) {
          toast.success('Created successfully')
          navigate('/coupons')
        }
      } catch (error) {
        toast.error('something went wrong')
        setSubmitting(false)
      }
    }
  }

  useEffect(() => {
    getCouponsList(page, searhQuery)
  }, [page, searhQuery])

  useEffect(() => {
    getCouponsList(1, searhQuery)
  }, [pageSize])

  return {
    couponsList,
    couponsData,
    dataCount,
    page,
    pageSize,
    setPageSize,
    setPage,
    setIsLoading,
    isLoading,
    isLoadedItem,
    setSearhQuery,
    getCouponsById,
    updateAndCreateCoupons,
    deleteCoupons,
    isDeleted,
    allServices,
    allUserGroup,
    // getAllUserGroups,
    getAllServiceAreas,
    allServiceAreas,
    loading
  }
}
