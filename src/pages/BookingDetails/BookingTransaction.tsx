import { Card, Grid, MenuItem, TextField, Typography } from '@mui/material'
import { Container, Stack } from '@mui/system'
import React, { useEffect, useState } from 'react'
import NoddiBreadcrumb from '../../components/Breadcrumb'
import { useFormik } from 'formik'
import { Link, useParams } from 'react-router-dom'
import { useBookingItems, useOrder } from '../../hooks'
import { OrderTransactionProps } from './interface'
import { paymentMethodConstant, transactionStatusConstant } from '../../constant'

const BookingTransaction = () => {
  const [isReadOnly] = useState(true)
  const { userGroupDetail, userGroupId, bookingId } = useBookingItems()
  const { transactionId } = useParams()
  const { getOrderTransactionById, orderTransactionOne } = useOrder()
  const { values, handleChange, handleBlur, setValues } = useFormik<OrderTransactionProps>({
    initialValues: {} as OrderTransactionProps,
    onSubmit: (values) => {
      console.log(values)
    }
  })
  // eslint-disable-next-line prefer-const
  const Dintero = () => {
    return (
      <>
        <Card
          style={{
            padding: '30px',
            margin: '20px 0'
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant='h6' style={{ display: 'flex', alignItems: 'flex-start', height: '100%' }}>
                Dintero
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack spacing={3}>
                <TextField
                  disabled={isReadOnly}
                  //   error={errors.car ? true : false}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  id='outlined-basic'
                  name='transaction_id'
                  fullWidth
                  label='Transaction Id'
                  value={values?.order_transaction_dintero?.transaction_id || ''}
                />

                <TextField
                  disabled={isReadOnly}
                  //   error={errors.car ? true : false}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  id='outlined-basic'
                  name='session_id'
                  fullWidth
                  label='Session Id'
                  value={values?.order_transaction_dintero?.session_id || ''}
                />
              </Stack>
            </Grid>
          </Grid>
        </Card>
      </>
    )
  }
  const Vipps = () => {
    return (
      <>
        <Card
          style={{
            padding: '30px',
            margin: '20px 0'
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant='h6' style={{ display: 'flex', alignItems: 'flex-start', height: '100%' }}>
                Vipps
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack spacing={3}>
                <TextField
                  disabled={isReadOnly}
                  //   error={errors.car ? true : false}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  id='outlined-basic'
                  name='vipps_id'
                  fullWidth
                  label='Vipps Id'
                  value={values?.order_transaction_vipps?.vipps_id || ''}
                />

                <TextField
                  disabled={isReadOnly}
                  //   error={errors.car ? true : false}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  id='outlined-basic'
                  name='vipps_body'
                  fullWidth
                  label='Vipps Body'
                  value={values?.order_transaction_vipps?.vipps_body || ''}
                />

                <TextField
                  disabled={isReadOnly}
                  //   error={errors.car ? true : false}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  id='outlined-basic'
                  name='vipps_status'
                  fullWidth
                  label='Vipps Status'
                  value={values?.order_transaction_vipps?.vipps_status || ''}
                />
              </Stack>
            </Grid>
          </Grid>
        </Card>
      </>
    )
  }
  const Stripe = () => {
    return (
      <>
        <Card
          style={{
            padding: '30px',
            margin: '20px 0'
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant='h6' style={{ display: 'flex', alignItems: 'flex-start', height: '100%' }}>
                Stripe
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack spacing={3}>
                <TextField
                  disabled={isReadOnly}
                  //   error={errors.car ? true : false}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  id='outlined-basic'
                  name='stripe_id'
                  fullWidth
                  label='Stripe Id'
                  value={values?.order_transaction_stripe?.stripe_id}
                />
              </Stack>
            </Grid>
          </Grid>
        </Card>
      </>
    )
  }

  useEffect(() => {
    setValues(orderTransactionOne)
  }, [orderTransactionOne])

  useEffect(() => {
    getOrderTransactionById(transactionId as string)
  }, [])

  return (
    <Container>
      <Typography mb={1} variant='h4'>
        Booking Transaction Details
      </Typography>
      <NoddiBreadcrumb
        items={[
          {
            title: 'User Groups',
            path: '/user-groups'
          },
          {
            title: userGroupDetail?.name,
            path: `/user-groups/${userGroupId}/members`
          },
          {
            title: 'Bookings',
            path: `/user-groups/${userGroupId}/bookings/`
          },
          {
            title: 'Booking Order',
            path: `/user-groups/${userGroupId}/bookings/${bookingId}/order`
          },
          {
            title: transactionId
          }
        ]}
      />

      <form action=''>
        <Card
          style={{
            padding: '30px',
            margin: '20px 0'
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant='h6' style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                Amount
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack spacing={3}>
                <TextField disabled={isReadOnly} onBlur={handleBlur} onChange={handleChange} id='outlined-basic' name='amount' fullWidth label='Amount' value={values.amount || ''} />
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
                Payment Method
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack spacing={3}>
                <TextField
                  disabled={isReadOnly}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  id='outlined-basic'
                  name='payment_method'
                  fullWidth
                  label='Payment Method'
                  value={values.payment_method || ''}
                  select
                >
                  {paymentMethodConstant.map((item, index) => {
                    return (
                      <MenuItem key={item} value={index}>
                        {item}
                      </MenuItem>
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
              <Typography variant='h6' style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                User
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack spacing={3}>
                <Link to={`/users/${values?.user?.id}/profile`}>{values?.user?.name}</Link>
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
                Status
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack spacing={3}>
                <TextField
                  disabled={isReadOnly}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  id='outlined-basic'
                  name='status'
                  fullWidth
                  label='Status'
                  value={values.status || 0}
                  select
                >
                  {transactionStatusConstant.map((item, index) => {
                    return (
                      <MenuItem value={index} key={item}>
                        {item}
                      </MenuItem>
                    )
                  })}
                </TextField>
              </Stack>
            </Grid>
          </Grid>
        </Card>

        {values.payment_method === 1 ? <Dintero /> : values.payment_method === 2 ? <Vipps /> : <Stripe />}
      </form>
    </Container>
  )
}

export default BookingTransaction
