import SEO from '../../components/SEO'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useAxiosPrivate from '../../adapters/xhr/axiosPrivate'
import CenterSpinner from '../../components/CenterSpinner'
import ErrorModal from '../../components/ErrorModal'
import BookingsMap from '../../components/Map/Bookings/BookingsMap'
import BookingStats from './BookingStats'
import NoddiDatePicker from './NoddiDatePicker'
import { dateToDdMmYyyyDashes } from '../../utils'
import { Col, Row } from 'react-bootstrap'
import { Booking } from '../../types/booking'
import { constants } from '../../constant'
import { getEndpointUrl } from '../../helper'
import Container from "@mui/material/Container";
import { Box } from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const Dashboard = () => {
  const { date } = useParams()

  // const navigate = useNavigate()
  // const axiosPrivate = useAxiosPrivate()
  const [spinnerMessage, setSpinnerMessage] = useState<string | null>(null)
  // const [errors, setErrors] = useState<string[] | null>(null)
  //
  // const [bookings, setBookings] = useState<Booking[]>([])
  // const [selectedDate, setSelectedDate] = useState(() => {
  //   if (date === undefined) {
  //     return new Date()
  //   } else {
  //     const dateParts = date.split('-')
  //     return new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0])
  //   }
  // })
  //
  // const fetchData = async () => {
  //   setSpinnerMessage('Retrieving bookings..')
  //   const {apiEndpoints} = constants
  //   const bookingsUrl: string = getEndpointUrl(apiEndpoints.getBookings)
  //   await Promise.all([axiosPrivate.get(bookingsUrl, { params: { date: selectedDate } })])
  //     .then((values) => {
  //       const bookingsData = values[0].data
  //       bookingsData.sort((a, b) => a.name.localeCompare(b.name))
  //       setBookings(bookingsData)
  //       setSpinnerMessage(null)
  //     })
  //     .catch((error) => {
  //       setErrors([error])
  //       setSpinnerMessage(null)
  //     })
  // }
  //
  // useEffect(() => {
  //   if (date === undefined) {
  //     navigate(`/${dateToDdMmYyyy(new Date())}`, { replace: false })
  //   }
  //   fetchData()
  // }, [])
  //
  // useEffect(() => {
  //   fetchData()
  // }, [date, selectedDate])

  return spinnerMessage ? (
    <CenterSpinner text={spinnerMessage} />
  ) : (
    <>
      <SEO title={'Dashboard'} />
      <div>
        <>
          <Box
            component='main'
            sx={{
              flexGrow: 1
            }}
          >
            <Container maxWidth='xl'>
              <Stack spacing={4}>
                  <Stack direction='row' justifyContent='space-between' spacing={4}>
                    <Stack spacing={1}>
                      <Typography variant='h4'>Dashboard</Typography>
                    </Stack>
                  </Stack>
              </Stack>
            </Container>
          </Box>
        </>
      </div>

      {/*/!* Heading *!/*/}
      {/*<Row className={'mb-3'}>*/}
      {/*  <Col xs={12} md={6}>*/}
      {/*    <h3 className={'mb-2'}>Dashboard</h3>*/}
      {/*    <h5 className={'text-700 fw-semi-bold'}>*/}
      {/*      {bookings.length} bookings for{' '}*/}
      {/*      {selectedDate.toLocaleString('en-CA', {*/}
      {/*        month: 'long',*/}
      {/*        day: 'numeric',*/}
      {/*        year: 'numeric'*/}
      {/*      })}*/}
      {/*    </h5>*/}
      {/*  </Col>*/}
      {/*  <Col xs={12} md={6} className={'noddi-date-picker mt-2'}>*/}
      {/*    <div className={'float-md-end'}>*/}
      {/*      <NoddiDatePicker date={selectedDate} setDate={setSelectedDate} />*/}
      {/*    </div>*/}
      {/*  </Col>*/}
      {/*</Row>*/}

      {/*{bookings.length > 0 && (*/}
      {/*  <>*/}
      {/*    <BookingsMap bookings={bookings} />*/}
      {/*    <BookingStats bookings={bookings} />*/}
      {/*  </>*/}
      {/*)}*/}

      {/*<ErrorModal errors={errors} setErrors={setErrors} />*/}
    </>
  )
}

export default Dashboard
