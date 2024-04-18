import { Card, Grid, TextField, Typography } from '@mui/material'
import { Container, Stack } from '@mui/system'
import React, { useEffect, useState } from 'react'
import NoddiBreadcrumb from '../../components/Breadcrumb'
import { useFormik } from 'formik'
import { Link, useParams } from 'react-router-dom'
import { useBookingItems, useOrder } from '../../hooks'
import { OrderDetailDiscount, OrderDetailNonDiscount } from './interface'

const OrderDetail = () => {
  const [isReadOnly] = useState(true)
  const { userGroupDetail, userGroupId, bookingId } = useBookingItems()
  const { getOrderDetails, orderDetails } = useOrder()
  const { orderId, type } = useParams()

  const { values, handleSubmit, setValues } = useFormik<OrderDetailDiscount | OrderDetailNonDiscount>({
    initialValues: {} as OrderDetailDiscount | OrderDetailNonDiscount,
    onSubmit: (values) => {
      console.log(values)
    }
  })

  useEffect(() => {
    getOrderDetails(orderId as string, type as string)
  }, [])

  useEffect(() => {
    setValues(orderDetails)
  }, [orderDetails])

  return (
    <Container>
      <Typography mb={1} variant='h4'>
        Order Line Details
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
            title: 'Booking order',
            path: `/user-groups/${userGroupId}/bookings/${bookingId}/order`
          },
          {
            title: orderId
          }
        ]}
      />

      <form action='' onSubmit={handleSubmit}>
        <Card
          style={{
            padding: '30px',
            margin: '20px 0'
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant='h6' style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                Price (Per Unit)
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack spacing={3}>
                <TextField disabled={isReadOnly} id='outlined-basic' name='price_per_unit' fullWidth label='Price' value={values.price_per_unit || ''} />
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
                Quantity
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack spacing={3}>
                <TextField disabled={isReadOnly} id='outlined-basic' name='quantity' fullWidth label='Quantity' value={values.quantity || ''} />
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
                Currency
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack spacing={3}>
                <TextField disabled={isReadOnly} id='outlined-basic' name='currency' fullWidth label='Currency' value={values.currency || ''} />
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
                Vat Percentage
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack spacing={3}>
                <TextField disabled={isReadOnly} id='outlined-basic' name='vat_percentage' fullWidth label='Vat Percentage' value={values.vat_percentage || ''} />
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
                Description
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack spacing={3}>
                <TextField disabled={isReadOnly} id='outlined-basic' name='description' fullWidth label='Description' multiline rows={3} value={values.description || ''} />
              </Stack>
            </Grid>
          </Grid>
        </Card>

        {!values.is_discount ? (
          <>
            <Card
              style={{
                padding: '30px',
                margin: '20px 0'
              }}
            >
              <Grid container marginY={2} spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant='h6' style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                    Product
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack spacing={3}>{values.product ? <Link to={`/product/edit/${values?.product?.id}`}>{values?.product?.name}</Link> : 'Not Present'}</Stack>
                </Grid>
              </Grid>

              <Grid container marginY={2} spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant='h6' style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                    Service
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack spacing={3}>{values.service ? <Link to={`/service/edit/${values?.service?.id}`}>{values?.service?.name}</Link> : 'Not Present'}</Stack>
                </Grid>
              </Grid>
            </Card>
          </>
        ) : (
          <>
            <Card
              style={{
                padding: '30px',
                margin: '20px 0'
              }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant='h6' style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                    Bundle Discount
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack spacing={3} rowGap={3}>
                    {values.bundle_discount && (
                      <TextField disabled={isReadOnly} id='outlined-basic' name='bundle_discount_value' fullWidth label='Bundle Discount Value' value={values.bundle_discount_value} />
                    )}
                    {values.bundle_discount ? <Link to={`/bundle-discounts/${values?.bundle_discount?.id}`}>{values?.bundle_discount?.name}</Link> : 'Not Present'}
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
                    Bundle Coupon
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack spacing={3} rowGap={3}>
                    {values.coupon && (
                      <TextField disabled={isReadOnly} id='outlined-basic' name='coupon_discount_value' fullWidth label='Coupon Value' value={values.coupon_discount_value || ''} />
                    )}
                    {values.coupon ? <Link to={`/coupons/${values?.coupon?.id}`}>{values?.coupon?.code}</Link> : 'Not Present'}
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
                    Membership Discount
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack spacing={3} rowGap={3}>
                    {values.membership_discount && (
                      <TextField disabled={isReadOnly} id='outlined-basic' name='membership_discount' fullWidth label='Membership Discount' value={values.membership_discount_value} />
                    )}
                    {values.membership_discount ? <Link to={`/membership/discounts/${values?.membership_discount?.id}`}>{values?.membership_discount?.name}</Link> : 'Not Present'}
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
                    Reward Withdrawal
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack spacing={3}>{values.reward_withdrawal ? <Link to={`/user-groups/${userGroupId}/reward-account`}>See Reward Withdrawal</Link> : 'Not Present'}</Stack>
                </Grid>
              </Grid>

              <Grid container spacing={3}>
                <Grid marginY={2} item xs={12} md={6}>
                  <Typography variant='h6' style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                    Membership Program
                  </Typography>
                </Grid>
                <Grid marginY={2} item xs={12} md={6}>
                  <Stack spacing={3}>{values.membership_program ? <Link to={`/membership/programs/${values.membership_program?.id}`}>{values.membership_program?.name}</Link> : 'Not Present'}</Stack>
                </Grid>
              </Grid>
            </Card>
          </>
        )}
      </form>
    </Container>
  )
}

export default OrderDetail
