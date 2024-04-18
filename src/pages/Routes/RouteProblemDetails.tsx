import React, { useEffect, useMemo, useState } from 'react'
import { Card, Grid, TextField, Typography } from '@mui/material'
import { Box, Container, Stack } from '@mui/system'
import { useRoutes } from '../../hooks/ApiHooks/useRoutes'
import { useParams } from 'react-router-dom'
import { RawTable } from '../../components/Table/BaseTable'
// import moment from 'moment'
import { SeverityPill } from '../../components/severity-pill'
// import RouteProblemMap from './RouteProblemMap'
// import { RouteSolution, RouteSolutionResults } from './interface'

const RouteProblemDetails = () => {
  const { routeSolutions, getRouteSolutionById, isLoading } = useRoutes()
  const [pageSize, setPageSize] = useState<number>(routeSolutions.page_size || 10)
  const [page, setPage] = useState<number>(routeSolutions.page || 1)
  // const [mapData, setMapData] = useState<RouteSolutionResults>({} as RouteSolutionResults)
  const { problemId } = useParams()

  const generateTableRow = useMemo(() => {
    const row = Array.isArray(routeSolutions.results)
      ? routeSolutions.results.map((item) => {
          return {
            id: item.id,
            Distance: () => (
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex'
                }}
              >
                {(item.summary.total_distance / 1000).toFixed(2)}
              </Box>
            ),

            Time: () => (
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex'
                }}
              >
                {(item.summary.total_time / 3600).toFixed(2)}
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
            NoOfRoutes: () => (
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex'
                }}
              >
                {item.routes}
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
  }, [routeSolutions])

  useEffect(() => {
    getRouteSolutionById(problemId as string)
  }, [])

  return (
    <Container>
      <Typography mb={1} variant='h4'>
        Solutions
      </Typography>

      <Card
        style={{
          margin: '20px 0'
        }}
      >
        <Typography m={1} variant='h6'>
          Summary
        </Typography>

        <RawTable
          headers={['Distance(KM)', 'Time(Hour)', 'Cost', 'Number of Routes', 'Valid']}
          count={routeSolutions.count || 0}
          entries={generateTableRow}
          isLoading={isLoading.getLoading}
          minWidth='0'
          // handleOnClickTableRow={(id) => {
          //   const data = routeSolutions.results.find((item) => item.id === id)

          //   if (data) setMapData(data)
          // }}
          onRowsPerPageChangeCallback={(e) => {
            setPageSize(parseInt(e.target.value))
          }}
          page={page}
          pageChangeCallback={(_, newPage) => {
            setPage(newPage + 1)
          }}
          isLink
          baseUrl='solutions/'
          rowsPerPage={pageSize}
        />
      </Card>
    </Container>
  )
}

export default RouteProblemDetails
