import { useState } from 'react'
import { LicenseAreasProps } from '../../pages/RoutePlanning/interface'
import useApiRequest from './useApiRequest'
import { constants } from '../../constant'
import { RouteProblemsProps, RouteProps, RouteSolution, SingleRouteSolutionProps } from '../../pages/Routes/interface'

export const useRoutes = () => {
  const [licenseAreas, setLicenseAreas] = useState<LicenseAreasProps[]>([])
  const [routeProblems, setRouteProblems] = useState<RouteProblemsProps>({} as RouteProblemsProps)
  const [routeSolutions, setRouteSolutions] = useState<RouteSolution>({} as RouteSolution)
  const [solutionData, setRouteSolutionData] = useState<SingleRouteSolutionProps>({} as SingleRouteSolutionProps)
  const [routes, setRoutes] = useState<RouteProps>({} as RouteProps)

  const { apiEndpoints } = constants
  const { getRequest, isLoading } = useApiRequest()

  const getLicenseAreas = async () => {
    try {
      const res = await getRequest(apiEndpoints.getLicenseAreasNames)
      if (res?.status === 200) setLicenseAreas(res?.data)
    } catch (error) {
      console.error(error)
    }
  }

  const getRouteProblems = async (date: Date | null, licenseArea: string, page: number, pageSize: number) => {
    try {
      const res = await getRequest(apiEndpoints.getRouteProblems, { date: new Date(date as Date).toISOString().slice(0, 10), licenseArea, page, pageSize })
      setRouteProblems(res?.data)
    } catch (error) {
      console.error(error)
    }
  }

  const getRouteSolutionById = async (routeProblemId: string) => {
    try {
      const res = await getRequest(apiEndpoints.getRouteSolutionsById, { routeProblemId })
      setRouteSolutions(res?.data)
    } catch (error) {
      console.error(error)
    }
  }

  const getRoutes = async (page: number, pageSize: number) => {
    try {
      const res = await getRequest(apiEndpoints.getRoutes, { page, page_size: pageSize })
      setRoutes(res?.data)
    } catch (error) {
      console.error(error)
    }
  }
  const getRoutesById = async (routeId: string) => {
    try {
      const res = await getRequest(apiEndpoints.getRoutesById, { routeId })
      setRouteSolutions(res?.data)
    } catch (error) {
      console.error(error)
    }
  }

  const getSingleRouteSolution = async (solutionId: number | string, page: number, pageSize: number) => {
    try {
      const res = await getRequest(apiEndpoints.getSolutionById, { solutionId, page: page, page_size: pageSize })
      if (res?.status === 200) {
        setRouteSolutionData(res.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return {
    licenseAreas,
    getLicenseAreas,
    getRouteProblems,
    routeProblems,
    isLoading,
    routeSolutions,
    getRouteSolutionById,
    getRoutes,
    getRoutesById,
    routes,
    getSingleRouteSolution,
    solutionData
  }
}
