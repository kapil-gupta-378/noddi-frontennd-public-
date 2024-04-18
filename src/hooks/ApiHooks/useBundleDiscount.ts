import { useEffect, useState } from 'react'
import useAxiosPrivate from '../../adapters/xhr/axiosPrivate'
import { constants } from '../../constant'
import { getEndpointUrl } from '../../helper'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { BundleDiscountDataProps } from '../../pages/BundleDiscount/interface'
import { generateRandomAlphaNumeric } from '../../utils/functions'

export const useBundleDiscount = () => {
  const [bundleDiscountList, setBundleDiscountList] = useState<BundleDiscountDataProps[]>([])
  const [bundleDiscount, setBundleDiscount] = useState<BundleDiscountDataProps>({} as BundleDiscountDataProps)
  const [dataCount, setDataCount] = useState<number>(0)
  const [page, setPage] = useState<number>(1)
  const [isLoading, setIsLoading] = useState(false)
  const [pageSize, setPageSize] = useState<number>(10)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [isLoadedItem, setIsLoadedItem] = useState(false)
  const [isDeleted, setIsDeleted] = useState<boolean>(false)

  const axiosPrivate = useAxiosPrivate()
  const { apiEndpoints } = constants
  const navigate = useNavigate()
  const getBundleDiscountList = async (query: string, page: number) => {
    try {
      setIsLoading(true)
      const res = await axiosPrivate.get(getEndpointUrl(apiEndpoints.bundleDiscount, { page_size: pageSize, page: page, query: query }))
      setIsLoading(false)
      setBundleDiscountList(res.data.results)
      setDataCount(res.data.count)
    } catch (error) {
      toast.error('something went wrong!')
      setIsLoading(false)
    }
  }

  const getBundleDiscountById = async (id: string) => {
    try {
      setIsLoadedItem(true)
      const res = await axiosPrivate.get(getEndpointUrl(apiEndpoints.bundleDiscountByID, { id: id }))
      setBundleDiscount(res.data)
      setIsLoadedItem(false)
    } catch (error) {
      toast.error('something went wrong!')
      setIsLoading(false)
    }
  }

  const deleteBundleDiscount = async (id: string) => {
    try {
      setIsDeleted(true)
      const res = await axiosPrivate.delete(getEndpointUrl(apiEndpoints.bundleDiscountByID, { id: id }))
      setIsDeleted(false)
      if (res.status === 204) {
        toast.success('Deleted successfully')
        navigate('/bundle-discounts')
      }
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  const updateAndCreateBundleDiscount = async (action: string, values: any, id: string, setSubmitting: (isSubmitting: boolean) => void) => {
    if (action === 'edit') {
      try {
        const changedFields: any = {}
        for (const key in values) {
          if (values[key] !== bundleDiscount[key]) {
            if (key === 'sales_items_data' && values[key]) {
              changedFields[key] = values[key].map((value: { id: number; name: string }) => value.id)
            } else {
              changedFields[key] = values[key]
            }
          }
        }
        const res = await axiosPrivate.patch(getEndpointUrl(apiEndpoints.bundleDiscountByID, { id: id }), changedFields)
        setSubmitting(false)
        if (res.status === 200) {
          toast.success('Updated successfully')
          navigate('/bundle-discounts')
        }
      } catch (error) {
        toast.error('something went wrong')
        setSubmitting(false)
      }
    } else {
      try {
        const res = await axiosPrivate.post(getEndpointUrl(apiEndpoints.bundleDiscount), { ...values, bubble_id: generateRandomAlphaNumeric(30) })
        console.log(res.data)
        if (res.status === 201) {
          toast.success('Created successfully')
          navigate('/bundle-discounts')
        }
        setSubmitting(false)
      } catch (error) {
        toast.error('something went wrong')
        setSubmitting(false)
      }
    }
  }

  useEffect(() => {
    getBundleDiscountList(searchQuery, page)
  }, [page, searchQuery])

  useEffect(() => {
    getBundleDiscountList(searchQuery, 1)
  }, [pageSize])

  return {
    bundleDiscountList,
    bundleDiscount,
    dataCount,
    page,
    pageSize,
    setPageSize,
    setPage,
    setIsLoading,
    isLoading,
    isLoadedItem,
    setSearchQuery,
    getBundleDiscountById,
    updateAndCreateBundleDiscount,
    deleteBundleDiscount,
    getBundleDiscountList,
    isDeleted
  }
}
