import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'
import SEO from '../../components/SEO'
import Container from '@mui/material/Container'
import NoddiBreadcrumb from '../../components/Breadcrumb'
import { userGroupTabs } from '../../utils/tabsColumns'
import { useNavigate, useParams } from 'react-router-dom'
import { constants } from '../../constant'
import { getEndpointUrl } from '../../helper'
import useAxiosPrivate from '../../adapters/xhr/axiosPrivate'
import Tabs from '@mui/material/Tabs'
import { Box, Tab, Stack, Divider } from '@mui/material'
import { GroupInfo } from '../../interfaces'
import CarsTab from './CarsTab'
import { MembersTab } from './MemberTab'
import BookingTab from './BookingTab'
import { AllTabs, RewardAccountData } from './interface'
import RewardAccount from './RewardAccountTab'
import MembershipProgramDetailTab from '../MembershipProgramDetailTab'
import useApiRequest from '../../hooks/ApiHooks/useApiRequest'
import { toast } from 'react-hot-toast'

const GroupProfile = () => {
  const [userGroupInfo, setUserGroupInfo] = useState<GroupInfo>({} as GroupInfo)
  const [rewardAccountData, setRewardAccountData] = useState<RewardAccountData>({ account: {}, withdrawalRewards: [], depositRewards: [] })
  const { apiEndpoints } = constants
  const axiosPrivate = useAxiosPrivate()
  const params = useParams()
  const { id, tab } = params
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [currentTab, setCurrentTab] = useState<string>(tab || 'members')
  // state for Deposit
  const [dataCountDeposite, setDataCountDeposite] = useState<number>(0)
  const [pageDeposite, setPageDeposite] = useState<number>(1)
  const [pageSizeDeposite, setPageSizeDeposite] = useState<number>(10)
  const [isLoadingDeposit, setIsLoadingDeposit] = useState<boolean>(false)

  // state for withdraw
  const [dataCountWithdraw, setDataCountWithdraw] = useState<number>(0)
  const [pageWithdraw, setPageWithdraw] = useState<number>(1)
  const [pageSizeWithdraw, setPageSizeWithdraw] = useState<number>(10)
  const [isLoadingWithdraw, setIsLoadingWithdraw] = useState<boolean>(false)

  const { isLoading: rewardLoading, getRequest } = useApiRequest()
  const navigate = useNavigate()

  const getGroupProfileById = async () => {
    try {
      setIsLoading(true)
      const groupMembersById: string = getEndpointUrl(apiEndpoints.getGroupMembersById, { groupId: id })
      const groupMembersResponse = axiosPrivate.get(groupMembersById)
      const [groupMembersResponseData] = await Promise.all([groupMembersResponse])
      setUserGroupInfo(groupMembersResponseData.data)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
    }
  }

  const userGroupBasicInfo = () =>
    getRequest(apiEndpoints.getUserGroupById, { id: id })
      .then((res) => {
        if (!res?.data) {
          toast.error('User group not found')
          navigate('/user-groups')
        }
      })
      .catch(() => {
        console.error('An error occurred')
      })

  const gerRewardAccountDetails = async () => {
    try {
      setIsLoadingWithdraw(true)
      setIsLoadingDeposit(true)
      const rewardAccountResponse = await getRequest(apiEndpoints.getUserGroupRewardAccount, { id: id })
      const withdrawalRewardsResponsePromise = getRequest(apiEndpoints.getGroupWithdrawalRewards, { id: rewardAccountResponse?.data?.results[0]?.id, page_size: pageSizeWithdraw, page: pageWithdraw })
      const depositRewardsResponsePromise = getRequest(apiEndpoints.getGroupDepositRewards, { id: rewardAccountResponse?.data?.results[0]?.id, page_size: pageSizeDeposite, page: pageDeposite })
      const [withdrawalRewardsResponse, depositRewardsResponse] = await Promise.all([withdrawalRewardsResponsePromise, depositRewardsResponsePromise])
      setRewardAccountData({
        account: rewardAccountResponse?.data[0] || {},
        withdrawalRewards: withdrawalRewardsResponse?.data.results || [],
        depositRewards: depositRewardsResponse?.data.results || []
      })
      setDataCountWithdraw(22 || withdrawalRewardsResponse?.data?.count)
      setDataCountDeposite(22 || depositRewardsResponse?.data.count)
      setIsLoadingWithdraw(false)
      setIsLoadingDeposit(false)
    } catch (error) {
      setIsLoadingWithdraw(false)
      setIsLoadingDeposit(false)
      console.error('An error occurred')
    }
  }

  const gerRewardWithdrawTableData = async (page: number) => {
    setIsLoadingWithdraw(true)
    if (!rewardAccountData?.account?.id) {
      setIsLoadingWithdraw(false)
      return
    }
    try {
      const withdrawalRewardsResponsePromise = await getRequest(apiEndpoints.getGroupWithdrawalRewards, { id: rewardAccountData?.account?.id, page_size: pageSizeWithdraw, page: page })
      setRewardAccountData((prevState) => ({ ...prevState, withdrawalRewards: withdrawalRewardsResponsePromise?.data.results || [] }))
      setIsLoadingWithdraw(false)
    } catch (error) {
      console.error('An error occurred')
      setIsLoadingWithdraw(false)
    }
  }

  const gerRewardDepositTableData = async (page: number) => {
    setIsLoadingDeposit(true)
    if (!rewardAccountData?.account?.id) {
      setIsLoadingDeposit(false)
      return
    }
    try {
      const depositRewardsResponsePromise = await getRequest(apiEndpoints.getGroupDepositRewards, { id: rewardAccountData?.account?.id, page_size: pageSizeDeposite, page: page })
      setRewardAccountData((prevState) => ({ ...prevState, depositRewards: depositRewardsResponsePromise?.data.results || [] }))
      setIsLoadingDeposit(false)
    } catch (error) {
      setIsLoadingDeposit(false)
      console.error('An error occurred')
    }
  }

  useEffect(() => {
    gerRewardDepositTableData(1)
  }, [pageSizeDeposite])

  useEffect(() => {
    gerRewardWithdrawTableData(1)
  }, [pageSizeWithdraw])

  useEffect(() => {
    gerRewardDepositTableData(pageDeposite)
  }, [pageDeposite])

  useEffect(() => {
    gerRewardWithdrawTableData(pageWithdraw)
  }, [pageWithdraw])

  useEffect(() => {
    if (currentTab === 'reward-account') {
      userGroupBasicInfo()
      gerRewardAccountDetails()
    }
  }, [currentTab])

  useEffect(() => {
    getGroupProfileById()
  }, [])

  useEffect(() => {
    if (tab) setCurrentTab(tab)
  }, [tab])

  const handleTabsChange = useCallback((_: ChangeEvent<any>, value: string): void => {
    navigate(`/user-groups/${id}/${value}`)
  }, [])

  const AllTabs: AllTabs = {
    members: <MembersTab members={userGroupInfo.users ? userGroupInfo.users : []} isLoading={isLoading} refetchDataHandler={getGroupProfileById} groupId={id} />,
    bookings: <BookingTab />,
    cars: <CarsTab />,
    'reward-account': (
      <RewardAccount
        isLoading={rewardLoading.getLoading}
        data={rewardAccountData}
        groupId={id}
        dataCountDeposite={dataCountDeposite}
        dataCountWithdraw={dataCountWithdraw}
        pageDeposite={pageDeposite}
        pageWithdraw={pageWithdraw}
        setPageSizeDeposite={setPageSizeDeposite}
        setPageSizeWithdraw={setPageSizeWithdraw}
        setPageDeposite={setPageDeposite}
        setPageWithdraw={setPageWithdraw}
        pageSizeDeposite={pageSizeDeposite}
        pageSizeWithdraw={pageSizeWithdraw}
        isLoadingDeposit={isLoadingDeposit}
        isLoadingWithdraw={isLoadingWithdraw}
      />
    ),
    'membership-program': <MembershipProgramDetailTab />
  }

  return (
    <>
      <SEO title={'Profile'} />
      <Container>
        <NoddiBreadcrumb
          items={[
            {
              title: 'User Groups',
              path: '/user-groups'
            },
            {
              title: !isLoading ? userGroupInfo.name || '' : 'Loading...',
              path: `/user-groups/${id}`
            }
          ]}
        />
        <Box
          component='main'
          sx={{
            flexGrow: 1
          }}
        >
          <Stack spacing={3} sx={{ mb: 3 }}>
            <div>
              <Tabs indicatorColor='primary' onChange={handleTabsChange} scrollButtons='auto' textColor='primary' value={currentTab} variant='scrollable'>
                {userGroupTabs.map((tab) => (
                  <Tab key={tab.name} label={tab.label} value={tab.name} />
                ))}
              </Tabs>
              <Divider />
            </div>
          </Stack>
          <Stack>{AllTabs[currentTab]}</Stack>
        </Box>
      </Container>
    </>
  )
}

export default GroupProfile
