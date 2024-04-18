import { Card, CardHeader, Divider, Typography, useMediaQuery } from '@mui/material'
import { Stack, Theme } from '@mui/system'
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { PropertyList } from '../../components/commons/PropertyList/index.js'
import { PropertyListItem } from '../../components/commons/PropertyListItem'
import { RawTable } from '../../components/Table/BaseTable'
import moment from 'moment'
import { SeverityPill } from '../../components/severity-pill'
import { ReferralTabData, ReferredMemberData } from './interfaces'
import { constants, rewardStatusList } from '../../constant/index'
import useApiRequest from '../../hooks/ApiHooks/useApiRequest'
import { useParams } from 'react-router-dom'

const ReferralsTab: FC<{ userId: number }> = ({ userId }) => {
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))
  const { getRequest, isLoading: apiLoadings } = useApiRequest()
  const { apiEndpoints } = constants
  const [referralTabData, setReferralTabData] = useState<ReferralTabData>({ referral: [] })
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const params = useParams()
  const [dataCount, setDataCount] = useState<number>(0)
  const getReferralData = useCallback(async () => {
    try {
      const userReferral = await getRequest(apiEndpoints.userReferral, { id: params.id })
      const referredByUserName = await getRequest(apiEndpoints.getReferredByUserName, { id: params.id })
      setReferralTabData({ ...userReferral?.data, ...referredByUserName?.data, referral: [] })
    } catch (err) {
      console.error('An error occurred')
    }
  }, [])

  const getRewardTableData = async (page: number) => {
    try {
      const userReward = await getRequest(apiEndpoints.getReferredByUser, { id: params.id, page_size: pageSize, page: page })
      const userPendingReward = await getRequest(apiEndpoints.getReferredPendingByUser, { id: params.id, page_size: pageSize, page: page })
      setReferralTabData((prev) => ({ ...prev, referral: [...userPendingReward?.data.results, ...userReward?.data.results] }))
      setDataCount((userPendingReward?.data.count || 0) + (userReward?.data.count || 0))
    } catch (err) {
      console.error('An error occurred')
    }
  }

  const generateTableRow = useMemo(() => {
    const row = referralTabData?.referral.map((item: ReferredMemberData) => {
      return {
        name: () => item?.user?.user_name || '',
        date: () => (item?.created_at ? moment(item?.created_at).format('DD/MM/YYYY') : ''),
        bookingId: () => item?.booking?.booking_id || '',
        status: () =>
          rewardStatusList[item.reason]?.label === 'Referral bonus - Pending' ? <SeverityPill color={'warning'}>Pending</SeverityPill> : <SeverityPill color={'success'}>Complete</SeverityPill>
      }
    })
    return row
  }, [referralTabData?.referral])

  useEffect(() => {
    getReferralData()
    getRewardTableData(page)
  }, [page])

  useEffect(() => {
    getRewardTableData(1)
  }, [pageSize])

  const align = mdUp ? 'horizontal' : 'vertical'

  return (
    <Stack spacing={5}>
      <Card>
        <CardHeader title='Referral info' />
        <Divider sx={{ opacity: 'unset' }} />
        <PropertyList>
          <PropertyListItem align={align} label='Referral code'>
            <Typography color='text.secondary' variant='subtitle2'>
              {referralTabData?.referral_code}
            </Typography>
          </PropertyListItem>
          <Divider sx={{ opacity: 'unset' }} />
          <PropertyListItem align={align} label='Referred by'>
            <Typography color='text.secondary' variant='subtitle2'>
              {`${referralTabData?.first_name || ''} ${referralTabData?.last_name || ''} ${!referralTabData?.last_name || !referralTabData?.first_name ? 'No referring user found' : ''}`}
            </Typography>
          </PropertyListItem>
          <Divider sx={{ opacity: 'unset' }} />
        </PropertyList>
      </Card>
      <Card>
        <CardHeader title='Referred Members' />
        <RawTable
          height='300px'
          minWidth='1152px'
          headers={['User', 'Date', 'Booking Id', 'Status']}
          // handleOnClickTableRow={() => false}
          entries={generateTableRow || []}
          count={dataCount}
          isLoading={apiLoadings.getLoading}
          onRowsPerPageChangeCallback={(e) => setPageSize(e.target.value)}
          page={page}
          pageChangeCallback={(e, newPage) => setPage(newPage)}
          rowsPerPage={pageSize}
          rowsPerPageOptions={[10, 20, 50]}
          baseUrl=''
          isLink={false}
        />
      </Card>
    </Stack>
  )
}

export default ReferralsTab
