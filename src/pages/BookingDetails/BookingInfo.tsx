import { Stack } from '@mui/system'
import React, { useEffect } from 'react'
import { BookingDetails, BookingInfoProps } from './interface'
import { useFormik } from 'formik'
import { Button, Card, Grid, Skeleton, TextField, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { getEndpointUrl } from '../../helper'
import { toast } from 'react-hot-toast'
import useAxiosPrivate from '../../adapters/xhr/axiosPrivate'
import { bookingItemsConstant, constants } from '../../constant'
import { MobileTimePicker } from '@mui/x-date-pickers'
import { Link, useNavigate } from 'react-router-dom'
import { generateRandomAlphaNumeric, getPatchObject } from '../../utils/functions'
import { useBookingItems } from '../../hooks'
import moment from 'moment'
// import * as Yup from 'yup'

const status = [
  { id: 0, value: 'Draft' },
  { id: 1, value: 'Confirmed' },
  { id: 2, value: 'Assigned' },
  { id: 3, value: 'Cancelled' },
  { id: 4, value: 'Completed' },
  { id: 5, value: 'Unable to complete' }
]

const BookingInfo: React.FC<BookingInfoProps> = ({ bookingInfo, bookingId, isLoading }) => {
  const { bookingItemsList, userGroupId } = useBookingItems()
  const axiosPrivate = useAxiosPrivate()
  const { apiEndpoints } = constants
  const navigate = useNavigate()
  const { values, errors, setValues, handleBlur, handleChange, handleSubmit, isSubmitting, setSubmitting, setFieldValue } = useFormik<BookingDetails>({
    initialValues: {
      status: 0,
      created_by: '',
      updated_by: '',
      slug: '',
      comments_admin: '',
      comments_user: '',
      booking_time_window: {
        end_internal: '',
        end_public: '',
        start_internal: '',
        start_public: '',
        id: ''
      },
      user: { id: 0, name: '' },
      booking_messages: [],
      address: {
        id: 0,
        name: '',
        street_name: '',
        street_number: '',
        zip_code: '',
        city: '',
        country: ''
      }
    },
    onSubmit: async (values) => {
      const updateBookingsDetails = getEndpointUrl(apiEndpoints.updateBookingDetails, { bookingId: bookingId })
      try {
        const data = { ...values }
        // // data.booking_time_window.bubble_id = generateRandomAlphaNumeric(30)
        // const newObj: Partial<BookingDetails> = {}
        // for (const i in data) {
        //   if (typeof data[i] === 'object') {
        //     // if(JSON.stringify(data[i]) !== JSON.stringify(bookingInfo[i])){
        //     //   newObj[i] = data[i]
        //     // }

        //   } else {
        //     if (data[i] !== bookingInfo[i]) {
        //       newObj[i] = data[i]
        //     }
        //   }
        // }

        const patchObj = getPatchObject<BookingDetails>(data, bookingInfo)
        console.log(patchObj)
        const res = await axiosPrivate.patch(updateBookingsDetails, patchObj, {})

        if (res?.status === 200) {
          toast.success('Successfully updated!')
        }
      } catch (error) {
        setSubmitting(false)
        toast.error('Something went wrong!')
        throw new Error('An error occurred.')
      }
    }
  })

  useEffect(() => {
    if (Object.values(bookingInfo).length) setValues(bookingInfo)
  }, [isLoading, bookingInfo])

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
    <form onSubmit={handleSubmit}>
      <Card
        style={{
          padding: '30px',
          margin: '20px 0'
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant='h6' style={{ display: 'flex', alignItems: 'flex-start', height: '100%' }}>
              Details
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={3}>
              <Typography variant='inherit' style={{ display: 'flex', alignItems: 'flex-start', height: '100%', flexDirection: 'column' }}>
                <strong>Slug</strong> {values?.slug}
              </Typography>
              <Typography
                variant='inherit'
                className='cursor-pointer'
                onClick={() => navigate(`/users/${values?.user?.id}/profile`)}
                style={{ display: 'flex', alignItems: 'flex-start', height: '100%', flexDirection: 'column' }}
              >
                <strong>Name</strong> {values?.user?.name}
              </Typography>
              <Typography variant='inherit' style={{ display: 'flex', alignItems: 'flex-start', height: '100%', flexDirection: 'column' }}>
                <strong>Date</strong> {values.booking_time_window?.start_public ? new Date(values.booking_time_window.start_public as string).toISOString().slice(0, 10) : 'Not Available'}
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Card>

      <Card
        style={{
          margin: '20px 0'
        }}
      >
        <Stack padding={3}>
          <Typography variant='h6' style={{ display: 'flex', alignItems: 'flex-start', height: '100%' }}>
            Booking Items
          </Typography>
        </Stack>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Car Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookingItemsList.length > 0 ? (
              bookingItemsList.map((item) => {
                return (
                  <TableRow className='cursor-pointer' key={item.id} component={Link} to={`/user-groups/${userGroupId}/bookings/${bookingId}/items/${item.id}`}>
                    <TableCell>{`${item.car.make} (${item.car.model})`}</TableCell>
                    <TableCell>{item.price}</TableCell>
                    <TableCell>{bookingItemsConstant[item.status]}</TableCell>
                  </TableRow>
                )
              })
            ) : (
              <TableRow>
                <TableCell sx={{ textAlign: 'center' }} colSpan={3}>
                  {isLoading ? 'Loading...' : 'Data Not Found!'}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
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
              Time Window
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={3}>
              <Stack direction='row' spacing={3}>
                <MobileTimePicker
                  ampm={false}
                  value={values.booking_time_window?.start_internal ? moment(values.booking_time_window?.start_internal as string).toDate() : undefined}
                  label='Start Internal'
                  onChange={(date) => {
                    setFieldValue('booking_time_window.start_internal', moment(date).toDate().toISOString())
                  }}
                />
                <MobileTimePicker
                  ampm={false}
                  value={values.booking_time_window?.end_internal ? moment(values.booking_time_window?.end_internal as string).toDate() : undefined}
                  label='End Internal'
                  slotProps={{
                    textField: {
                      helperText: ''
                    }
                  }}
                  onChange={(date) => setFieldValue('booking_time_window.end_internal', moment(date).toDate().toISOString())}
                />
              </Stack>
              <Stack direction='row' spacing={3}>
                <MobileTimePicker
                  ampm={false}
                  value={values.booking_time_window?.start_public ? moment(values.booking_time_window?.start_public as string).toDate() : undefined}
                  label='Start Public'
                  onChange={(date) => setFieldValue('booking_time_window.start_public', moment(date).toDate().toISOString())}
                />
                <MobileTimePicker
                  ampm={false}
                  value={values.booking_time_window?.end_public ? moment(values.booking_time_window?.end_public as string).toDate() : undefined}
                  label='End Public'
                  onChange={(date) => setFieldValue('booking_time_window.end_public', moment(date).toDate().toISOString())}
                />
              </Stack>
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
            <Typography variant='h6' style={{ display: 'flex', alignItems: 'flex-start', height: '100%' }}>
              Address
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            {/* <Stack spacing={3}>
              <Stack direction={{ sm: 'row', xs: 'column' }} spacing={3}>
                <TextField
                  error={errors?.address?.name ? true : false}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  id='outlined-basic'
                  name='address.name'
                  fullWidth
                  label='Name'
                  value={values?.address?.name}
                />
                <TextField
                  error={errors?.address?.street_name ? true : false}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  id='outlined-basic'
                  name='street_name'
                  fullWidth
                  label='Street name'
                  value={values?.address?.street_name}
                />
                <TextField
                  error={errors?.address?.street_number ? true : false}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  id='outlined-basic'
                  name='street_number'
                  fullWidth
                  label='Street Number'
                  value={values?.address?.street_number}
                />
              </Stack>
              <Stack spacing={3} direction={{ sm: 'row', xs: 'column' }}>
                <TextField
                  error={errors?.address?.zip_code ? true : false}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  id='outlined-basic'
                  name='zip_code'
                  fullWidth
                  label='Zip Code'
                  value={values?.address?.zip_code}
                />
                <TextField
                  error={errors?.address?.city ? true : false}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  id='outlined-basic'
                  name='city'
                  fullWidth
                  label='City'
                  value={values?.address?.city}
                />
                <TextField
                  error={errors?.address?.country ? true : false}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  id='outlined-basic'
                  name='country'
                  fullWidth
                  label='Country'
                  value={values?.address?.country}
                />
              </Stack>
            </Stack> */}
            <Link to={`/address/${values.address.id}`}>{`${values.address.street_name} ${values.address.street_number}`}</Link>
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
              Status
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={3}>
              <TextField
                error={errors.car_size ? true : false}
                onBlur={handleBlur}
                onChange={handleChange}
                select
                SelectProps={{ native: true }}
                id='outlined-basic'
                name='status'
                fullWidth
                label='Booking Status'
                value={values.status}
              >
                {status.map((item) => {
                  return (
                    <option key={item.id} value={item.id}>
                      {item.value}
                    </option>
                  )
                })}
              </TextField>
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
            <Typography variant='h6' style={{ display: 'flex', alignItems: 'flex-start', height: '100%' }}>
              Comments
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={3}>
              <TextField
                error={errors.comments_admin ? true : false}
                onBlur={handleBlur}
                onChange={handleChange}
                id='outlined-basic'
                name='comments_admin'
                fullWidth
                label='Admin Comment'
                value={values.comments_admin}
              />
              <TextField
                error={errors.comments_user ? true : false}
                onBlur={handleBlur}
                onChange={handleChange}
                id='outlined-basic'
                name='comments_user'
                fullWidth
                label='User Comment'
                value={values.comments_user}
              />
            </Stack>
          </Grid>
        </Grid>
      </Card>

      <Stack alignItems='center' direction='row' justifyContent='flex-end' spacing={1}>
        <Button>Cancel</Button>
        <Button disabled={isSubmitting} type='submit' variant='contained'>
          {isSubmitting ? 'Loading...' : 'Update'}
        </Button>
      </Stack>
    </form>
  )
}

export default BookingInfo
