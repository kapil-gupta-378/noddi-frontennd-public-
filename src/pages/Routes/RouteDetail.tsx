import React, { useEffect, useState } from 'react'
import RouteProblemMap from './RouteProblemMap'
import { Card, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import moment from 'moment'
import { RouteItem, SingleRouteSolutionData } from './interface'
import { Container, Stack } from '@mui/system'
import { useRoutes } from '../../hooks/ApiHooks/useRoutes'
import Loader from '../../components/Loader'
import { useParams } from 'react-router-dom'

const RouteDetail = () => {
  const [mapData, setMapData] = useState<SingleRouteSolutionData>({} as SingleRouteSolutionData)
  const { routeId, solutionId } = useParams()
  const { solutionData, getSingleRouteSolution, isLoading } = useRoutes()

  useEffect(() => {
    getSingleRouteSolution(solutionId as string, 1, 10)
  }, [])

  useEffect(() => {
    if (solutionData.results) {
      const data = solutionData.results.filter((item) => item.id === parseInt(routeId as string))
      setMapData(data[0] as SingleRouteSolutionData)
    }
  }, [solutionData])

  if (isLoading.getLoading && Object.keys(mapData).length) return <Loader />

  const RouteTable = ({ data }: { data: RouteItem[] }) => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Estimated Arrival</TableCell>
            <TableCell>Estimated Service Start</TableCell>
            <TableCell>Estimated Departure</TableCell>
            <TableCell>Estimated Waiting Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{moment(item?.estimated_arrival).format('YYYY-MM-DD HH:mm')}</TableCell>
                <TableCell>{moment(item?.estimated_service_start).format('YYYY-MM-DD HH:mm')}</TableCell>
                <TableCell>{moment(item?.estimated_departure).format('YYYY-MM-DD HH:mm')}</TableCell>
                <TableCell>{item?.estimated_waiting_time}</TableCell>
              </TableRow>
            ))}
          {data?.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} align='center'>
                No data available.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )

  return (
    <Container>
      <Typography mb={1} variant='h4'>
        Route Details
      </Typography>
      <Card>
        <Typography m={1} variant='h6'>
          Map
        </Typography>
        <RouteProblemMap data={mapData} />
      </Card>

      <Card
        style={{
          padding: '30px',
          margin: '20px 0'
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant='h6' style={{ display: 'flex', alignItems: 'flex-start', height: '100%' }}>
              Service Worker Name
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack gap={1} direction={'row'} justifyContent={'center'} alignItems={'center'}>
              {mapData?.service_worker_name ? mapData.service_worker_name : 'Not Available'}
            </Stack>
          </Grid>
        </Grid>
      </Card>
      <Card
        style={{
          margin: '20px 0'
        }}
      >
        <Typography m={1} variant='h6'>
          First Route Items
        </Typography>

        <RouteTable data={mapData?.first_route_items} />
      </Card>
      <Card
        style={{
          margin: '20px 0'
        }}
      >
        <Typography m={1} variant='h6'>
          Second Route Items
        </Typography>

        <RouteTable data={mapData?.last_route_items} />
      </Card>
    </Container>
  )
}

export default RouteDetail
