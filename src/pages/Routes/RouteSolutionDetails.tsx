import React, { useEffect, useMemo, useState } from 'react'
import { useRoutes } from '../../hooks/ApiHooks/useRoutes'
import { useParams } from 'react-router-dom'
import { Container, Stack } from '@mui/system'
import { Box, Card, Typography } from '@mui/material'
import { RawTable } from '../../components/Table/BaseTable'
import { SeverityPill } from '../../components/severity-pill'
import { RouteItem, RouteSolution, SingleRouteSolutionData } from './interface'
import RouteProblemMap from './RouteProblemMap'
import moment from 'moment'

const RouteSolutionDetails = () => {
  const { solutionId } = useParams()
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [mapData, setMapData] = useState<SingleRouteSolutionData>({} as SingleRouteSolutionData)
  const { solutionData, getSingleRouteSolution, isLoading } = useRoutes()

  useEffect(() => {
    getSingleRouteSolution(solutionId as string, page, pageSize)
  }, [solutionId, page, pageSize])

  const generateTableRow = useMemo(() => {
    const row = Array.isArray(solutionData.results)
      ? solutionData.results.map((item) => {
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
  }, [solutionData])

  return (
    <Container>
      <Typography mb={1} variant='h4'>
        Routes
      </Typography>

      <Card
        style={{
          margin: '20px 0'
        }}
      >
        <RawTable
          headers={['Distance(KM)', 'Time(Hour)', 'Cost', 'Valid']}
          count={solutionData.count || 0}
          entries={generateTableRow}
          isLoading={isLoading.getLoading}
          minWidth='0'
          // handleOnClickTableRow={(id) => {
          //   const data = solutionData.results.find((item) => item.id === id)

          //   if (data) setMapData(data)
          // }}
          onRowsPerPageChangeCallback={(e) => {
            setPageSize(parseInt(e.target.value))
          }}
          page={page}
          pageChangeCallback={(_, newPage) => {
            setPage(newPage + 1)
          }}
          isLink={true}
          rowsPerPage={pageSize}
          baseUrl='route/'
        />
      </Card>
    </Container>
  )
}

export default RouteSolutionDetails
