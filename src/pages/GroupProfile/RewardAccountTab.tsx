import { Grid } from '@mui/material'
import { Box, Stack } from '@mui/system'
import React from 'react'
import SEO from '../../components/SEO'
import { AccountBalanceCard } from '../../components/Cards'
import { RewardTable } from '../../components/Table'
interface RewardAccountTabProps {
  isLoading: boolean
  data: any // You can replace 'any' with the appropriate type for your 'data' object
  groupId: string
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
const RewardAccountTab: React.FC<RewardAccountTabProps> = ({
  isLoading,
  data,
  groupId,
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
  {
    return (
      <>
        <SEO title='Dashboard: E-Commerce' />
        <Box
          component='main'
          sx={{
            flexGrow: 1,
            gap: '20px'
          }}
        >
          <Grid mb={5} xs={12} lg={8}>
            <Stack
              spacing={{
                xs: 3,
                lg: 4
              }}
            >
              <AccountBalanceCard cost={99700} profit={32100} sales={data.point} />
            </Stack>
          </Grid>
          <RewardTable
            isLoading={isLoading}
            data={data}
            groupId={parseInt(groupId)}
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
        </Box>
      </>
    )
  }
}

export default RewardAccountTab
