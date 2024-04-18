import { useEffect, useState } from 'react'
import { constants } from '../../constant'
import { BookingProps, LicenseAreasProps, ContributorProps } from '../../pages/RoutePlanning/interface'
import moment from 'moment/moment'
import useApiRequest from './useApiRequest'
import { useLocation, useNavigate } from 'react-router-dom'

export const useRoutePlanner = () => {
  const [licenseAreas, setLicenseAreas] = useState<LicenseAreasProps[]>([])
  const [bookings, setBookings] = useState<BookingProps[]>([])
  const [capacityContributions, setCapacityContributions] = useState<any>([])
  const [date, setDate] = useState<Date>(moment(new Date()).add(1, 'days').toDate())
  const [selectedLicenseArea, setSelectedLicenseArea] = useState<string>('')
  const [executionTime, setExecutionTime] = useState<number>(5)
  const [minNumWorkers, setMinNumWorkers] = useState<number>(1)
  const [contributors, setContributors] = useState<ContributorProps[]>([])

  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)

  const navigate = useNavigate()
  const { getRequest, postRequest, isLoading } = useApiRequest()
  const { apiEndpoints } = constants

  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)

  const getLicenseAreas = async () => {
    try {
      const res = await getRequest(apiEndpoints.getLicenseAreasNames)
      if (res?.status === 200) {
        setLicenseAreas(res?.data)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const getBookingsForRoutePlanner = async (date: Date, license_area: number | string) => {
    try {
      const params = {
        date: moment(date).format('YYYY-MM-DD'),
        license_area: license_area
      }
      const res = await getRequest(apiEndpoints.routePlannerBookings, params)
      setBookings(res?.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getContributorForRoutePlanner = async (date: Date, license_area: number | string, page: number, pageSize: number) => {
    try {
      const params = {
        date: moment(date).format('YYYY-MM-DD'),
        license_area: license_area,
        page: page,
        page_size: pageSize
      }
      const res = await getRequest(apiEndpoints.getContributorForRoutePlanner, params)
      setContributors(res?.data.results)
    } catch (error) {
      console.log(error)
    }
  }

  const startRoutePlanner = async (date, licenseArea, executionTime, minNumWorkers, isCapacityPlanning) => {
    try {
      const params = {
        date: moment(date).format('YYYY-MM-DD'),
        license_area: licenseArea,
        execution_time: executionTime,
        min_num_workers: minNumWorkers,
        is_capacity_planning: isCapacityPlanning
      }
      const res = await postRequest(apiEndpoints.startRoutePlanner, params)
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const disableButtons = () => {
    return !date || !selectedLicenseArea || !executionTime || !minNumWorkers
  }

  useEffect(() => {
    getLicenseAreas()
  }, [])

  useEffect(() => {
    setDate(new Date(searchParams.get('date') as string))
    setSelectedLicenseArea(searchParams.get('license-area') as string)
  }, [])

  useEffect(() => {
    if (date && selectedLicenseArea) {
      navigate(`/route-planning/?date=${moment(date).toISOString().slice(0, 10)}&license-area=${selectedLicenseArea}`)
      getBookingsForRoutePlanner(date, selectedLicenseArea)
    }
  }, [date, selectedLicenseArea])

  useEffect(() => {
    if (date && selectedLicenseArea) {
      getContributorForRoutePlanner(date, selectedLicenseArea, page, pageSize)
    }
  }, [date, selectedLicenseArea, page, pageSize])

  return {
    date,
    setDate,
    selectedLicenseArea,
    setSelectedLicenseArea,
    executionTime,
    setExecutionTime,
    minNumWorkers,
    setMinNumWorkers,
    licenseAreas,
    bookings,
    capacityContributions,
    disableButtons,
    startRoutePlanner,
    contributors,
    setPage,
    setPageSize,
    page,
    pageSize,
    isLoading
  }
}
