import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'
import SEO from '../../components/SEO'
import { Box, Button, Divider, Stack, SvgIcon, Typography, useMediaQuery } from '@mui/material'
import type { Theme } from '@mui/material/styles/createTheme'
import { FeedbackSidebar } from '../../components/Sidebars'
import { FeedbacksContainer } from '../../containers/index'
import FilterFunnel01Icon from '@untitled-ui/icons-react/build/esm/FilterFunnel01'
import { FeedbacksTable } from '../../components/Table'
import { useFeedback } from '../../hooks'
import { FeedbackSummary } from './FeedbackSummary'
interface Filters {
  type?: string[]
  endDate?: Date
  query?: string
  rating?: number | string
  startDate?: Date
}

interface FeedbackSearchState {
  filters: Filters
  page: number
  rowsPerPage: number
}
const useInvoicesSearch = () => {
  const [state, setState] = useState<FeedbackSearchState>({
    filters: {
      type: [],
      endDate: undefined,
      query: '',
      startDate: undefined,
      rating: ''
    },
    page: 0,
    rowsPerPage: 5
  })

  const handleFiltersChange = useCallback((filters: Filters): void => {
    setState((prevState) => ({
      ...prevState,
      filters,
      page: 0
    }))
  }, [])

  const handlePageChange = useCallback((event:MouseEvent<HTMLButtonElement> | null, page: number): void => {
    setState((prevState) => ({
      ...prevState,
      page
    }))
  }, [])

  const handleRowsPerPageChange = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
    setState((prevState) => ({
      ...prevState,
      rowsPerPage: parseInt(event.target.value, 10)
    }))
  }, [])

  return {
    handleFiltersChange,
    handlePageChange,
    handleRowsPerPageChange,
    state
  }
}

const Feedbacks = () => {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'))
  const [openSidebar, setOpenSidebar] = useState<boolean>(lgUp)
  const { feedbacks, isLoading, dataCount, page, setPage, pageSize, setPageSize, feedbackSummary, setfilterOption } = useFeedback()
  const { state, handleFiltersChange } = useInvoicesSearch()
  const [group] = useState<boolean>(true)

  useEffect(() => {
    setfilterOption({ search: state?.filters.query, end_date: state.filters.endDate, start_date: state.filters.startDate, rating: state?.filters?.customers })
  }, [state])

  const handleGroupChange = useCallback((): void => {
    // setGroup(event.target.checked);
  }, [])

  const handleFiltersToggle = useCallback((): void => {
    setOpenSidebar((prevState) => !prevState)
  }, [])

  const handleFiltersClose = useCallback((): void => {
    setOpenSidebar(false)
  }, [])

  return (
    <>
      <SEO title='Dashboard: Service Feedback' />
      <Divider />
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
          sx={{
            width: '100%',
            bottom: 0,
            display: 'flex',
            left: 0,
            // position: 'absolute',
            right: 0,
            top: 0
          }}
        >
          <FeedbackSidebar
            container={rootRef.current}
            filters={state.filters}
            group={group}
            onFiltersChange={handleFiltersChange}
            onClose={handleFiltersClose}
            onGroupChange={handleGroupChange}
            open={openSidebar}
          />
          <FeedbacksContainer open={openSidebar}>
            <Stack spacing={4}>
              <Stack alignItems='flex-start' direction='row' justifyContent='space-between' spacing={3}>
                <div>
                  <Typography variant='h4'>Feedbacks</Typography>
                </div>
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

              <FeedbackSummary data={feedbackSummary} />
              <FeedbacksTable
                count={dataCount}
                isLoading={isLoading}
                data={feedbacks}
                onPageChange={(_, page) => setPage(page + 1)}
                onRowsPerPageChange={(e) => setPageSize(parseInt(e.target.value))}
                page={page}
                rowsPerPage={pageSize}
              />
            </Stack>
          </FeedbacksContainer>
        </Box>
      </Box>
    </>
  )
}

export default Feedbacks
