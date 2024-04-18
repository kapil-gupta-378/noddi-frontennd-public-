import { Stack, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React, { FC } from 'react'
import BookingInfo from '../BookingDetails/BookingInfo'
import { BookingDetailProps } from './interface'
import NoddiBreadcrumb from '../../components/Breadcrumb'

const BookingDetail: FC<BookingDetailProps> = ({ bookingDetails, bookingId, setView, isLoading }) => {
  return (
    <Container>
      <Typography mb={1} variant='h4'>
        Bookings Details
      </Typography>
      <Stack>
        <NoddiBreadcrumb
          items={[
            {
              title: 'Calendar Overview',
              path: '/calendar-overview'
            },
            {
              title: 'Booking Details'
            }
          ]}
        />
      </Stack>
      <BookingInfo isLoading={isLoading} bookingId={bookingId as string} bookingInfo={bookingDetails} />
    </Container>
  )
}

export default BookingDetail
