import { useEffect, useState } from 'react'
import { constants } from '../../constant'
import { ServiceInfo } from '../../interfaces'
import { CreateServiceParam, FilterValue } from './interfaces'
import useApiRequest from './useApiRequest'
export const useServices = (id?: number, initialFetch = true) => {
  const [services, setServices] = useState<ServiceInfo[]>([])
  const [oneService, setOneService] = useState<ServiceInfo>({} as ServiceInfo)
  const [dataCount, setDataCount] = useState<number>(0)
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [filterValue, setFilterValue] = useState<FilterValue>({} as FilterValue)
  const { getRequest, postRequest, putRequest, isLoading } = useApiRequest()

  const { apiEndpoints } = constants

  const getService = async (page: number, filterValue?: FilterValue) => {
    const params = {
      page_size: pageSize,
      page: page,
      search: filterValue?.name ? filterValue?.name : '',
      service_category: filterValue?.category ? filterValue?.category : '',
      is_active: filterValue?.status ? filterValue?.status : ''
    }
    const response = await getRequest(apiEndpoints.getServicesList, params)
    setDataCount(response?.data.count)
    setServices(response?.data?.results)
  }

  // to create service
  const createServiceAsync = async (data: CreateServiceParam) =>
    await postRequest(apiEndpoints.createService, data).then((res) => {
      if (id) fetchServiceById(id)
      return res
    })

  // to get data of one service
  const fetchServiceById = async (id: number | string) => {
    setOneService(
      await getRequest(apiEndpoints.getServiceById, {
        id: id
      }).then((res) => res?.data)
    )
  }

  // to edit service
  const editServiceAsync = async (data: CreateServiceParam, id: string) =>
    await putRequest(apiEndpoints.editService, data, id).then((res) => {
      if (id) fetchServiceById(id)
      return res
    })

  useEffect(() => {
    if (initialFetch) {
      if (id) {
        fetchServiceById(id)
        return
      }
      getService(page, filterValue)
    }
  }, [])

  useEffect(() => {
    getService(1, filterValue)
  }, [filterValue])

  useEffect(() => {
    getService(page, filterValue)
  }, [page])

  useEffect(() => {
    getService(1, filterValue)
  }, [pageSize])

  return { services, isLoading: isLoading.getLoading, dataCount, page, setPage, pageSize, setPageSize, setFilterValue, createServiceAsync, oneService, editServiceAsync }
}
