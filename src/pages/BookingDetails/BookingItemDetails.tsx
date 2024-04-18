import { Card, Grid, MenuItem, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material'
import { Box, Container, Stack } from '@mui/system'
import React, { useEffect, useState } from 'react'
import NoddiBreadcrumb from '../../components/Breadcrumb'
import { useBookingItems } from '../../hooks'
import { useFormik } from 'formik'
import { BookingItemsProps } from './interface'
import { bookingItemsConstant } from '../../constant'
import Image01Icon from '@untitled-ui/icons-react/build/esm/Image01'
import SvgIcon from '@mui/material/SvgIcon'

const BookingItemDetails = () => {
  const { userGroupId, bookingId, userGroupDetail, bookingItemId, bookingItem } = useBookingItems()
  const [isReadOnly] = useState(true)
  const { values, errors, handleChange, handleBlur, handleSubmit, setValues } = useFormik<BookingItemsProps>({
    initialValues: {
      id: 0,
      images: [],
      unable_to_complete: null,
      car: {
        id: 0,
        make: '',
        model: ''
      },
      booking: {
        id: 0,
        comments_user: '',
        comments_admin: ''
      },
      services: [],
      SalesItems: [],
      deleted: null,
      deleted_by_cascade: false,
      uid: '',
      created_at: '',
      updated_at: '',
      bubble_id: '',
      service_time: null,
      status: 0,
      price: '0',
      currency: '',
      worker_comments_internal: '',
      worker_comments_public: '',
      created_by: null,
      updated_by: null
    },
    onSubmit: (values) => {
      console.log(values)
    }
  })

  useEffect(() => {
    if (Object.keys(bookingItem).length > 0) {
      setValues(bookingItem)
    }
  }, [bookingItem])

  return (
    <Container>
      <Typography mb={1} variant='h4'>
        Booking Item Details
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
            title: 'Booking Items',
            path: `/user-groups/${userGroupId}/bookings/${bookingId}/items`
          },
          {
            title: bookingItemId
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
              <Typography variant='h6' style={{ display: 'flex', alignItems: 'flex-start', height: '100%' }}>
                Car
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack spacing={3}>
                <TextField
                  disabled={isReadOnly}
                  error={errors.car ? true : false}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  id='outlined-basic'
                  name='header'
                  fullWidth
                  label='Make'
                  value={values.car.make}
                />
                <TextField
                  disabled={isReadOnly}
                  error={errors.car ? true : false}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  id='outlined-basic'
                  name='header'
                  fullWidth
                  label='Model'
                  value={values.car.model}
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
                Price
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack spacing={3}>
                <TextField
                  disabled={isReadOnly}
                  error={errors.price ? true : false}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  id='outlined-basic'
                  name='price'
                  fullWidth
                  label='Price'
                  value={values.price}
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
                Status
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack spacing={3}>
                <TextField
                  disabled={isReadOnly}
                  error={errors.price ? true : false}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  id='outlined-basic'
                  name='status'
                  fullWidth
                  label='Status'
                  select
                  value={values.status}
                >
                  {bookingItemsConstant.map((item, index) => {
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
              <Typography variant='h6' style={{ display: 'flex', alignItems: 'flex-start', height: '100%' }}>
                Comments
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack spacing={3}>
                <TextField
                  disabled={isReadOnly}
                  error={errors.worker_comments_internal ? true : false}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  id='outlined-basic'
                  name='worker_comments_internal'
                  fullWidth
                  label='Worker Comments Internal'
                  value={values.worker_comments_internal}
                />
                <TextField
                  disabled={isReadOnly}
                  error={errors.worker_comments_public ? true : false}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  id='outlined-basic'
                  name='worker_comments_public'
                  fullWidth
                  label='Worker Comments Public'
                  value={values.worker_comments_public}
                />
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
              Images
            </Typography>
          </Stack>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Is Before Job</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {values?.images?.length > 0 ? (
                values?.images.map((item) => {
                  return (
                    <TableRow className='cursor-pointer'>
                      <TableCell>
                        {item.image ? (
                          <Box
                            sx={{
                              alignItems: 'center',
                              backgroundColor: 'neutral.50',
                              backgroundImage: `url(${item.image})`,
                              backgroundPosition: 'center',
                              backgroundSize: 'cover',
                              borderRadius: 1,
                              display: 'flex',
                              height: 80,
                              justifyContent: 'center',
                              overflow: 'hidden',
                              width: 80
                            }}
                          />
                        ) : (
                          <Box
                            sx={{
                              alignItems: 'center',
                              backgroundColor: 'neutral.50',
                              borderRadius: 1,
                              display: 'flex',
                              height: 80,
                              justifyContent: 'center',
                              width: 80
                            }}
                          >
                            <SvgIcon>
                              <Image01Icon />
                            </SvgIcon>
                          </Box>
                        )}
                      </TableCell>
                      <TableCell>{true ? 'Yes' : 'No'}</TableCell>
                    </TableRow>
                  )
                })
              ) : (
                <TableRow>
                  <TableCell sx={{ textAlign: 'center' }} colSpan={2}>
                    {'Data Not Found!'}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>

        <Card
          style={{
            margin: '20px 0'
          }}
        >
          <Stack padding={3}>
            <Typography variant='h6' style={{ display: 'flex', alignItems: 'flex-start', height: '100%' }}>
              Services
            </Typography>
          </Stack>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Service Name</TableCell>
                <TableCell>Comment</TableCell>
                <TableCell>Reason</TableCell>
                <TableCell>Added by Worker</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {values?.services?.length > 0 ? (
                values?.services?.map((item) => {
                  return (
                    <TableRow className='cursor-pointer'>
                      <TableCell>{item.service__name}</TableCell>
                      <TableCell>{item.unable_to_complete__comments}</TableCell>
                      <TableCell>{item.unable_to_complete__reason__name}</TableCell>
                      <TableCell>{item.is_added_by_worker ? 'Yes' : 'No'}</TableCell>
                    </TableRow>
                  )
                })
              ) : (
                <TableRow>
                  <TableCell sx={{ textAlign: 'center' }} colSpan={4}>
                    {'Data Not Found!'}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>

        <Card
          style={{
            margin: '20px 0'
          }}
        >
          <Stack padding={3}>
            <Typography variant='h6' style={{ display: 'flex', alignItems: 'flex-start', height: '100%' }}>
            SalesItems
            </Typography>
          </Stack>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product Name</TableCell>
                <TableCell>Comment</TableCell>
                <TableCell>Reason</TableCell>
                <TableCell>Added by Worker</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {values?.SalesItems?.length > 0 ? (
                values?.SalesItems?.map((item) => {
                  return (
                    <TableRow className='cursor-pointer'>
                      <TableCell>{item.product__name}</TableCell>
                      <TableCell>{item.unable_to_complete__comments}</TableCell>
                      <TableCell>{item.unable_to_complete__reason__name}</TableCell>
                      <TableCell>{item.is_added_by_worker ? 'Yes' : 'No'}</TableCell>
                    </TableRow>
                  )
                })
              ) : (
                <TableRow>
                  <TableCell sx={{ textAlign: 'center' }} colSpan={4}>
                    {'Data Not Found!'}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>
      </form>
    </Container>
  )
}

export default BookingItemDetails
