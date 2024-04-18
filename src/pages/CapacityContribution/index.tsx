/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useMemo, useRef, useState } from 'react'
import { RawTable } from '../../components/Table/BaseTable'
import { Card, Stack, Box, Typography, Button, SvgIcon } from '@mui/material'
import { ContributionSidebar } from '../../components/Sidebars'
import { FeedbacksContainer } from '../../containers'
import FilterFunnel01Icon from '@untitled-ui/icons-react/build/esm/FilterFunnel01'
import { useCapacityContribution } from '../../hooks'
import moment from 'moment'
import { SeverityPill } from '../../components/severity-pill'
import { contributionStatusList } from '../../constant'

const CapacityContribution = () => {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const [openSidebar, setOpenSidebar] = useState<boolean>(true)
  const { capacityContributionList, isLoading, setPage, pageSize, page, setPageSize, setFilterValue, filterValue, dataCount } = useCapacityContribution()

  const TableRow = useMemo(() => {
    return capacityContributionList?.map((item) => {
      return {
        id: item.id,
        Driver_name: () => <>{`${item?.service_worker?.user?.first_name} ${item?.service_worker?.user?.last_name}`}</>,
        Start_time: () => item.service_worker_attributes.start_time,
        End_time: () => item.service_worker_attributes.end_time,
        Date: () => (item.date ? moment(item?.date).format('DD-MM-YYYY') : ''),
        status: () => (item?.status ? <SeverityPill color={contributionStatusList[item.status]?.color ?? 'primary'}>{contributionStatusList[item.status]?.label}</SeverityPill> : 'NA')
      }
    })
  }, [capacityContributionList])

  const handleFiltersToggle = useCallback((): void => {
    setOpenSidebar((prevState) => !prevState)
  }, [])

  const handleFiltersChange = (state: any) => {
    setFilterValue({ ...state.search })
    setPage(1)
  }

  return (
    <>
      <Box
        component='main'
        sx={{
          display: 'flex',
          flex: '1 1 auto',
          overflow: 'hidden',
          position: 'relative',
          marginTop: '-65px'
        }}
      >
        <Box
          ref={rootRef}
          component='main'
          sx={{
            py: 8,
            width: '100%',
            display: 'flex'
          }}
        >
          <ContributionSidebar container={rootRef.current} filters={filterValue} onFiltersChange={handleFiltersChange} onClose={handleFiltersToggle} open={openSidebar} />
          <FeedbacksContainer open={openSidebar}>
            <Stack spacing={3}>
              <Stack direction='row' justifyContent='space-between' spacing={4}>
                <Stack spacing={1}>
                  <Typography variant='h4'>Capacity Contribution</Typography>
                </Stack>
                <Stack alignItems='center' direction='row' spacing={1}>
                  <Button
                    color='inherit'
                    startIcon={
                      <SvgIcon>
                        <FilterFunnel01Icon />
                      </SvgIcon>
                    }
                    onClick={handleFiltersToggle}
                  >
                    Filters
                  </Button>
                </Stack>
              </Stack>
              <Stack spacing={5}>
                <Card>
                  <RawTable
                    height='592px'
                    minWidth='700px'
                    headers={['Driver name', 'Start time', 'End time', 'Date', 'status']}
                    entries={TableRow || []}
                    count={dataCount || 0}
                    isLoading={isLoading.getLoading}
                    onRowsPerPageChangeCallback={(e) => setPageSize(Number(e.target.value))}
                    page={page}
                    pageChangeCallback={(_, newPage) => setPage(newPage + 1)}
                    rowsPerPage={pageSize}
                    baseUrl='/capacity-contribution/'
                  />
                </Card>
              </Stack>
            </Stack>
          </FeedbacksContainer>
        </Box>
      </Box>
    </>
  )
}

export default CapacityContribution
