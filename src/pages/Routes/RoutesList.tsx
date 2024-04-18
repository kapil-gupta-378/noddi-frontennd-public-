import { Card, Typography } from '@mui/material'
import { Box, Container, Stack } from '@mui/system'
import React, { useEffect, useMemo, useState } from 'react'
import { useRoutes } from '../../hooks/ApiHooks/useRoutes'
import { RawTable } from '../../components/Table/BaseTable'
import { SeverityPill } from '../../components/severity-pill'

const RoutesList = () => {
  const { getRoutes, isLoading, routes } = useRoutes()

  const [pageSize, setPageSize] = useState<number>(routes?.page_size || 10)
  const [page, setPage] = useState<number>(routes?.page || 1)

  useEffect(() => {
    getRoutes(page, pageSize)
  }, [page, pageSize])

  const generateTableRow = useMemo(() => {
    const row = Array.isArray(routes.results)
      ? routes.results.map((item) => {
          return {
            id: item.id,
            ServiceWorker: () => (
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex'
                }}
              >
                {item.service_worker_name}
              </Box>
            ),
            Distance: () => (
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex'
                }}
              >
                <>{item.summary.total_distance}</>
              </Box>
            ),
            Duration: () => (
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex'
                }}
              >
                {item.summary.total_time}
              </Box>
            ),

            Cost: () => (
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex'
                }}
              >
                {item.summary.total_cost}
              </Box>
            ),

            IsValid: () => (
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex'
                }}
              >
                {item.summary.is_valid ? <SeverityPill color='success'>Valid</SeverityPill> : <SeverityPill color='error'>Not Valid</SeverityPill>}
              </Box>
            )
          }
        })
      : []
    return row
  }, [routes])

  return (
    <Box component='main'>
      <Container maxWidth='xl'>
        <Typography variant='h4' style={{ display: 'flex', alignItems: 'flex-start', height: '100%' }}>
          Routes
        </Typography>
        <Card
          style={{
            margin: '20px 0'
          }}
        >
          <Stack padding={3}>
            <Typography variant='h6' style={{ display: 'flex', alignItems: 'flex-start', height: '100%' }}>
              Summary
            </Typography>
          </Stack>
          <RawTable
            headers={['Service Worker Name', 'Distance (KM)', 'Duration (hours)', 'Cost', 'Valid']}
            count={routes.count || 0}
            entries={generateTableRow}
            isLoading={isLoading.getLoading}
            minWidth='0'
            onRowsPerPageChangeCallback={(e) => {
              setPageSize(parseInt(e.target.value))
            }}
            page={page}
            pageChangeCallback={(_, newPage) => {
              setPage(newPage + 1)
            }}
            isLink={false}
            rowsPerPage={pageSize}
            baseUrl='/route-details/'
          />
        </Card>
      </Container>
    </Box>
  )
}

export default RoutesList
