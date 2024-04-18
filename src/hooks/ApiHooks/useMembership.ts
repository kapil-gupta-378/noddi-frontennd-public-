import { useEffect, useState } from 'react'
import { getEndpointUrl } from '../../helper'
import { constants } from '../../constant'
import useAxiosPrivate from '../../adapters/xhr/axiosPrivate'
import { MembershipInfo } from '../../interfaces'
import { useNavigate } from 'react-router-dom'
import { AxiosError, AxiosResponse } from 'axios'
import { toast } from 'react-hot-toast'

interface MembershipCreateParams {
  name: string
  image: Blob
  auth_code: string
  user_groups: number[]
}

export interface MembershipDiscount {
  description: string
  discount_percentage: string
  discount_price: null
  id: string
  included_SalesItems: string[]
  included_services: string[]
  membership_program: string
  name: string
}

export interface DiscountProps {
  description: string
  discount_percentage: string
  discount_price: string
  id: string
  included_SalesItems: number[]
  included_SalesItems_name: string[]
  included_services: number[]
  included_services_name: string[]
  membership_program: number
  membership_program_name: string
  name: string
}

export const useMemberships = () => {
  const [Memberships, setMemberships] = useState<MembershipInfo[]>([])
  const [oneMembership, setOneMemberships] = useState<MembershipInfo>({} as MembershipInfo)
  const [membershipDiscount, setMembershipDiscount] = useState<MembershipDiscount[]>([])
  const [allDiscountList, setAllDiscountList] = useState<DiscountProps[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleted, setIsDeleted] = useState(false)
  const [dataCount, setDataCount] = useState<number>(0)
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const navigate = useNavigate()
  const { apiEndpoints } = constants

  const axiosPrivate = useAxiosPrivate()

  const getMemberships = async (page: number) => {
    setIsLoading(true)
    const getMembershipsUrl: string = getEndpointUrl(apiEndpoints.getMemberships, { page_size: pageSize, page: page })

    await axiosPrivate
      .get(getMembershipsUrl)
      .then((values: any) => {
        setDataCount(values.data.count)
        setMemberships(values.data.results)
        setIsLoading(false)
      })
      .catch(() => {
        setIsLoading(false)
      })
  }

  // to create membership program
  const createMembershipProgramAsync = async (data: MembershipCreateParams | FormData) => {
    setIsLoading(true)
    const membershipProgramUri: string = getEndpointUrl(apiEndpoints.postMemberships)
    let response
    try {
      response = await axiosPrivate.post(membershipProgramUri, data, {
        headers: {
          'Content-Type': 'multipart/form-data;boundary=`---MyBoundaryIs123`'
        }
      })
      if (response.status === 201) {
        toast.success('Successfully Created!')
        navigate('/membership/programs')
      }
    } catch (error) {
      setIsLoading(false)
      toast.error('Something went wrong!')
      console.error('An error occurred')
      return error as AxiosError
    }
    setIsLoading(false)
    return response as AxiosResponse
  }

  // to get data of one membership program
  const fetchMembershipProgramById = async (id: string) => {
    setIsLoading(true)
    const getMembershipsByIdUrl: string = getEndpointUrl(apiEndpoints.getMembershipsById, { id: id })
    await axiosPrivate
      .get(getMembershipsByIdUrl)
      .then((values: any) => {
        setOneMemberships(values.data)
        setIsLoading(false)
      })
      .catch(() => {
        toast.error('Something went wrong!')
        setIsLoading(false)
      })
  }

  const updateMembershipProgramAsync = async (data: MembershipCreateParams | FormData, id: string) => {
    setIsLoading(true)
    const getMembershipsByIdUrl: string = getEndpointUrl(apiEndpoints.getMembershipsById, { id: id })
    await axiosPrivate
      .patch(getMembershipsByIdUrl, data, {
        headers: {
          'Content-Type': 'multipart/form-data;boundary=`---MyBoundaryIs123`'
        }
      })
      .then((values: any) => {
        setOneMemberships(values.data)
        toast.success('Updated Successfully!')
        setIsLoading(false)
      })
      .catch(() => {
        toast.error('Something went wrong!')
        setIsLoading(false)
      })
  }

  const deleteMemberShip = async (id: string) => {
    setIsDeleted(true)
    const getMembershipsByIdUrl: string = getEndpointUrl(apiEndpoints.getMembershipsById, { id: id })
    await axiosPrivate
      .delete(getMembershipsByIdUrl)
      .then((values: any) => {
        setOneMemberships(values.data)
        setIsDeleted(false)
        navigate('/membership/programs')
      })
      .catch(() => {
        setIsDeleted(false)
      })
  }

  const getMembershipBySearch = async (query: string, page: number) => {
    setIsLoading(true)
    const getMembershipListBySearchAndPageURL = getEndpointUrl(apiEndpoints.getMembershipProgramBySearch, { page: page, query: query })
    const res = await axiosPrivate.get(getMembershipListBySearchAndPageURL)
    setMemberships(res?.data?.results)
    setDataCount(res?.data?.count)
    setIsLoading(false)
  }

  const getMemberShipDiscount = async (id: string) => {
    try {
      const res = await axiosPrivate.get(getEndpointUrl(apiEndpoints.getMembershipsDiscount, { id: id }))
      setMembershipDiscount(res.data)
    } catch (error) {
      console.log('An error occurred')
    }
  }

  const addMembershipDiscountInMembershipProgram = async (value: { membership_program_id: number; discount_id: string }) => {
    try {
      const res = await axiosPrivate.post(getEndpointUrl(apiEndpoints.addMembershipDiscountInMembershipProgram), value)
    } catch (error) {
      console.log('An error occurred')
    }
  }

  const getDiscountList = async (query: string) => {
    try {
      const res = await axiosPrivate.get(getEndpointUrl(apiEndpoints.getAllDiscounts, { page_size: pageSize, page: page, query: query }))
      setAllDiscountList(res.data.results)
    } catch (error) {
      console.log('An error occurred')
    }
  }

  useEffect(() => {
    getDiscountList('')
    getMemberships(page)
  }, [page])

  useEffect(() => {
    getMemberships(1)
  }, [pageSize])

  return {
    Memberships,
    isLoading,
    dataCount,
    page,
    setPage,
    pageSize,
    setPageSize,
    createMembershipProgramAsync,
    oneMembership,
    fetchMembershipProgramById,
    updateMembershipProgramAsync,
    deleteMemberShip,
    getMembershipBySearch,
    getMemberShipDiscount,
    membershipDiscount,
    allDiscountList,
    getDiscountList,
    addMembershipDiscountInMembershipProgram,
    isDeleted
  }
}
