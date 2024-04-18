import { useEffect, useState } from 'react'
import useAxiosPrivate from '../../adapters/xhr/axiosPrivate'
import { constants } from '../../constant'
import { getEndpointUrl } from '../../helper'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { MembershipDiscountProps } from '../../pages/MembershipDiscount/interface'

export const useMembershipDiscount = () => {
  const [memberShipDiscountList, setMemberShipDiscountList] = useState<MembershipDiscountProps[]>([])
  const [memberShipDiscountData, setMemberShipDiscountData] = useState<MembershipDiscountProps>({} as MembershipDiscountProps)
  const [allMembershipList, setAllMembershipList] = useState<{ id: number; name: string }[]>([])
  const [allSalesItems, setAllSalesItems] = useState<{ id: number; name: string }[]>([])
  const [allServices, setAllServices] = useState<{ id: number; name: string }[]>([])
  const [dataCount, setDataCount] = useState<number>(0)
  const [page, setPage] = useState<number>(1)
  const [isLoading, setIsLoading] = useState(false)
  const [pageSize, setPageSize] = useState<number>(10)
  const [searhQuery, setSearhQuery] = useState<string>('')
  const [isLoadedItem, setIsLoadedItem] = useState(false)
  const [isDeleted, setIsDeleted] = useState<boolean>(false)

  const axiosPrivate = useAxiosPrivate()
  const { apiEndpoints } = constants
  const navigate = useNavigate()
  const getMemberShipDiscountList = async (page: number, query: string) => {
    try {
      setIsLoading(true)
      const res = await axiosPrivate.get(getEndpointUrl(apiEndpoints.getAllDiscounts, { page_size: pageSize, page: page, query: query }))
      setIsLoading(false)
      setMemberShipDiscountList(res.data.results)
      setDataCount(res.data.count)
    } catch (error) {
      toast.error('something went wrong!')
      setIsLoading(false)
    }
  }

  const getMemberShipDiscountById = async (id: string) => {
    try {
      setIsLoadedItem(true)
      const res = await axiosPrivate.get(getEndpointUrl(apiEndpoints.getMembershipDiscountById, { id: id }))

      setMemberShipDiscountData(res.data)
      setIsLoadedItem(false)
    } catch (error) {
      toast.error('something went wrong!')
      setIsLoading(false)
    }
  }

  const deleteMembershipDiscount = async (id: string) => {
    try {
      setIsDeleted(true)
      const res = await axiosPrivate.delete(getEndpointUrl(apiEndpoints.getMembershipDiscountById, { id: id }))
      setIsDeleted(false)
      if (res.status === 204) {
        toast.success('Deleted successfully')
        navigate('/membership-programs')
      }
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  const updateAndCreateMembershipDiscount = async (action: string, values: MembershipDiscountProps, id: string, setSubmitting: (isSubmitting: boolean) => void) => {
    try {
      if (action === 'edit') {
        const changedFields: any = {}
        for (const key in values) {
          if (values[key] !== memberShipDiscountData[key]) {
            changedFields[key] = values[key]
          }
        }

        const res = await axiosPrivate.patch(getEndpointUrl(apiEndpoints.getMembershipDiscountById, { id: id }), changedFields)
        setSubmitting(false)
        if (res.status === 200) {
          toast.success('Updated successfully')
        }
      } else {
        const res = await axiosPrivate.post(getEndpointUrl(apiEndpoints.addMembershipDiscountInMembershipProgram), values)
        if (res.status === 201) {
          toast.success('Created successfully')
          navigate(`/membership-programs/${values.membership_program}`)
        }
        setSubmitting(false)
      }
    } catch (error) {
      toast.error('something went wrong')
      setSubmitting(false)
    }
  }

  const getAllMemberships = async (query: string) => {
    try {
      const res = await axiosPrivate.get(getEndpointUrl(apiEndpoints.getMembershipProgramBySearchWithoutPage, { query: query }))
      //   setAllMembershipList((prev) => [...prev, res.data.results])
      setAllMembershipList(res.data.results)
    } catch (error) {
      console.log('An error occurred')
    }
  }

  const getAllSalesItems = async (query: string) => {
    try {
      const res = await axiosPrivate.get(getEndpointUrl(apiEndpoints.getSalesItemsBySearch, { query: query }))
      setAllSalesItems(res.data.results)
    } catch (error) {
      console.log('An error occurred')
    }
  }
  const getAllService = async (query: string) => {
    try {
      const res = await axiosPrivate.get(getEndpointUrl(apiEndpoints.getServicesBySearch, { query: query }))
      // setAllServices((prev) => [...prev, ...res.data.results])
      setAllServices(res.data.results)
    } catch (error) {
      console.log('An error occurred')
    }
  }

  useEffect(() => {
    getMemberShipDiscountList(page, searhQuery)
  }, [page, searhQuery])
  useEffect(() => {
    getMemberShipDiscountList(1, searhQuery)
  }, [pageSize])

  return {
    memberShipDiscountList,
    memberShipDiscountData,
    dataCount,
    page,
    pageSize,
    setPageSize,
    setPage,
    setIsLoading,
    isLoading,
    isLoadedItem,
    setSearhQuery,
    getMemberShipDiscountById,
    updateAndCreateMembershipDiscount: updateAndCreateMembershipDiscount,
    deleteMembershipDiscount,
    isDeleted,
    allMembershipList,
    allSalesItems,
    getAllMemberships,
    getAllSalesItems,
    getAllService,
    allServices
  }
}
