import { Card, Grid, TextField, Typography,Skeleton } from '@mui/material'
import { Container, Stack } from '@mui/system'
import React, { useEffect, useState } from 'react'
import NoddiBreadcrumb from '../../components/Breadcrumb'
import { useParams } from 'react-router-dom'
import { useGroups } from '../../hooks'
import { useFormik } from 'formik'
import { BookingMessageHandlerProps } from './interface'
import { getLatestDate } from '../../utils/functions'

const subject_type = [
  { value: 0, label: 'Appointment confirmation' },
  { value: 1, label: 'Appointment scheduled' },
  { value: 2, label: 'Feedback request' },
  { value: 3, label: 'Job completed' },
  { value: 4, label: 'Unable to complete' },
  { value: 5, label: 'Post job information' },
  { value: 6, label: 'Manual verification' },
  { value: 7, label: 'Day ahead reminder' },
  { value: 8, label: 'Delayed on route' },
  { value: 9, label: 'Email invite' },
  { value: 10, label: 'Other' },
  { value: 11, label: 'Next on list' },
  { value: 12, label: 'Payment reminder' },
  { value: 13, label: 'Rescheduled' }
]

const BookingMessageInfo = () => {
  const { id, bookingId, messageId, tab } = useParams()
  const [isReadOnly, setIsReadOnly] = useState(false)
  const { oneMembership, getBookingMsgHandler, isLoading } = useGroups(parseInt(id as string))
  const { values, errors, handleBlur, handleChange, handleSubmit, setValues } = useFormik<BookingMessageHandlerProps>({
    initialValues: {
      api_response: '',
      body: '',
      booking: 0,
      bubble_id: '',
      header: '',
      receiver: { id: 0, name: '' },
      sender: { id: 0, name: '' },
      booking_message_handler: { subject_type: 0, api_type: 0, id: 0, cancelled_at: '', scheduled_at: '', sent_at: '' }
    },
    onSubmit: () => {
      return
    }
  })

  useEffect(() => {
    getBookingMsgHandler(messageId as string).then((data) => {
      if (data) {
        setValues(data)
      }
    })
  }, [])

  useEffect(() => {
    const dateObj = getLatestDate(values.booking_message_handler.sent_at, values.booking_message_handler.cancelled_at, values.booking_message_handler.scheduled_at)
    if (Object.keys(dateObj)[0] === 'sent_at' || Object.keys(dateObj)[0] === 'cancelled_at') {
      setIsReadOnly(true)
    }
  }, [values])
  if (isLoading) {
    return (
      <>
        <Card
          style={{
            padding: '30px',
            margin: '20px 0'
          }}
        >
          <Stack gap={2}>
            <Skeleton variant='rectangular' width='100%' height={60} />
            <Skeleton variant='rectangular' width='100%' height={60} />
            <Skeleton variant='rectangular' width='100%' height={60} />
          </Stack>
        </Card>
      </>
    )
  }
  return (
    <Container>
      <Typography mb={1} variant='h4'>
        Booking Message Details
      </Typography>
      <NoddiBreadcrumb
        items={[
          {
            title: 'User Groups',
            path: '/user-groups'
          },
          {
            title: oneMembership.name,
            path: `/user-groups/${id}/members`
          },
          {
            title: 'Bookings',
            path: `/user-groups/${id}/bookings/`
          },
          {
            title: 'Messages',
            path: `/user-groups/${id}/bookings/${bookingId}/messages`
          },
          {
            title: messageId,
            path: ``
          }
        ]}
      />

      <form onSubmit={handleSubmit}>
        <Card
          style={{
            padding: '30px',
            margin: '20px 0'
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant='h6' style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                Title
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack spacing={3}>
                <TextField
                  disabled={isReadOnly}
                  error={errors.header ? true : false}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  id='outlined-basic'
                  name='header'
                  fullWidth
                  label='Title'
                  value={values.header}
                />
              </Stack>
            </Grid>
          </Grid>
        </Card>
        <Card
          style={{
            padding: '30px',
            margin: '20px 0'
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant='h6' style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                Message
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack spacing={3}>
                <TextField
                  disabled={isReadOnly}
                  error={errors.body ? true : false}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  id='outlined-basic'
                  name='body'
                  fullWidth
                  multiline
                  maxRows={4}
                  minRows={6}
                  label='Message'
                  value={values.body}
                />
                {/* <MinHeightTextarea minRows={3} placeholder='Type your message!' onBlur={handleBlur} onChange={handleChange} name='body' value={values.body} /> */}
              </Stack>
            </Grid>
          </Grid>
        </Card>

        <Card
          style={{
            padding: '30px',
            margin: '20px 0'
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant='h6' style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                Sender
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack spacing={3}>
                <TextField
                  disabled={isReadOnly}
                  error={errors?.sender?.name ? true : false}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  id='outlined-basic'
                  name='sender.name'
                  fullWidth
                  label='Sender'
                  value={values?.sender?.name}
                />
              </Stack>
            </Grid>
          </Grid>
        </Card>

        <Card
          style={{
            padding: '30px',
            margin: '20px 0'
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant='h6' style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                Receiver
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack spacing={3}>
                <TextField
                  disabled={isReadOnly}
                  error={errors?.receiver?.name ? true : false}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  id='outlined-basic'
                  name='receiver.name'
                  fullWidth
                  label='Receiver'
                  value={values?.receiver?.name}
                />
              </Stack>
            </Grid>
          </Grid>
        </Card>

        {values.booking_message_handler && (
          <>
            {/* <Divider />
            <Typography variant='h5' style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
              Message Handler Info
            </Typography> */}
            <Card
              style={{
                padding: '30px',
                margin: '20px 0'
              }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant='h6' style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                    Subject Type
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack spacing={3}>
                    <TextField
                      disabled={isReadOnly}
                      error={errors?.booking_message_handler?.subject_type ? true : false}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      id='outlined-basic'
                      name='booking_message_handler.subject_type'
                      select
                      disabled={isReadOnly}
                      SelectProps={{ native: true }}
                      fullWidth
                      label='Subject Type'
                      value={values.booking_message_handler.subject_type}
                    >
                      {subject_type.map((item) => (
                        <option key={item.value} value={item.value}>
                          {item.label}
                        </option>
                      ))}
                    </TextField>
                  </Stack>
                </Grid>
              </Grid>
            </Card>
          </>
        )}
      </form>
    </Container>
  )
}

export default BookingMessageInfo
