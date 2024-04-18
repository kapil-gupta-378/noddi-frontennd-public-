import { useEffect, useState } from 'react'
import { constants } from '../../constant'
import useApiRequest from './useApiRequest'
import moment from 'moment'
import { CapacityContributions } from './interfaces'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export const useCapacityContribution = () => {
  const [capacityContributionList, setCapacityContribution] = useState<CapacityContributions[]>()
  const [singleCapacityContribution, setSingleCapacityContribution] = useState<CapacityContributions>({} as CapacityContributions)
  const [dataCount, setDataCount] = useState<number>(0)
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [filterValue, setFilterValue] = useState<any>({ search: '', start_date: moment().toDate(), end_date: moment().toDate() })
  const { getRequest, isLoading, patchRequest } = useApiRequest()
  const [capacitySingleLoading, setCapacitySingleLoading] = useState<boolean>(true)
  const { apiEndpoints } = constants

  const navigate = useNavigate()

  const getCapacityContributionList = async (page: number, filterValue: any) => {
    try {
      const params = {
        page_size: pageSize,
        page: page,
        search: filterValue.search ? filterValue.search : '',
        start_date: moment(filterValue.start_date).format('YYYY-MM-DD'),
        end_date: moment(filterValue.end_date).format('YYYY-MM-DD')
      }
      const response = await getRequest(apiEndpoints.getCapacityContributionList, params)
      console.log(response?.data.results)

      setCapacityContribution(response?.data?.results)
      setDataCount(response?.data.count)
    } catch (error) {
      console.error('An error occurred')
    }
  }

  const updateCapacityContribution = async (data: any, id: string) => {
    try {
      const res = await patchRequest(apiEndpoints.updateCapacityContribution, data, id)
      if (res?.status === 200) {
        toast.success('Successfully updated!')
        navigate(`/capacity-contribution/${res.data.id}`, { state: { data: res.data } })
      }
    } catch (error) {
      toast.error('Something went wrong!')
      console.log(error)
    }
  }

  const getSingleCapacityContribution = async (id: string) => {
    try {
      setCapacitySingleLoading(true)
      const res = await getRequest(apiEndpoints.updateCapacityContribution, { id })
      if (res?.status === 200) {
        setSingleCapacityContribution(res?.data)
        setCapacitySingleLoading(false)
      }
    } catch (error) {
      setCapacitySingleLoading(false)
      console.log(error)
    }
  }

  useEffect(() => {
    getCapacityContributionList(page, filterValue)
  }, [page, filterValue, pageSize])

  return {
    capacityContributionList,
    isLoading,
    dataCount,
    page,
    setPage,
    pageSize,
    setPageSize,
    setFilterValue,
    filterValue,
    updateCapacityContribution,
    singleCapacityContribution,
    getSingleCapacityContribution,
    capacitySingleLoading
  }
}
