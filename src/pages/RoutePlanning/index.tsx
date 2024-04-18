import { Button, Card, Grid, MenuItem, Container, Stack, Typography, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material'
import { Box } from '@mui/system'
import { DatePicker } from '@mui/x-date-pickers'
import { useFormik } from 'formik'
import React, { useEffect, useMemo } from 'react'
import { useRoutePlanner } from '../../hooks'
import RoutePlanningMap from './RoutePlanningMap'
import { dateToDdMmYyyySlashes } from '../../utils'
import moment from 'moment'
// import { Link } from 'react-router-dom'
import { RawTable } from '../../components/Table/BaseTable'
const RoutePlanning = () => {
  const {
    date,
    setDate,
    selectedLicenseArea,
    setSelectedLicenseArea,
    executionTime,
    setExecutionTime,
    minNumWorkers,
    setMinNumWorkers,
    licenseAreas,
    bookings,
    capacityContributions,
    disableButtons,
    startRoutePlanner,
    contributors,
    setPage,
    setPageSize,
    page,
    pageSize,
    isLoading
  } = useRoutePlanner()
  const {} = useFormik({
    initialValues: {},
    onSubmit: (values) => {
      console.log(values)
    }
  })

  const generateTableRow = useMemo(() => {
    return contributors
      ? contributors.map((item) => {
          return {
            id: item.id,
            ServiceWorker: () => <>{item.service_worker}</>,
            Time: () => <>{`${moment(item.start_time).format('hh:mm')} - ${moment(item.end_time).format('hh:mm')}`}</>,
            StartAddress: () => <>{item.start_address}</>,
            EndAddress: () => <>{item.end_address}</>,
            PerformanceFactor: () => <>{item.performance_factor}</>,
            Priority: () => <>{item.priority}</>
          }
        })
      : []
  }, [contributors])

  const General = () => (
    <Card
      style={{
        padding: '30px',
        margin: '20px 0'
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant='h6' style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            General
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack spacing={3}>
            <DatePicker
              format='dd/MM/yyyy'
              slotProps={{
                textField: {
                  helperText: 'Select date for route planning'
                }
              }}
              label='Date'
              value={date}
              onChange={(newValue) => setDate(newValue as Date)}
            />
            <TextField
              helperText='Select license area for route planning'
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
        </Grid>
      </Grid>
    </Card>
  )

  const BookingMap = () => (
    <Card
      style={{
        padding: '30px',
        margin: '20px 0'
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant='h6'>Bookings</Typography>
        </Grid>
        <Grid item xs={12} style={{ paddingTop: '5px' }}>
          <Typography variant='subtitle1'>
            {bookings.length} bookings for {dateToDdMmYyyySlashes(date)}
          </Typography>
        </Grid>

        {bookings.length > 0 && (
          <Grid item xs={12}>
            <RoutePlanningMap bookings={bookings} />
          </Grid>
        )}
      </Grid>
    </Card>
  )

  const CapacityContributions = () => (
    <Card
      style={{
        margin: '20px 0'
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack padding={3}>
            <Typography variant='h6' style={{ display: 'flex', alignItems: 'flex-start', height: '100%' }}>
              Capacity contributions
            </Typography>
            <Typography variant='subtitle1' style={{ display: 'flex', alignItems: 'flex-start', height: '100%' }}>
              {capacityContributions} {contributors?.length} capacity contributions for {dateToDdMmYyyySlashes(date)}
            </Typography>
          </Stack>
        </Grid>

        {capacityContributions.length > 0 && (
          <Grid item xs={12}>
            ..
          </Grid>
        )}
      </Grid>
      <RawTable
        headers={['Service Worker', 'Start - End', 'Start address', 'End address', 'Performance factor', 'Priority']}
        entries={generateTableRow}
        count={0}
        isLoading={isLoading.getLoading}
        pageChangeCallback={function (_event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number): void {
          setPage(newPage + 1)
        }}
        onRowsPerPageChangeCallback={function (event: React.ChangeEvent<HTMLInputElement>): void {
          setPageSize(parseInt(event.target.value))
        }}
        rowsPerPage={pageSize}
        page={page}
        isLink
        baseUrl='/capacity-contribution/'
      />
    </Card>
  )

  const Parameters = () => (
    <Card
      style={{
        padding: '30px',
        margin: '20px 0'
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant='h6' style={{ display: 'flex', alignItems: 'flex-start', height: '100%' }}>
            Parameters
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack spacing={3}>
            <TextField
              helperText='For how many minutes should the route planner run?'
              type='number'
              id='outlined-basic'
              name='license_area'
              fullWidth
              label='Execution Time'
              disabled={!date || !selectedLicenseArea}
              value={executionTime}
              onChange={(newValue) => setExecutionTime((newValue.target as HTMLInputElement).valueAsNumber)}
            />
            <TextField
              helperText='How many routes should minimum be created?'
              type='number'
              id='outlined-basic'
              name='license_area'
              fullWidth
              label='Minimum no. of Workers'
              disabled={!date || !selectedLicenseArea}
              value={minNumWorkers}
              onChange={(newValue) => setMinNumWorkers((newValue.target as HTMLInputElement).valueAsNumber)}
            />
          </Stack>
        </Grid>
      </Grid>
    </Card>
  )

  const Buttons = () => (
    <Stack alignItems='center' direction='row' justifyContent='flex-end' spacing={1}>
      <Button color='primary' variant='contained' disabled={disableButtons()} onClick={() => startRoutePlanner(date, selectedLicenseArea, executionTime, minNumWorkers, false)}>
        Run Route Planner
      </Button>
      <Button color='error' variant='contained' disabled={disableButtons()} onClick={() => startRoutePlanner(date, selectedLicenseArea, executionTime, minNumWorkers, true)}>
        Run Capacity Planner
      </Button>
    </Stack>
  )

  return (
    <Box component='main'>
      <Container maxWidth='xl'>
        <Stack spacing={4}>
          <Stack direction='row' justifyContent='space-between' spacing={4}>
            <Stack spacing={1}>
              <Typography variant='h4'>Route Planning</Typography>
            </Stack>
          </Stack>
        </Stack>

        <form action=''>
          <General />
          {date && selectedLicenseArea && <BookingMap />}
          {date && selectedLicenseArea && <CapacityContributions />}
          {date && selectedLicenseArea && bookings.length > 0 && (
            <>
              <Parameters />
              <Buttons />
            </>
          )}
        </form>
      </Container>
    </Box>
  )
}

export default RoutePlanning
