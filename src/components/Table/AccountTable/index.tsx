import React, { FC, useMemo } from 'react'
import { RawTable } from '../BaseTable'
import { Card, Grid, Link, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { Stack } from '@mui/system'
import { RewardAccountData } from '../../../pages/GroupProfile/interface'
import moment from 'moment'
import { SeverityPill } from '../../severity-pill'
import { rewardStatusList, statusList } from '../../../constant'
import { useNavigate } from 'react-router-dom'

interface RewardTableProps {
  data: RewardAccountData
  isLoading: boolean
  groupId: number
  dataCountDeposite: number
  dataCountWithdraw: number
  pageDeposite: number
  pageWithdraw: number
  setPageSizeDeposite: (count: number) => void
  setPageSizeWithdraw: (count: number) => void
  setPageDeposite: (page: number) => void
  setPageWithdraw: (page: number) => void
  pageSizeDeposite: number
  pageSizeWithdraw: number
  isLoadingDeposit: boolean
  isLoadingWithdraw: boolean
}
export const RewardTable: FC<RewardTableProps> = ({
  isLoading,
  data,
  dataCountDeposite,
  dataCountWithdraw,
  pageDeposite,
  pageWithdraw,
  setPageSizeDeposite,
  setPageSizeWithdraw,
  setPageDeposite,
  setPageWithdraw,
  pageSizeDeposite,
  pageSizeWithdraw,
  isLoadingDeposit,
  isLoadingWithdraw
}) => {
  const navigate = useNavigate()
  const navigateToUserGroup = (userId: number, bookingId: number) => {
    navigate(`/user-groups/${userId}/bookings/${bookingId}/details`)
  }

  const depositTableRow = useMemo(() => {
    const row = data?.depositRewards?.map((item) => {
      return {
        id: item.id,
        point: () => item.points || '',
        reason: () => rewardStatusList[item.reason]?.label || '',
        description: () => item.public_description || '',
        booking: () =>
          item?.booking?.booking_id ? (
            <div onClick={() => navigateToUserGroup(item?.booking?.booking_user_group_id, item?.booking?.booking_id)}>
              <Link underline='always' className='cursor-pointer' color='text.secondary' variant='subtitle2'>
                {item?.booking?.booking_id}
              </Link>
            </div>
          ) : (
            ''
          ),
        dates: () => moment(item.created_at).format('DD-MM-YYYY') || '',
        status: () =>
          rewardStatusList[item.reason]?.label === 'Referral bonus - Pending' ? (
            <SeverityPill color={'warning'}>Pending</SeverityPill>
          ) : item?.booking?.booking_status ? (
            <SeverityPill color={statusList[item?.booking?.booking_status]?.color ?? 'primary'}>{statusList[item?.booking?.booking_status]?.label}</SeverityPill>
          ) : (
            ''
          )
      }
    })
    return row
  }, [data?.depositRewards])

  const withDrawTableRow = useMemo(() => {
    const row = data?.withdrawalRewards?.map((item) => {
      return {
        id: item?.id,
        point: () => item?.points || '',
        booking: () => item?.booking || '',
        dates: () => moment(item?.created_at).format('DD-MM-YYYY') || ''
      }
    })
    return row
  }, [data?.withdrawalRewards])

  return (
    <Box
      component='main'
      sx={{
        flexGrow: 1
        //   py: 8
      }}
    >
      <Grid xs={12} lg={8}>
        <Stack
          spacing={{
            xs: 3,
            lg: 4
          }}
        >
          <Stack>
            <Typography color='text.secondary' variant='h6'>
              {'Withdraw'}({data?.withdrawalRewards?.length})
            </Typography>
            <Card sx={{ mt: 2 }}>
              <RawTable
                height='300px'
                minWidth='auto'
                headers={['Point', 'Booking', 'Dates']}
                handleOnClickTableRow={() => false}
                entries={withDrawTableRow}
                count={dataCountWithdraw}
                isLoading={isLoadingWithdraw}
                onRowsPerPageChangeCallback={(event) => setPageSizeWithdraw(parseInt(event.target.value))}
                page={pageWithdraw}
                pageChangeCallback={(event, newPage) => setPageWithdraw(newPage)}
                rowsPerPage={pageSizeWithdraw}
                rowsPerPageOptions={[10, 20, 30, 50]}
                isLink={false}
              />
            </Card>
          </Stack>
          <Stack>
            <Typography color='text.secondary' variant='h6'>
              {'Deposit'}({data?.depositRewards?.length})
            </Typography>
            <Card sx={{ mt: 2 }}>
              <RawTable
                height='300px'
                minWidth='auto'
                headers={['Point', 'Reason', 'Description', 'Booking', 'Date', 'Booking status']}
                entries={depositTableRow}
                count={dataCountDeposite}
                isLoading={isLoadingDeposit}
                onRowsPerPageChangeCallback={(event) => setPageSizeDeposite(parseInt(event.target.value))}
                page={pageDeposite}
                pageChangeCallback={(event, newPage) => setPageDeposite(newPage)}
                rowsPerPage={pageSizeDeposite}
                rowsPerPageOptions={[10, 20, 30, 50]}
                isLink={false}
              />
            </Card>
          </Stack>
        </Stack>
      </Grid>
    </Box>
  )
}
