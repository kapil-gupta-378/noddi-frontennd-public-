import { Card, Grid, MenuItem, TextField, Typography } from '@mui/material'
import { Box, Container, Stack } from '@mui/system'
import { DatePicker } from '@mui/x-date-pickers'
import moment from 'moment'
import React, { useEffect, useMemo, useState } from 'react'
import { useRoutes } from '../../hooks/ApiHooks/useRoutes'
import { RawTable } from '../../components/Table/BaseTable'
import { useLocation, useNavigate } from 'react-router-dom'
// import Loader from '../../components/Loader'

const Routes = () => {
  const { licenseAreas, getLicenseAreas, getRouteProblems, routeProblems, isLoading } = useRoutes()
  const [selectedLicenseArea, setSelectedLicenseArea] = useState<string>(licenseAreas[0]?.id.toString() || '')
  const [date, setDate] = useState<Date | null>(moment(new Date()).toDate())
  const [pageSize, setPageSize] = useState<number>(routeProblems.page_size || 10)
  const [page, setPage] = useState<number>(routeProblems.page || 1)
  const navigate = useNavigate()
  const location = useLocation()
  // const {routeId} = useParams()
  const searchParams = new URLSearchParams(location.search)

  useEffect(() => {
    // navigate(`/route/routes-problem/?date=${searchParams.get('date')}&license-area=${searchParams.get('license-area')}`)
    setDate(new Date(searchParams.get('date') as string))
    setSelectedLicenseArea(searchParams.get('license-area') as string)
  }, [])

  useEffect(() => {
    navigate(`/routes-problem/?date=${moment(date).toDate().toISOString().slice(0, 10)}&license-area=${selectedLicenseArea}`)
    if (date && selectedLicenseArea && page && pageSize) getRouteProblems(date, selectedLicenseArea, page, pageSize)
  }, [selectedLicenseArea, date, page, pageSize])

  useEffect(() => {
    getLicenseAreas()
  }, [])

  const generateTableRow = useMemo(() => {
    const row = Array.isArray(routeProblems?.results)
      ? routeProblems.results.map((item) => {
          return {
            id: item.id,
            Date: () => (
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex'
                }}
              >
                <>{moment(item.date).toDate().toLocaleDateString()}</>
              </Box>
            ),
            LicenseArea: () => (
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex'
                }}
              >
                {item.license_area.name}
              </Box>
            ),

            Type: () => (
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex'
                }}
              >
                {item.type}
              </Box>
            )
          }
        })
      : []
    return row
  }, [routeProblems])

  return (
    <Box component='main'>
      <Container maxWidth='xl'>
        <Stack direction={'row'} justifyContent={'space-between'} spacing={4}>
          <Typography variant='h4'>Filter</Typography>
          <Stack direction={'row'} justifyContent={'space-between'} columnGap={2} alignItems={'center'}>
            <DatePicker
              format='dd/MM/yyyy'
              slotProps={{
                textField: {
                  helperText: 'Select date for routes',
                  fullWidth: true
                }
              }}
              label='Date'
              onChange={(newValue) => setDate(newValue)}
              value={date}
            />
            <TextField
              helperText='Select license area for routes'
              select
              id='outlined-basic'
              name='license_area'
              fullWidth
              label='License Area'
              value={selectedLicenseArea}
              onChange={(newValue) => setSelectedLicenseArea(newValue.target.value)}
            >
              {licenseAreas.map((item) => {
                return (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                )
              })}
            </TextField>
          </Stack>
        </Stack>
        <form action=''>
          <Card
            style={{
              margin: '20px 0'
            }}
          >
            <Stack padding={3}>
              <Typography variant='h6' style={{ display: 'flex', alignItems: 'flex-start', height: '100%' }}>
                Route Problems
              </Typography>
            </Stack>
            <RawTable
              headers={['Date', 'License Area', 'Type']}
              count={routeProblems.count || 0}
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
              isLink
              rowsPerPage={pageSize}
              baseUrl={`/route-problems/`}
            />
          </Card>
        </form>
      </Container>
    </Box>
  )
}

export default Routes
