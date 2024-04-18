import { Card, Grid, MenuItem, TextField, Typography, Table, TableBody, TableCell, TableHead, TableRow, Skeleton } from '@mui/material'
import { Container, Stack } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import NoddiBreadcrumb from '../../components/Breadcrumb'
import { useCarDetail } from '../../hooks'
import { useFormik } from 'formik'
import { Position, WheelSetDetailProps } from './interface'

const WheelSetDetail = () => {
  const [isReadOnly] = useState(false)
  const { carId, id: userGroupId, carWheelSet, userGroupDetail, isLoading } = useCarDetail()
  const { values, errors, touched, handleBlur, handleChange, setValues } = useFormik<WheelSetDetailProps>({
    initialValues: {
      id: 0,
      wheels: [],
      created_at: '',
      updated_at: '',
      bubble_id: '',
      wheel_bubble_ids: [],
      is_staggered: false,
      type: 0,
      car: 0
    },
    onSubmit: (values) => {
      console.log(values)
    }
  })
  useEffect(() => {
    if (carWheelSet) {
      setValues(carWheelSet)
    }
  }, [carWheelSet])

  if (isLoading) {
    return (
      <>
        <Container className=''>
          <Card
            style={{
              padding: '50px',
              margin: '20px 0'
            }}
          >
            <Stack gap={2}>
              <Skeleton variant='rectangular' width='100%' height={60} />
              <Skeleton variant='rectangular' width='100%' height={60} />
            </Stack>
          </Card>
        </Container>
      </>
    )
  }

  return (
    <Container>
      <Typography mb={1} variant='h4'>
        Car Wheel Set Details
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
            title: 'Wheel Sets',
            path: `/user-groups/${userGroupId}/cars/${carId}/wheel-sets`
          },
          {
            title: 'Car Wheel Set Detail'
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
                Type
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack spacing={3}>
                <TextField
                  disabled={isReadOnly}
                  error={errors.type && touched.type ? true : false}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  id='outlined-basic'
                  name='type'
                  fullWidth
                  label='Type'
                  select
                  value={values.type || 0}
                >
                  <MenuItem value={0}>Summer</MenuItem>
                  <MenuItem value={1}>Winter</MenuItem>
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
                Is Staggered
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack spacing={3}>
                <TextField
                  disabled={isReadOnly}
                  error={errors.is_staggered && touched.is_staggered ? true : false}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  id='outlined-basic'
                  name='is_staggered'
                  fullWidth
                  label='Is Staggered'
                  select
                  value={values.type ? 1 : 0}
                >
                  <MenuItem value={'0'}>Staggered</MenuItem>
                  <MenuItem value={'1'}>Not Staggered</MenuItem>
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
              Wheels
            </Typography>
          </Stack>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Dimension Profile</TableCell>
                <TableCell>Dimension Radial</TableCell>
                <TableCell>Dimension Width</TableCell>
                <TableCell>Is Spiked</TableCell>
                <TableCell>Position</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {values.wheels && values.wheels.length > 0 ? (
                values.wheels.map((item) => {
                  return (
                    <TableRow className='cursor-pointer' component={Link} to={`/user-groups/${userGroupId}/cars/${carId}/wheel-sets/${values.id}/wheel/${item.id}`} key={item.id}>
                      <TableCell>{item.dimension_profile}</TableCell>
                      <TableCell>{item.dimension_radial}</TableCell>
                      <TableCell>{item.dimension_width}</TableCell>
                      <TableCell>{item.is_spiked ? 'Spiked' : 'Not Spiked'}</TableCell>
                      <TableCell>{Position[item.position]?.label}</TableCell>
                    </TableRow>
                  )
                })
              ) : (
                <TableRow>
                  <TableCell sx={{ textAlign: 'center' }} colSpan={5}>
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

export default WheelSetDetail
