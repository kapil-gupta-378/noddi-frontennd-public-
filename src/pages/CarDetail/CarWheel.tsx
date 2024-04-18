import { Card, Grid, MenuItem, TextField, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { Container, Stack } from '@mui/system'
import React, { useEffect, useState } from 'react'
// import { Link, useLocation } from 'react-router-dom'
import NoddiBreadcrumb from '../../components/Breadcrumb'
import { useCarDetail } from '../../hooks'
import { useFormik } from 'formik'
import { CarWheelProps, Position } from './interface'
import moment from 'moment'

const CarWheel = () => {
  const [isReadOnly] = useState(true)
  const { carId, id: userGroupId, carDetail, userGroupDetail, wheelSetId, carWheel } = useCarDetail()
  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setValues } = useFormik<CarWheelProps>({
    initialValues: {
      id: 0,
      measurements: [
        {
          id: 0,
          value: '',
          car_wheel: 0,
          measured_at: ''
        }
      ],
      created_at: '',
      updated_at: '',
      bubble_id: '',
      dimension_profile: 0,
      dimension_radial: 0,
      dimension_width: 0,
      position: 0,
      is_spiked: false,
      car_wheel_set: 0
    },
    onSubmit: (values) => {
      console.log(values)
    }
  })

  useEffect(() => {
    setValues(carWheel)
  }, [carWheel])

  return (
    <Container>
      <Typography mb={1} variant='h4'>
        Car Wheel Details
      </Typography>
      <NoddiBreadcrumb
        items={[
          {
            title: 'User Groups',
            path: '/user-groups'
          },
          {
            title: userGroupDetail?.name || 'group name',
            path: `/user-groups/${userGroupId}/members`
          },
          {
            title: carDetail?.model || 'Car',
            path: `/user-groups/${userGroupId}/cars/${carId}/details`
          },
          {
            title: `Car Wheel Set(${wheelSetId})`,
            path: `/user-groups/${userGroupId}/cars/${carId}/wheel-sets/${wheelSetId}`
          },
          {
            title: 'Car Wheel Detail'
          }
        ]}
      />

      <form action='' method='get' onSubmit={handleSubmit}>
        <Card
          style={{
            padding: '30px',
            margin: '20px 0'
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant='h6' style={{ display: 'flex', alignItems: 'flex-start', height: '100%' }}>
                Dimensions
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack spacing={3}>
                <TextField
                  required
                  disabled={isReadOnly}
                  error={errors.dimension_profile && touched.dimension_profile ? true : false}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  id='outlined-basic'
                  name='type'
                  fullWidth
                  label='Dimension Profile'
                  value={values.dimension_profile}
                />
                <TextField
                  disabled={isReadOnly}
                  error={errors.dimension_radial && touched.dimension_radial ? true : false}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  id='outlined-basic'
                  name='dimension_radial'
                  fullWidth
                  label='Dimension Radial'
                  value={values.dimension_radial}
                />
                <TextField
                  disabled={isReadOnly}
                  error={errors.dimension_width && touched.dimension_width ? true : false}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  id='outlined-basic'
                  name='dimension_width'
                  fullWidth
                  label='Dimension Width'
                  value={values.dimension_width}
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
                Position
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack spacing={3}>
                <TextField
                  disabled={isReadOnly}
                  error={errors.position && touched.position ? true : false}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  id='outlined-basic'
                  name='position'
                  fullWidth
                  label='Position'
                  select
                  value={values.position}
                >
                  {Position.map((item) => {
                    return (
                      <MenuItem key={item.id} value={item.id}>
                        {item.label}
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
                Is Spiked
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack spacing={3}>
                <TextField
                  error={errors.is_spiked && touched.is_spiked ? true : false}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  id='outlined-basic'
                  name='is_spiked'
                  fullWidth
                  label='Is Spiked'
                  select
                  disabled={isReadOnly}
                  value={values.is_spiked ? 1 : 0}
                >
                  <MenuItem value={1}>Spiked</MenuItem>
                  <MenuItem value={0}>Not Spiked</MenuItem>
                </TextField>
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
              Measurements
            </Typography>
          </Stack>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Value</TableCell>
                <TableCell>Measured At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {values?.measurements?.length > 0 ? (
                values?.measurements?.map((item) => {
                  return (
                    <TableRow className='cursor-pointer'>
                      <TableCell>{item.value}</TableCell>
                      <TableCell>{moment(item.measured_at).format('DD/MM/YYYY')}</TableCell>
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
      </form>
    </Container>
  )
}

export default CarWheel
