import { useEffect, useState } from 'react'
import { getEndpointUrl } from '../../helper'
import { constants } from '../../constant'
import useAxiosPrivate from '../../adapters/xhr/axiosPrivate'
import { MembershipInfo } from '../../interfaces'
import { toast } from 'react-hot-toast'

interface MembershipCreateParams {
  name: string
  image: Blob
  auth_code: string
  user_groups: number[]
}
export const useGroups = (id?: number) => {
  const [Groups, setGroups] = useState<MembershipInfo[]>([])
  const [oneMembership, setOneGroups] = useState<MembershipInfo>({} as MembershipInfo)
  const [isLoading, setIsLoading] = useState(false)
  const [dataCount, setDataCount] = useState<number>(0)
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)

  const { apiEndpoints } = constants

  const axiosPrivate = useAxiosPrivate()

  const getGroups = async (page: number, searchKeyword = '') => {
    setIsLoading(true)
    const getGroupsUrl: string = getEndpointUrl(apiEndpoints.getUserGroups, { page: page, search: searchKeyword })

    await axiosPrivate
      .get(getGroupsUrl)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((values: any) => {
        setDataCount(values.data.count)
        setGroups(values.data.results)
        setIsLoading(false)
      })
      .catch(() => {
        setIsLoading(false)
      })
  }
  // to create group
  const createGroupAsync = async (data: MembershipCreateParams) => {
    setIsLoading(true)
    const groupUri: string = getEndpointUrl(apiEndpoints.createMembershipProgram)
    await axiosPrivate.post(groupUri, data).catch(() => console.error('An error occurred'))
  }

  // to get data of one group
  const fetchGroupById = async (id: number) => {
    setIsLoading(true)
    const getGroupsByIdUrl: string = getEndpointUrl(apiEndpoints.getGroupMembersById, { groupId: id })
    await axiosPrivate
      .get(getGroupsByIdUrl)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((values: any) => {
        setOneGroups(values.data)
        setIsLoading(false)
      })
      .catch(() => {
        setIsLoading(false)
      })
  }

  const getBookingMsgHandler = async (id: string) => {
    try {
      setIsLoading(true);
      const res = await axiosPrivate.get(getEndpointUrl(apiEndpoints.getBookingMessageHandler, { id: id }))
      if(res.status === 200){
        setIsLoading(false)
      }
      return res.data
    } catch (error) {
      setIsLoading(false)
      toast.error('Something went wrong')
    }
  }

  useEffect(() => {
    if (id) {
      fetchGroupById(id)
      return
    }
    getGroups(page)
  }, [page])

  return { Groups, isLoading, dataCount, page, setPage, pageSize, setPageSize, createGroupAsync, oneMembership, getGroups, getBookingMsgHandler }
}
