import { useEffect, useState } from 'react'
import useAxiosPrivate from '../../adapters/xhr/axiosPrivate'
import { constants } from '../../constant'
import { getEndpointUrl } from '../../helper'
import { ServiceNotificationAreaProps } from '../../pages/ServiceAreaNotifications/interface'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export const useServiceAreaNotifications = () => {
  const [serviceAreaNotificationList, setServiceAreaNotificationList] = useState<ServiceNotificationAreaProps[]>([])
  const [serviceAreaNotificationData, setServiceAreaNotificationData] = useState<ServiceNotificationAreaProps>({} as ServiceNotificationAreaProps)
  const [dataCount, setDataCount] = useState<number>(0)
  const [page, setPage] = useState<number>(1)
  const [isLoading, setIsLoading] = useState(false)
  const [pageSize, setPageSize] = useState<number>(10)
  const [searhQuery, setSearhQuery] = useState<string>('')
  const [isLoadedItem, setIsLoadedItem] = useState(false)
  const [isDeleted, setIsDeleted] = useState<boolean>(true)

  const axiosPrivate = useAxiosPrivate()
  const { apiEndpoints } = constants
  const navigate = useNavigate()
  const getServiceAreaNotificationList = async (page: number, query: string) => {
    try {
      const getServiceAreaNotificationUrl = getEndpointUrl(apiEndpoints.getServiceAreaNotification, { page_size: pageSize, page: page, query: query })
      setIsLoading(true)
      const res = await axiosPrivate.get(getServiceAreaNotificationUrl)
      setIsLoading(false)
      setServiceAreaNotificationList(res.data.results)
      setDataCount(res.data.count)
    } catch (error) {
      toast.error('something went wrong!')
      setIsLoading(false)
    }
  }

  const getServiceAreaNotificationById = async (id: string) => {
    try {
      const getServiceAreaNotificationByIdUrl = getEndpointUrl(apiEndpoints.getServiceAreaNotificationById, { id: id })
      setIsLoadedItem(true)
      const res = await axiosPrivate.get(getServiceAreaNotificationByIdUrl)
      setServiceAreaNotificationData(res.data)
      setIsLoadedItem(false)
    } catch (error) {
      toast.error('something went wrong!')
      setIsLoading(false)
    }
  }

  const deleteServiceAreaNotification = async (id: string) => {
    try {
      setIsDeleted(true)
      const res = await axiosPrivate.delete(getEndpointUrl(apiEndpoints.getServiceAreaNotificationById, { id: id }))
      setIsDeleted(false)
      if (res.status === 204) {
        toast.success('Deleted successfully')
        navigate('/service-area-notifications')
      }
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  const updateAndCreateServiceAreaNotification = async (action: string, values: any, id: string, setSubmitting: (isSubmitting: boolean) => void) => {
    if (action === 'edit') {
      try {
        const changedFields: any = {}
        for (const key in values) {
          if (values[key] !== serviceAreaNotificationData[key]) {
            changedFields[key] = values[key]
          }
        }
        const res = await axiosPrivate.patch(getEndpointUrl(apiEndpoints.getServiceAreaNotificationById, { id: id }), changedFields)
        setSubmitting(false)
        if (res.status === 200) {
          toast.success('Updated successfully')
          navigate('/service-area-notifications')
        }
      } catch (error) {
        toast.error('something went wrong')
        setSubmitting(false)
      }
    } else {
      try {
        const res = await axiosPrivate.post(getEndpointUrl(apiEndpoints.createServiceAreaNotification), values)
        console.log(res.data)
        if (res.status === 201) {
          toast.success('Created successfully')
          navigate('/service-area-notifications')
        }
        setSubmitting(false)
      } catch (error) {
        toast.error('something went wrong')
        setSubmitting(false)
      }
    }
  }

  useEffect(() => {
    getServiceAreaNotificationList(page, searhQuery)
  }, [page, searhQuery])

  useEffect(() => {
    getServiceAreaNotificationList(1, searhQuery)
  }, [pageSize])

  return {
    serviceAreaNotificationList,
    serviceAreaNotificationData,
    dataCount,
    page,
    pageSize,
    setPageSize,
    setPage,
    setIsLoading,
    isLoading,
    isLoadedItem,
    setSearhQuery,
    getServiceAreaNotificationById,
    updateAndCreateServiceAreaNotification,
    deleteServiceAreaNotification,
    isDeleted
  }
}
