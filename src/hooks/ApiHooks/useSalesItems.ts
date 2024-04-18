import { useEffect, useState } from 'react'
import { constants } from '../../constant'
import useApiRequest from './useApiRequest'
import usePaginationAndQuery from './usePagination'
interface SalesDataType {
  name: string;
  description: string;
  price: string;
  currency: string;
  service_category: string;
  car_sizes: number[];
  bubble_id: string;
  is_active: boolean;
  vat_percentage: string;
  service_time: string;
  commission_payment: string;
  freelance_payment: string;
}
export const useSalesItems = (id?: number) => {
  const { apiEndpoints } = constants
  const [salesDataById, setSalesDataById] = useState({
    name: '',
    description: '',
    price: '',
    currency: '',
    is_active: '',
    service_category: { name: '', id: '' },
    car_sizes: [],
    commission_payment: '',
    freelance_payment: '',
    service_time: '',
    vat_percentage: ''
  });
  const [filters, setFilters] = useState({
    is_active: "",
    service_category: "",
  })

  const {
    getRequest,
    patchRequest,
    postRequest,
    isLoading: { getLoading }
  } = useApiRequest()

  const {
    nextPage,
    pageSize,
    page,
    prevPage,
    setPageSize,
    setPage,
    query,
    setQuery,
    data: salesItems,
    dataCount
  } = usePaginationAndQuery(1, 10, async (query: string) => {
    try {
      const params = {
        page_size: pageSize,
        page: page,
        search: query,
        ...filters
      }
      const res = await getRequest(apiEndpoints.getSalesItems, params)
      return res?.data
    } catch (error) {
      console.log('An error occurred')
    }
  }, filters)

  const getSalesItemsById = async () => {
    const res = await getRequest(apiEndpoints.getSalesItemById, { id: id });
    setSalesDataById(res?.data)
  }

  const createSalesItem = async (data: SalesDataType) => {
    const res = await postRequest(apiEndpoints.createSalesItem, data)
  }
  const updateSalesItem = async (data: SalesDataType, id: string) => {
    const res = await patchRequest(apiEndpoints.getSalesItemById, data, id)
  }

  useEffect(() => {
    if (id) {
      getSalesItemsById()
    }
  }, [id])


  return { salesItems, salesItemsLoading: getLoading, nextPage, pageSize, page, prevPage, setPageSize, setPage, setQuery, query, dataCount, filters, setFilters, salesDataById, createSalesItem, updateSalesItem }
}

